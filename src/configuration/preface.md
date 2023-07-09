# How to configure bld
You can edit the `config.yaml` file inside a `.bld` directory in order to configure both local options and add new target bld servers.

# Local configuration
The `local` section of the configuration has the below options available
ability mode.
* __docker_url__: The url with which a connection will be established to the docker engine API.

* __server__: The start of the server section with the below options
  * __host__: The host that the server will be exposed to.
  * __port__: The port that the server will be exposed to.
  * __tls__: The start of the tls section with the below options
    * __cert_chain__: The path to a certificate file.
    * __private_key__: The path to the private key for the above certificate.
  * __pipelines__: A path to a directory in which the server will store registered pipelines.
  * __auth__: The authentication section for the server.
    * __method__: A text option that for the current release only accepts the value oidc.
    * __issuer_url__: The issuer url for the authorization provider.
    * __redirect_url__: The redirect url of the bld server.
    * __client_id__: The client id configured in the oidc provider for the bld server.
    * __client_secret__: The client secret for the bld server.
    * __scopes__: An array of scopes provided when logging in.
    * __user_property__: The property that a user will be associated with. Accepts the values name or email.

* __supervisor__: The start of the supervisor section
  * __host__: The host that the supervisor will be exposed to.
  * __port__: The port that the supervisor will be exposed to.
  * __tls__: The start of the tls section with the below options
    * __cert_chain__: The path to a certificate file.
    * __private_key__: The path to the private key of the above certificate.
  * __workers__: A number that indicates how many worker processes can the supervisor spawn. This will be the maximum number of active pipeline runs on a server, with all other being queued.

* __logs__: A path to a directory where the logs for each server run will be stored.
* __db__: A path to a directory where the database file for the server will be created.

# Remote configuration
The `remote` section of the config file is an array of servers that can be targeted. The available options are below.
* __server__: The name used to target this entry.
* __host__: The host address of the server.
* __port__: The port of the server.
* __tls__: A boolean indicating to use secure protocols when connecting to the server.

# Putting it all together
Below is an example configuration with all of the above options

```yaml
local:
  server:
     host: localhost
     port: 6080
     tls:
        cert_chain: path/to/server_certificate.crt
        private_key: path/to/server_private.key
     auth:
        method: oidc
        issuer_url: https://some_issuer_url
        redirect_url: https://localhost:6080/authRedirect
        client_id: some_client_id
        client_secret: some_client_secret
        scopes: ["scope1", "scope2"]
        user_property: email
     pipelines: .bld/server_pipelines
  supervisor:
     host: localhost
     port: 7080
     tls:
        cert_chain: path/to/supervisor_certificate.crt
        private_key: path/to/supervisor_private.key
     workers: 50
  logs: .bld/logs
  db: .bld/db
  docker-url: tcp://127.0.0.1:2376

remote:
- server: local_1
  host: 127.0.0.1
  port: 6080
  tls: true
- server: local_2
  host: 127.0.0.1
  port: 8080
```
