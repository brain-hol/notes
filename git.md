# Git

## Commands

- View all the settings and where they come from:

```sh
git config --list --show-origin
```

- Change default branch name

```sh
git config --global init.defaultBranch main
```

- Show changes to a specific path only

```sh
git log -- path/to/file
```

- Annotated tags

```sh
git tag -a v1.4 -m "my version 1.4
```

- Push tag

```sh
git push origin <tagname>
```

- Delete tag

```sh
git push origin :regs/tags/<tagname>
```

```sh
git push origin --delete <tagname>
```

