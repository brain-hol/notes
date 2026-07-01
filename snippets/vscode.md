# VSCode

Allow emacs key bindings for next and previous on windows:

```
  {
    "key": "ctrl+p",
    "command": "-emacs-mcx.isearchExit",
    "when": "editorFocus && findWidgetVisible"
  },
  {
    "key": "ctrl+n",
    "command": "-emacs-mcx.isearchExit",
    "when": "editorFocus && findWidgetVisible"
  },
```

See [original post](https://mrcoles.com/emacs-key-bindings-vscode/) where I found this.
