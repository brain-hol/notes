# Keys and Certs

## Certificates

It starts with ASN.1 - ASN.1 (Abstract Syntax Notation One) is a standard interface description language for defining data structures that can be serialized and deserialized in a cross-platform way.

This is tightly coupled with an encoding ruleset. Common ones for certs are BER (Basic Encoding Rules) and DER (Distinguished Encoding Rules). DER is the most common and recommended for certs.

`openssl` is a very common tool to work with these. It knows about well defined ASN.1 like the X.509 certificate schema. We can create a cert and save it with DER encoding like this:

Create a config file (this is providing the information required for the ASN.1 schema)

```
[ req ]
default_bits       = 2048
default_keyfile    = privkey.pem
distinguished_name = req_distinguished_name
req_extensions     = req_ext

[ req_distinguished_name ]
countryName            = Country Name (2 letter code)
countryName_default    = US
stateOrProvinceName    = State or Province Name (full name)
stateOrProvinceName_default = California
localityName           = Locality Name (eg, city)
localityName_default   = Mountain View
organizationName       = Organization Name (eg, company)
organizationName_default = Example Company
commonName             = Common Name (e.g. server FQDN or YOUR name)
commonName_default     = www.example.com

[ req_ext ]
subjectAltName = @alt_names

[alt_names]
DNS.1 = www.example.com
```

Run the `openssl` command:

```shell
openssl req -new -x509 -config cert.conf -outform DER -out certificate.der -days 365
```

`openssl req`: Command to generate a new certificate request or a self-signed certificate.
  - `-new`: Generate a new certificate request.
  - `-x509`: Generate a self-signed certificate.
  - `-config` cert.conf: Use the configuration file (cert.conf) to define certificate details.
  - `-outform DER`: Output format is DER-encoded.
  - `-out certificate.der`: Output file name for the DER-encoded certificate.
  - `-days 365`: Validity period of the certificate in days.

DER works, but it is a binary format which is bad for protocols that expect text, even for common operations like copy and paste. PEM (Privacy-Enhanced Mail) is a well defined Base64 encoding of the binary so that it can be saved in a text file.

`openssl` can convert from DER to PEM:

```shell
openssl x509 -inform DER -in certificate.der -out certificate.pem
```

`openssl x509`: Command to process X.509 certificates.
  - `-inform DER`: Specifies that the input format is DER-encoded.
  - `-in certificate.der`: Input file containing the DER-encoded X.509 certificate.
  - `-out certificate.pem`: Output file where the PEM-encoded certificate will be saved.

We can also skip the intermediate DER like this:

```shell
openssl req -new -x509 -config cert.conf -out certificate.pem -days 365
```
