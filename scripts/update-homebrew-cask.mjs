import { readFile, writeFile } from 'node:fs/promises'

function getArg(name) {
  const index = process.argv.indexOf(`--${name}`)

  if (index === -1 || index === process.argv.length - 1) {
    throw new Error(`Missing required argument --${name}`)
  }

  return process.argv[index + 1]
}

function replaceOnce(source, pattern, replacement, description) {
  const matches = source.match(pattern)

  if (matches === null || matches.length !== 1) {
    throw new Error(`Expected exactly one ${description} block`)
  }

  return source.replace(pattern, replacement)
}

const file = getArg('file')
const version = getArg('version')
const armSha = getArg('arm-sha')
const x64Sha = getArg('x64-sha')

const armBlock = `  on_arm do
    sha256 "${armSha}"
    url "https://github.com/antonsacred/browser-picker/releases/download/v#{version}/Browserosaurus-darwin-arm64-#{version}.zip"
  end`

const intelBlock = `  on_intel do
    sha256 "${x64Sha}"
    url "https://github.com/antonsacred/browser-picker/releases/download/v#{version}/Browserosaurus-darwin-x64-#{version}.zip"
  end`

const input = await readFile(file, 'utf8')

let output = input

output = replaceOnce(
  output,
  /^[ ]{2}version ".*"$/mu,
  `  version "${version}"`,
  'version',
)

output = replaceOnce(
  output,
  /^[ ]{2}homepage ".*"$/mu,
  '  homepage "https://github.com/antonsacred/browser-picker"',
  'homepage',
)

output = replaceOnce(
  output,
  /^[ ]{2}on_arm do[\S\s]*?^[ ]{2}end$/mu,
  armBlock,
  'on_arm',
)

output = replaceOnce(
  output,
  /^[ ]{2}on_intel do[\S\s]*?^[ ]{2}end$/mu,
  intelBlock,
  'on_intel',
)

if (output !== input) {
  await writeFile(file, `${output.trimEnd()}\n`)
}
