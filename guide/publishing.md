# Publishing

This document is for the maintainer. App releases are published from version
tags in `antonsacred/browser-picker`, and the Homebrew tap is updated manually
in `antonsacred/homebrew-browser-picker`.

## Release sequence

1. Push a tag in the app repo using the `v<version>` format, for example:

   ```sh
   git tag v20.12.0
   git push origin v20.12.0
   ```

2. Wait for the `Release` GitHub Actions workflow to finish. It will:

   - run `npm ci --audit false`
   - run `npm run doctor`
   - run `npm run make`
   - publish a GitHub Release with the macOS zip assets

3. Download the two release assets and calculate their SHA256 values:

   ```sh
   shasum -a 256 Browserosaurus-darwin-arm64-20.12.0.zip
   shasum -a 256 Browserosaurus-darwin-x64-20.12.0.zip
   ```

4. In `antonsacred/homebrew-browser-picker`, update `Casks/browser-picker.rb`
   with:

   - the new version
   - the new `arm64` SHA256
   - the new `x64` SHA256

5. Commit and push the tap update.

## Notes

- This flow publishes unsigned CI-built zip assets only.
- The current release asset names come from Electron Forge's zip maker:
  `Browserosaurus-darwin-arm64-<version>.zip` and
  `Browserosaurus-darwin-x64-<version>.zip`.
