# How to configure bld
You can edit the `config.yaml` file inside a `.bld` directory in order to configure both local options and add new target bld servers.

# Local configuration
The `local` section of the configuration has the below options available
ability mode.
* __docker_url__: The url with which a connection will be established to the docker engine API. This can be either a single url or multiple urls, defined with a name and the ability to set a default.

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
  * __logs__: A path to a directory where the logs for each server run will be stored.
  * __db__: The database connection url for `postgres`, `mysql` or `sqlite`.

* __supervisor__: The start of the supervisor section
  * __host__: The host that the supervisor will be exposed to.
  * __port__: The port that the supervisor will be exposed to.
  * __tls__: The start of the tls section with the below options
    * __cert_chain__: The path to a certificate file.
    * __private_key__: The path to the private key of the above certificate.
  * __workers__: A number that indicates how many worker processes can the supervisor spawn. This will be the maximum number of active pipeline runs on a server, with all other being queued.

* __editor__: The name or path to your editor of choice for editing a pipeline through the bld cli.

* __ssh__: The ssh global configuration that pipelines can use to establish an ssh connection.

* __registries__ `new to v0.4.x`: A section to define properties about available registries and credentials to access them if they are private.
  * __url__: The url of the registry.
  * __username__ `optional`: The username to access the registry.
  * __password__ `optional`: The password to access the registry.

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
     logs: .bld/logs
     db: sqlite:///path/to/project/.bld/db/bld-server.db
  supervisor:
     host: localhost
     port: 7080
     tls:
        cert_chain: path/to/supervisor_certificate.crt
        private_key: path/to/supervisor_private.key
     workers: 50
  # Using a single docker url
  # docker_url: unix:///var/run/docker.sock
  # Multiple docker urls
  docker_url:
    unix:
        url: unix:///var/run/docker.sock
        default: true
    tcp: tcp://127.0.0.1:2376
  editor: vim
  ssh:
     test_server_1:
         host: 192.168.122.3
         user: test_user
         userauth:
             type: keys
             public_key: /path/to/public_key
             private_key: /path/to/private_key
     test_server_2:
         host: 192.168.122.4
         user: test_user_2
         userauth:
             type: password
             password: some_password
     test_server_3:
         host: 192.168.122.5
         user: test_user_3
         userauth:
             type: agent
  registries:
    docker_io:
        url: https://docker.io
    ghcr:
        url: https://ghcr.io
        username: some_username
        password: some_password

remote:
- server: local_1
  host: 127.0.0.1
  port: 6080
  tls: true
- server: local_2
  host: 127.0.0.1
  port: 8080
```
