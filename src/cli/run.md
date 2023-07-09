# Run
The `run` sub-command will execute a Bld pipeline either locally or on a server.

__options__
* --verbose                    Sets the level of verbosity
* -p, --pipeline <PIPELINE>        Path to pipeline script [default: default.yaml]
* -s, --server <SERVER>            The name of the server to run the pipeline
* --detach                     Detaches from the run execution (for server mode runs)
* -v, --variable <VARIABLES>       Define value for a variable. Can be used multiple times
* -e, --environment <ENVIRONMENT>  Define value for an environment variable. Can be used multiple times
* -h, --help                       Print help
* -V, --version                    Print version

__usage__
```bash
$ bld run -p example_pipeline.yaml
$ bld run -p example_pipeline.yaml -v variable1=some_value -v variable2=some_value -e env_variable=some_value
$ bld run -s local_server -p example_pipeline.yaml
$ bld run -s local_server -p example_pipeline.yaml -d
$ bld run -s local_server -p example_pipeline.yaml -v variable1=some_value -v variable2=some_value -e env_variable=some_value
$ bld run -s local_server -p example_pipeline.yaml -v variable1=some_value -v variable2=some_value -e env_variable=some_value -d
```
