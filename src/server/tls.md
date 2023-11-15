# TLS

Server mode can be configured to use a certificate for https and wss connections. For most cases having the server behind a battle tested reverse proxy would be best.

To configure the certificate see the below example
```yaml
local:
    server:
        host: 127.0.0.1
        port: 6080
        tls:
            cert_chain: /path/to/server/certificate
            private_key: /path/to/server/private-key
    supervisor:
        host: 127.0.0.1
        port: 7080
        tls:
            cert_chain: /path/to/supervisor/certificate
            private_key: /path/to/supervisor/private-key

```
The certificate should be of type PEM. Setting the tls option for the supervisor means that all communications between the server and the supervisor will be done using https and wss.

Connecting to a server with enabled tls, the local configuration should have the option of tls set to true, as seen in the below example.
```yaml
local:
    docker_url: tcp://127.0.0.1:2376
remote:
    - server: local_srv
      host: 127.0.0.1
      port: 6080
      tls: true
```
