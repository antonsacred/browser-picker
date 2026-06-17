import { writeFile } from 'node:fs/promises'

function getArg(name) {
  const index = process.argv.indexOf(`--${name}`)

  if (index === -1 || index === process.argv.length - 1) {
    throw new Error(`Missing required argument --${name}`)
  }

  return process.argv[index + 1]
}

const file = getArg('file')
const version = getArg('version')
const armSha = getArg('arm-sha')
const x64Sha = getArg('x64-sha')

const cask = `cask "browser-picker" do
  version "${version}"

  on_arm do
    sha256 "${armSha}"
    url "https://github.com/antonsacred/browser-picker/releases/download/v#{version}/Browserosaurus-darwin-arm64-#{version}.zip"
  end

  on_intel do
    sha256 "${x64Sha}"
    url "https://github.com/antonsacred/browser-picker/releases/download/v#{version}/Browserosaurus-darwin-x64-#{version}.zip"
  end

  name "Browserosaurus"
  desc "Browser prompter for macOS"
  homepage "https://github.com/antonsacred/browser-picker"

  auto_updates true
  depends_on macos: ">= :monterey"

  app "Browserosaurus.app"

  uninstall quit: "com.browserosaurus"

  zap trash: [
    "~/Library/Application Support/Browserosaurus",
    "~/Library/Preferences/com.browserosaurus.plist",
    "~/Library/Saved Application State/com.browserosaurus.savedState",
  ]
end
`

await writeFile(file, cask)
