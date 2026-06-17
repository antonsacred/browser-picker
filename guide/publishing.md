# Publishing

This document is for the maintainer. App releases are published from version
tags in `antonsacred/browser-picker`, and the Homebrew tap is updated
automatically in `antonsacred/homebrew-browser-picker`.

## Release sequence

1. Create the release locally on a clean working tree:

   ```sh
   npm run release -- 20.12.0
   ```

   This will:

   - run `npm run doctor`
   - update `package.json` and `package-lock.json`
   - create a commit like `chore: release v20.12.0`
   - create a tag `v20.12.0`

2. Push the release commit and tag:

   ```sh
   git push origin main --follow-tags
   ```

3. Wait for the `Release` GitHub Actions workflow to finish. It will:

   - run `npm ci --audit false`
   - run `npm run doctor`
   - run `npm run make`
   - publish a GitHub Release with the macOS zip assets
   - calculate the `arm64` and `x64` SHA256 values from the generated zip files
   - check out `antonsacred/homebrew-browser-picker`
   - update `Casks/browser-picker.rb`
   - commit and push the tap update automatically

4. If the release succeeds but the tap update fails, fix the underlying issue
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
