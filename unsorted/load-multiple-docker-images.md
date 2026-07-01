---
tags:
  - snippets
---

# Load Multiple Docker Images

This command loads Docker images from the `.tar` files in the current directory into Docker's image registry. Each file is processed one at a time using the `docker load` command. If there are no `.tar` files in the directory, the `docker load` command will not be executed.

### Short Form

```bash
ls -1 *.tar | xargs -r -L 1 docker load -i
```

### Long Form

```bash
ls \
  --format=single-column \
  *.tar | \
xargs \
  --no-run-if-empty \
  --max-lines=1 \
docker load \
  --input

```

### Explanation

- `ls`: lists files and directories in a directory
- `-1` / `--format=single-column`: lists one file per line
- `*.tar`: selects all files in the current directory with a `.tar` file extension
- `|`: pipes the output of the `ls` command to the `xargs` command
- `xargs`: reads items from standard input and executes a command with those items as arguments
- `-r` / `--no-run-if-empty`: prevents running the command if there are no input arguments
- `-L 1` / `--max-lines=1`: limits the number of items passed to the command to one at a time
- `docker load`: loads Docker images from a file
- `-i` / `--input`: specifies that the image to load is contained in a file
