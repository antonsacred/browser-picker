<img src="./docs/icon_squooshed.png" alt="logo" width="100" height="100" align="right" />

# Browserosaurus

Browserosaurus is an open-source (GPLv3 license) browser prompter for macOS. It
works by setting itself as the default browser, and any clicked links in
non-browser apps are now sent to Browserosaurus where you are presented with a
menu of all your installed browsers. You may now decide which app you’d like to
continue opening the link with. Releases are now published from this repository
and installed via the dedicated Homebrew tap below.

<img src="./docs/screenshot.jpg" alt="screenshot" />

## Installation

Install from the custom Homebrew tap:

```sh
brew tap antonsacred/browser-picker
brew install --cask browser-picker
```

## Help

Found a bug? Please log an
[issue](https://github.com/antonsacred/browser-picker/issues). For anything
else, please see the documentation below or open a
[discussion](https://github.com/antonsacred/browser-picker/discussions).

## Projects inspired by Browserosaurus

Browserosaurus is primarily made for my needs and environment. Therefore, some
feature requests do not make it into the main project, but that's the beauty of
Open Source, you are free to copy the code and make your own tweaks (as long as
it remains open-sourced, of course, please see the license 😉). Here are some
forks of this project that you may like to consider:

- [Browseratops](https://github.com/riotrah/browseratops) by
  [@riotrah](https://github.com/riotrah). Browserosaurus but for **Windows**!
- [Browserino](https://github.com/AlexStrNik/Browserino) by
  [@alexstrnik](https://github.com/AlexStrNik). **Swift UI** port of
  Browserosaurus.

> Please PR your own fork to this list.

## Documentation

- [Changelog](https://github.com/antonsacred/browser-picker/releases)
- [Help](https://github.com/antonsacred/browser-picker/discussions/categories/q-a)
- [Supporting a new browser or app](guide/supporting-a-browser-or-app.md)
- [Setting up for development](guide/setting-up-for-development.md)
- [Privacy policy](guide/privacy.md)

For the maintainer:

- [Creating app icon](guide/creating-app-icon.md)
- [Publishing](guide/publishing.md)

## Maintainer Release Flow

1. Run `npm run release -- 21.0.5` on a clean working tree.
2. The script runs checks, updates `package.json` and `package-lock.json`,
   creates the release commit, and creates the `v21.0.5` tag locally.
3. Push with `git push origin main --follow-tags`.
4. Wait for the tag workflow to publish the GitHub Release and upload the two
   macOS zip assets.
5. The same workflow updates `Casks/browser-picker.rb` in
   `antonsacred/homebrew-browser-picker` automatically.
