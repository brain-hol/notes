# Renormalize Git Line Endings

Make sure that `autocrlf` is set to `input`.

```sh
# Clear the index
git read-tree --empty
# Re-add to the index, triggering autocrlf
git add -A
# Commit
git commit "renormalize line endings"

# Then to make working tree match index
git reset --hard
```

```
--empty
   Instead of reading tree object(s) into the index, just empty it.
```
