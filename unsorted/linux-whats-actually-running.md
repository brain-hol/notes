# Linux - What's Actually Running

### 1. Get PID from netstat or ss

Example:

```bash
sudo ss -tpn | grep <port-or-ip>
```

This gives you the PID and process name.

---

### 2. Query detailed info about that PID

- **Full command line:**

```bash
ps -p <pid> -o pid,user,args
```

- **Executable path:**

```bash
readlink /proc/<pid>/exe
```

- **Open file descriptors:**

```bash
ls -l /proc/<pid>/fd
```

- **Environment variables:**

```bash
tr '\0' '\n' < /proc/<pid>/environ
```
