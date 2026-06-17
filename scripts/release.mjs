import { execFileSync } from 'node:child_process'
import { stderr, stdout } from 'node:process'

function run(command, args, options = {}) {
  execFileSync(command, args, {
    stdio: 'inherit',
    ...options,
  })
}

function capture(command, args) {
  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit'],
  }).trim()
}

function log(message) {
  stdout.write(`${message}\n`)
}

function main() {
  const version = process.argv[2]

  if (version === undefined) {
    throw new Error('Usage: npm run release -- <version>')
  }

  if (!/^\d+\.\d+\.\d+$/u.test(version)) {
    throw new Error(`Invalid version "${version}". Expected semver like 21.0.5`)
  }

  const status = capture('git', ['status', '--porcelain'])

  if (status !== '') {
    throw new Error(
      'Git working tree must be clean before creating a release commit and tag',
    )
  }

  const tag = `v${version}`
  const existingTag = capture('git', ['tag', '--list', tag])

  if (existingTag !== '') {
    throw new Error(`Git tag ${tag} already exists`)
  }

  run('npm', ['run', 'doctor'])
  run('npm', ['version', version, '--no-git-tag-version'])
  run('git', ['add', 'package.json', 'package-lock.json'])
  run('git', ['commit', '-m', `chore: release ${tag}`])
  run('git', ['tag', '-a', tag, '-m', tag])

  log(`Created release commit and tag ${tag}`)
  log('Push with: git push origin main --follow-tags')
}

try {
  main()
} catch (error) {
  stderr.write(`${error instanceof Error ? error.message : String(error)}\n`)
  throw error
}
