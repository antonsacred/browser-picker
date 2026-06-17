import { execFileSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

test('should generate a cask with local repair steps for unsigned app builds', () => {
  const tempDir = mkdtempSync(join(tmpdir(), 'browser-picker-cask-'))
  const outputFile = join(tempDir, 'browser-picker.rb')

  try {
    execFileSync('node', [
      'scripts/update-homebrew-cask.mjs',
      '--file',
      outputFile,
      '--version',
      '21.0.11',
      '--arm-sha',
      'arm-sha-123',
      '--x64-sha',
      'x64-sha-456',
    ])

    const cask = readFileSync(outputFile, 'utf8')

    expect(cask).toContain('postflight do')
    expect(cask).toContain(
      'system_command "/usr/bin/xattr", args: ["-cr", "#{appdir}/browser-picker.app"]',
    )
    expect(cask).toContain(
      'system_command "/usr/bin/codesign", args: ["--force", "--deep", "--sign", "-", "#{appdir}/browser-picker.app"]',
    )
    expect(cask).toContain('sha256 "arm-sha-123"')
    expect(cask).toContain('sha256 "x64-sha-456"')
    expect(cask).toContain(
      'url "https://github.com/antonsacred/browser-picker/releases/download/v#{version}/browser-picker-darwin-arm64-#{version}.zip"',
    )
    expect(cask).toContain(
      'url "https://github.com/antonsacred/browser-picker/releases/download/v#{version}/browser-picker-darwin-x64-#{version}.zip"',
    )
  } finally {
    rmSync(tempDir, { force: true, recursive: true })
  }
})
