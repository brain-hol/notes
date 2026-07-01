# Homebrew

## Information

### Brew List

Show all packages and dependencies

```shell
brew list
```

### Brew Leaves

Show only top level packages

```shell
brew leaves | xargs -n1 brew desc
```

Show only manually installed packages

```shell
brew leaves --installed-on-request | xargs -n1 brew desc
```

## Housekeeping

### Brew Outdated

The command `brew outdated` will list all installed packages that have a newer version available.

```bash
brew outdated
```

After running `brew outdated`, you can run `brew upgrade` to upgrade all packages or `brew upgrade <package>` to upgrade a specific package.

### Brew Upgrade (all packages)

The command `brew upgrade` will upgrade all installed packages.

```bash
brew upgrade
```

Be prepared for this command to take time (many minutes). Older versions of Homebrew had a `brew upgrade --all` option but the command has been simplified.

If you don't have time to upgrade all outdated packages, you can upgrade a specific package with `brew upgrade <package>`.

### Brew Update

The command `brew update` is for updating Homebrew itself, as well as the Homebrew core packages that are installed by default.

```bash
brew update
```

This updates Homebrew itself. It can take many minutes to run an update.

Homebrew core packages are updated as often as every day, so it is likely you will see updates.

### Brew Autoremove

The command `brew autoremove` will remove all unused dependencies remaining in the environment. If you've removed packages, it is likely that abandoned dependencies were left on disk if you didn't run `brew autoremove` immediately.

```bash
brew autoremove
```

### Brew Cleanup

Homebrew maintains a cache of downloaded packages so repeated installation goes faster. The command `brew cleanup` will remove outdated download files from the cache, as well as old versions of installed packages. By default, `brew cleanup` only removes files more than 120 days old. Force a more recent cleanup with `--prune=all`.

Unless the default has been changed by the user, the cached files are in `~/Library/Caches/Homebrew`.

Run `brew cleanup -n` or `brew cleanup --dry-run` to see what will be removed without actually removing anything.

```bash
brew cleanup --prune=all --dry-run
```

If you like what you see, run `brew cleanup` without the `--dry-run` option.

```bash
brew cleanup --prune=all
```

Run `brew cleanup` _after_ running `brew upgrade` to make sure old versions of packages have been removed.

That's Homebrew housekeeping! As a side effect of cleaning up after using Homebrew, you'll have a better understanding of how Homebrew works.

### Brew Doctor

Check your system for potential problems. Will exit with a non-zero status if any potential problems are found. Please note that these warnings are just used to help the Homebrew maintainers with debugging if you file an issue. If everything you use Homebrew for is working fine: please don't worry or file an issue; just ignore this.

```shell
brew doctor
```
