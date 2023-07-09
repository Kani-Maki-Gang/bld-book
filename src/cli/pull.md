# Pull
The `pull` sub-command will fetch the content of a pipeline from a Bld server.

__options__
* --verbose              Sets the level of verbosity
* -p, --pipeline <PIPELINE>  The name of the bld server
* -s, --server <SERVER>      The name of the server to pull the pipeline from
* --ignore-deps          Do not include other pipeline dependencies
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld pull -s local_server -p example_pipeline.yaml
$ bld pull -s local_server -p example_pipeline.yaml --ignore-deps
```
