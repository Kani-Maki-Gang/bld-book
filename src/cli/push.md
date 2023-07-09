# Push
The `push` sub-command will push new content of a pipeline to a Bld server.

__options__
* --verbose              Sets the level of verbosity
* -p, --pipeline <PIPELINE>  The name of the pipeline to push
* -s, --server <SERVER>      The name of the server to push changes to
* --ignore-deps          Don't include other pipeline dependencies
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld push -s local_server -p example_pipeline.yaml
$ bld push -s local_server -p example_pipeline.yaml --ignore-deps
```
