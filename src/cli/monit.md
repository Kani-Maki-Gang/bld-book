# Monit
The `monit` sub-command will connect to a Bld server and monitor the execution of a running pipeline.

__options__
* --verbose                    Sets the level of verbosity
* -i, --pipeline-id <PIPELINE_ID>  The id of the pipeline to monitor. Takes precedence over pipeline
* -p, --pipeline <PIPELINE>        The name of the pipeline of which to monitor the last run
* -s, --server <SERVER>            The name of the server to monitor the pipeline from
* --last                       Monitor the execution of the last invoked pipeline. Takes precedence over pipeline-id and pipeline
* -h, --help                       Print help
* -V, --version                    Print version

__usage__
```bash
$ bld monit -s local_server -p example_pipeline.yaml
$ bld monit -s local_server -i 8f0159e0-7f5c-4dc6-9b1a-70a219d85450
$ bld monit --last
$ bld monit -s local_server --last
```
