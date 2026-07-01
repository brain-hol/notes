# Linux

## Neovim Alternative

Install appimage version to `/usr/local/bin`

Follow the instructions from the install doc but it looks like this today:

```
CUSTOM_NVIM_PATH=/usr/local/bin/nvim
set -u
sudo update-alternatives --install /usr/bin/ex ex "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/vi vi "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/view view "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/vim vim "${CUSTOM_NVIM_PATH}" 110
sudo update-alternatives --install /usr/bin/vimdiff vimdiff "${CUSTOM_NVIM_PATH}" 110
```

```
systemd-ask-password -n | systemd-creds --user encrypt - cf-tunnel-token.cred
```

```sh
gsettings set org.gnome.desktop.input-sources xkb-options "['caps:ctrl_modifier']"
```

```sh
gsettings set org.gnome.shell always-show-log-out true
```

```sh
gsettings set org.gnome.desktop.wm.preferences button-layout ":minimize,maximize,close"
```
