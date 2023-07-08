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
    * __method__: A text option between oauth2 and ldap (work in progress).
    * __validation_url__: Usable only with the oauth2 method, and is a url that the bld server will use to validate a user.

* __supervisor__: The start of the supervisor section
  * __host__: The host that the supervisor will be exposed to.
  * __port__: The port that the supervisor will be exposed to.
  * __tls__: The start of the tls section with the below options
     * __cert_chain__: The path to a certificate file.
     * __private_key__: The path to the private key of the above certificate.
  * __workers__: A number that indicates how many worker processes can the supervisor spawn. This will be the maximum number of active pipeline runs on a server, with all other being queued.

* __logs__: A path to a directory where the logs for each run will be stored.
* __db__: A path to a directory where the database file for the server will be created.

# Remote configuration
The `remote` section of the config file is an array of servers that can be targeted. The available options are below.
* __server__: The name used to target this entry.
* __host__: The host address of the server.
* __port__: The port of the server.
* __tls__: A boolean indicating to use secure protocols when connecting to the server.

* __auth__: The start of the authentication section with the below options.
   * __method__: A text option between the choices of oauth2 and ldap (work in progress).
   * __auth_url__: The oauth2 authorization url.
   * __token_url__: The oauth2 access token url.
   * __redirect_url__: The oauth2 redirect url.
   * __client_id__: The oauth2 bld client id.
   * __client_secret__: The oauth2 bld client secret.
   * __scopes__: An text array of the scopes to be used in the authentication process.

* __same_auth_as__: A text that can be the name of another server on the remote list and will enable the auth section of that section to be reused.

# Putting it all together
Below is an example configuration with all of the above options

```yaml
server:
   host: 127.0.0.1
   port: 6080
   tls:
      cert_chain: path/to/server_certificate.crt
      private_key: path/to/server_private.key
   auth:
      oauth2
      url: https://somecool.oauth2provider.com/validate
   pipelines: .bld/server_pipelines
supervisor:
   host: 127.0.0.1
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
  auth:
     method: oauth2
     auth_url: https://somecool.oauth2provider.com/authorize
     token_url: https://somecool.oauth2provider.com/access_token
     redirect_url: https://127.0.0.1:6080/authRedirect
     client_id: _the_client_id_
     client_secret: _the_client_secret_
     scopes: [ "user:email" ]

- server: local_2
  host: 127.0.0.1
  port: 8080
  tls: true
  same_auth_as: local_1
```
