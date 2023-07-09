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

