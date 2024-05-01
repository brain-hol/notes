# Creating Linux Service Account

### Short Form

```bash
useradd -r -M -s /usr/sbin/nologin -d /var/opt/grafana -U grafana
```

### Long Form

```bash
useradd \
  --system \
  --no-create-home \
  --shell /usr/sbin/nologin \
  --home-dir /var/opt/grafana \
  --user-group \
  grafana
```

### Explanation

- `useradd`: creates a new user account or updates default new account information
- `-r` / `--system`: creates a system account
- `-M` / `--no-create-home`: prevents the creation of a home directory for the new user
- `-s` / `--shell`: sets the login shell for the new user
- `-d` / `--home-dir`: specifies the home directory for the new user
- `-U` / `--user-group`: creates a group with the same name as the user and makes the user a member of that group
- `grafana`: the name of the user to be created

This command creates a new system user named `grafana` without a home directory and with a login shell of `/usr/sbin/nologin`. The user is added to a new group with the same name as the user.

## Login

```
su <service-account> -s /bin/bash
```
