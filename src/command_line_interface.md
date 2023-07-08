# Login
The `login` sub-command initiates the authentication process to a bld server.

__options__
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld login
$ bld login -s local_server
Open the printed url in a browser in order to login with the specified oauth2 provider.

https://github.com/login/oauth/authorize?response_type=code&client_id=your_oauth2_client_id&state=some_state_token&code_challenge=some_generated_code_challenge&code_challenge_method=the_code_challenge_method&redirect_uri=http%3A%2F%2F127.0.0.1%3A6080%2FauthRedirect&scope=public_repo+user%3Aemail

After logging in input both the provided code and state here.
code:

state:

# At this point by navigating to the generated url you will be able to get the code and state. Copy it to your terminal and a new
# token will be created under .bld/oauth2 directory on a file with the target server as name.
```
# Check
The `check` sub-command will validate a pipeline file for errors.

__options__
* -p, --pipeline: Path to pipeline script [default: default.yaml]
* -s, --server:  name of the server to run the pipeline
* -h, --help:  help information
* -V, --version: version information

__usage__
```bash
$ bld check
$ bld check -p example_pipeline.yaml
$ bld check -s local_server -p example_pipeline.yaml
```

# Config
The `config` sub-command lists all of Bld's configuration. This will also print configuration options that you might not have set but bld will assign a default value to.

__options__
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld config
```

# Hist
The `hist` sub-command will fetch execution history of pipelines on a Bld server.

__options__
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* -x, --state: Filter for the pipeline state. Available values are initial, queued, running, finished and faulted. Default value is running.
* -l, --limit: Limit the number of rows returned. Default value is 100.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld hist
$ bld hist -s local_server
$ bld hist -s local_server -x queued
$ bld hist -s local_server -x queued -l 200
```

# Init
The `init` sub-command will initialize a bld project by creating a new .bld directory.

__options__
* -s, --server: Initializes configuration for a Bld server.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld init
$ bld init -s
```

# Inspect
The `inspect` sub-command will print the content of a pipeline on a Bld server.

__options__
* -p, --pipeline: The name of the target pipeline.
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld inspect -p example_pipeline.yaml
$ bld inspect -s local_server -p example_pipeline.yaml
```

# Ls
The `ls` sub-command will list all registered pipelines of a Bld server.

__options__
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld ls
$ bld ls -s local_server
```

# Rm
The `rm` sub-command will remove a registered pipeline from a Bld server.

__options__
* -p, --pipeline: The name of the target pipeline.
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld rm -p example_pipeline.yaml
$ bld rm -s local_server -p example_pipeline.yaml
```

# Monit
The `monit` sub-command will connect to a Bld server and monitor the execution of a running pipeline.

__options__
* -i, --pipeline-id: The id of the pipeline to monitor. Takes precedence over --pipeline.
* -p, --pipeline: The name of the target pipeline.
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* --last: Monitor the last invoked pipeline. Takes precedence over --pipeline-id and pipeline.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld monit -p example_pipeline.yaml
$ bld monit -s local_server -p example_pipeline.yaml
$ bld monit -i 8f0159e0-7f5c-4dc6-9b1a-70a219d85450
$ bld monit -s local_server -i 8f0159e0-7f5c-4dc6-9b1a-70a219d85450
$ bld monit --last
$ bld monit -s local_server --last
```

# Supervisor
The `supervisor` sub-command is used by the Bld server and it's advised to not be used it directly.

# Push
The `push` sub-command will push new content of a pipeline to a Bld server.

__options__
* -p, --pipeline: The name of the target pipeline.
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* --ignore-deps: Won't upload any of the pipeline's dependencies to the server.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld push -p example_pipeline.yaml
$ bld push -p example_pipeline.yaml --ignore-deps
$ bld push -s local_server -p example_pipeline.yaml
$ bld push -s local_server -p example_pipeline.yaml --ignore-deps
```

# Pull
The `pull` sub-command will fetch the content of a pipeline from a Bld server.

__options__
* -p, --pipeline: The name of the target pipeline.
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* --ignore-deps: Won't download any of the pipeline's dependencies from the server.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld pull -p example_pipeline.yaml
$ bld pull -p example_pipeline.yaml --ignore-deps
$ bld pull -s local_server -p example_pipeline.yaml
$ bld pull -s local_server -p example_pipeline.yaml --ignore-deps
```

# Run
The `run` sub-command will execute a Bld pipeline either locally or on a server.

__options__
* -p, --pipeline: The name of the target pipeline.
* -s, --server: The name of the target server.
* -d, --detach: Detaches from the run execution. Valid for server runs.
* -v, --variable: Define value for a pipeline variable.
* -e, --environment: Define value for a pipeline environment variable.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld run -p example_pipeline.yaml
$ bld run -p example_pipeline.yaml -v variable1=some_value -v variable2=some_value -e env_variable=some_value
$ bld run -s local_server -p example_pipeline.yaml
$ bld run -s local_server -p example_pipeline.yaml -d
$ bld run -s local_server -p example_pipeline.yaml -v variable1=some_value -v variable2=some_value -e env_variable=some_value
$ bld run -s local_server -p example_pipeline.yaml -v variable1=some_value -v variable2=some_value -e env_variable=some_value -d
```

# Server
The `server` subcommand will start a Bld server instance.

__options__
* -H, --host: The server's host address.
* -P, --port: The server's port.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usages__
```bash
$ bld server
$ bld server -H 127.0.0.1 -P 6080
```

# Stop
The `stop` sub-command will stop a running server pipeline.

__options__
* -i, --id: The of the running pipeline.
* -s, --server: The name of the target server. When omitted the first entry in the remote configuration is used.
* -h, --help: Print help information.
* -V, --version: Print version information.

__usage__
```bash
$ bld stop -i 8f0159e0-7f5c-4dc6-9b1a-70a219d85450
$ bld stop -s local_server -i 8f0159e0-7f5c-4dc6-9b1a-70a219d85450
```

# Worker
The `worker` sub-command will spawn a new run for a pipeline but is used internally by the bld server so it's advised not to be used directly.

# Help
The `help` sub-command will print the general help message for the Bld command line interface or the appropriate help message for another sub-command.

__usage__
```bash
$ bld help
$ bld help run
$ bld help push
$ bld help stop
```
