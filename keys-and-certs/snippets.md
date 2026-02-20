# Personal Dev Certs

Generate CA key:

```sh
openssl genrsa -des3 -out localhost-ca.key 2048
```

Generate CA cert:

```sh
openssl req -x509 -new -nodes -key localhost-ca.key -sha256 -days 3650 -out localhost-ca.pem
```

Combined:

```sh
openssl req -new -x509 -newkey rsa:4096 -days 3650 -keyout ca-key.pem -out ca-cert.pem
```

Examine:

```sh
openssl x509 -in ca-cert.pem -text -noout
```

Generate server key:

```sh
openssl genrsa -out am.localhost.key 2048
```

Generate server signing request:

```sh
openssl req -new -key am.localhost.key -out am.localhost.csr
```

Create ext file (`am.localhost.ext`):

```
[v3_req]
subjectAltName = @alt_names

[alt_names]
DNS.1 = am.localhost
DNS.2 = am.dev.localhost
```

Create server cert:

```sh
openssl x509 -req -in am.localhost.csr -CA localhost-ca.pem -CAkey localhost-ca.key -CAcreateserial -out am.localhost.pem -days 365 -sha256 -extfile am.localhost.ext -extensions v3_req
```

(Notes on serial param: https://stackoverflow.com/a/66357989)

Create pfx:

```sh
openssl pkcs12 -export -out am.localhost.pfx -inkey am.localhost.key -in am.localhost.pem
```

On MacOS, certs need to go in the System keychain

#work #personal
