# How to start a server
Bld has configuration options for running in server mode. In a brand new project you can run
```bash
$ bld init -s
```

To initialize a .bld directory with a `config.yaml` that has some default values. Additionally, you can use the `config` sub-command in order to print the entire configuration of your project.

Once the project is initialized, you can use the `server` sub-command to start bld in server mode.
```bash
$ bld server
$ bld -v server # run with verbosity and see debug logs
```

# Running a server pipeline
For this section let's say that you have deployed a bld server on a VM or container and want to run a pipeline on it. To do this you need first to target that server in your project's `config.yaml` file

```yaml
local:
  docker_url: tcp://127.0.0.1:2376

remote:
- server: example_server
  host: 127.0.0.1
  port: 6080
```

In the above example, we have the `example_server` in our remote config section, which is available at the defined host and port.

A Bld server generates and connect to a sqlite database in order to keep track of pipelines, runs and containers. This means that in order to run a pipeline on it, you need first to register it. To do this you can use the `push` sub-command. For example let's say that in a local project you have the `sample.yaml` pipeline. Execute the below to register it to the `example_server`

```bash
$ bld push -s example_server -p sample.yaml
$ bld push -p sample.yaml # when the -s option is not defined, the first entry in the remote section is used.
```

Once pushed you can use helper sub-commands like
- `list` to see all registered pipelines
- `inspect` to see the content of a pipeline on the server
- `pull` to download a pipeline from a server
- `rm` to remove a pipeline from a server

> For more details on each action, see the Command line interface wiki page.

Finnaly, to run the pipeline use the `run` sub-command and specify the target server

```bash
$ bld run -s example_server -p sample.yaml
```

This will start the execution on the server side and keep a web socket connection in order to see in real time the output of the pipeline. Use the `-d` flag to detach from the run. This will send a request to start the run and return immediately.

# Authentication

Server mode does not have it's own authentication method but it uses external authentication services. The only current method is using an existing oauth2 service (currently tested only with GitHub's OAuth apps), with an example below.

## Configuration of client to login using github
The below example assumes that a github oauth2 app has been setup.
```yaml
local:
  docker_url: tcp://127.0.0.1:2376
remote:
  - server: local_srv
    host: 127.0.0.1
    port: 6080
    auth:
      method: oauth2
      auth_url: https://github.com/login/oauth/authorize
      token_url: https://github.com/login/oauth/access_token
      client_id: your_oauth2_app_client_id
      client_secret: your_oauth2_app_client_secret
      scopes: ["public_repo", "user:email"]
  - server: local_srv_2
    host: 127.0.0.1
    port: 6090
    same_auth_as: local_srv
```

## Configuration of server to validate user using github
This will send a request to the provided validation url in order to fetch the user info.
```yaml
local:
    server:
      host: 127.0.0.1
      port: 6080
      auth:
        method: oauth2
        validation_url: https://api.github.com/user
    logs: .bld/logs
    db: .bld/db
    docker_url: tcp://127.0.0.1:2376
```

## Login process
```bash
# Use the login command to generate a url that will provide you with a code and state
# tokens used for the auth process
$ bld login

# Or use -s to specify the server name
$ bld login -s local_srv

Open the printed url in a browser in order to login with the specified oauth2 provider.

https://github.com/login/oauth/authorize?response_type=code&client_id=your_oauth2_client_id&state=some_state_token&code_challenge=some_generated_code_challenge&code_challenge_method=the_code_challenge_method&redirect_uri=http%3A%2F%2F127.0.0.1%3A6080%2FauthRedirect&scope=public_repo+user%3Aemail

After logging in input both the provided code and state here.
code:

state:

# At this point by navigating to the generated url you will be able to get the code and state. Copy it to your terminal and a new
# token will be created under .bld/oauth2 directory on a file with the target server as name.
```

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
