# Publishing

This document is for the maintainer. App releases are published from version
tags in `antonsacred/browser-picker`, and the Homebrew tap is updated
automatically in `antonsacred/homebrew-browser-picker`.

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
   - calculate the `arm64` and `x64` SHA256 values from the generated zip files
   - check out `antonsacred/homebrew-browser-picker`
   - update `Casks/browser-picker.rb`
   - commit and push the tap update automatically

3. If the release succeeds but the tap update fails, fix the underlying issue
   and rerun the workflow.

## Required secret

Set `HOMEBREW_TAP_GITHUB_TOKEN` in the `antonsacred/browser-picker` repository
secrets.

The token needs write access to `antonsacred/homebrew-browser-picker` so the
release workflow can push the cask update commit.

## Notes

- This flow publishes unsigned CI-built zip assets only.
- The current release asset names come from Electron Forge's zip maker:
  `Browserosaurus-darwin-arm64-<version>.zip` and
  `Browserosaurus-darwin-x64-<version>.zip`.
- The tap automation expects `Casks/browser-picker.rb` to contain `version`,
  `homepage`, `on_arm`, and `on_intel` blocks in the standard Homebrew cask
  format.
