import { app } from 'electron'

export function getUpdateUrl(): string {
  return `https://update.electronjs.org/antonsacred/browser-picker/darwin-${
    process.arch
  }/${app.getVersion()}`
}
