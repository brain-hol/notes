# VM Snippets

Clear history

```sh
cat /dev/null > ~/.bash_history && history -c && exit
```

```sh
# Print fingerprints
ls /etc/ssh/ssh_host_*_key.pub | xargs -n 1 ssh-keygen -lf

# Print public keys for known_hosts
ls /etc/ssh/ssh_host_*_key.pub | xargs -n 1 cat
```

```sh
nmcli
# ens160: connected to ens160
#         "VMware VMXNET3"
#         ethernet (vmxnet3), 00:0C:29:5B:26:17, hw, mtu 1500
#         ip4 default
#         inet4 172.17.2.54/24
#         inet4 172.17.2.53/24
#         inet4 172.17.2.52/24
#         inet4 172.17.2.51/24
#         route4 172.17.2.0/24 metric 100
#         route4 172.17.2.0/24 metric 100
#         route4 172.17.2.0/24 metric 100
#         route4 172.17.2.0/24 metric 100
#         route4 default via 172.17.2.2 metric 100
#         inet6 fe80::20c:29ff:fe5b:2617/64
#         route6 fe80::/64 metric 1024
# 
# lo: unmanaged
#         "lo"
#         loopback (unknown), 00:00:00:00:00:00, sw, mtu 65536
# 
# DNS configuration:
#         servers: 172.17.2.2
#         domains: dev.trivir.com
#         interface: ens160
```


Set capabilities of program to allow protected port

```sh
sudo setcap CAP_NET_BIND_SERVICE=+eip /path/to/binary
```

Fix mouse by adding to VMX file or Globally in `C:\ProgramData\VMware\VMware Workstation\config.ini`:

```
mouse.vusb.enable = "TRUE"
mouse.vusb.useBasicMouse = "FALSE"
```
