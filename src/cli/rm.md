# Rm
The `rm` sub-command will remove a registered pipeline from a Bld server.

__options__
* --verbose              Sets the level of verbosity
* -s, --server <SERVER>      The name of the server to remove from
* -p, --pipeline <PIPELINE>  The name of the pipeline
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld rm -p example_pipeline.yaml
$ bld rm -s local_server -p example_pipeline.yaml
```
