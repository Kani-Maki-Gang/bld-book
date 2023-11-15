# Cp
The `cp` sub-command will copy local or server pipelines.

__options__
* --verbose              Sets the level of verbosity
* -p, --pipeline <PIPELINE>  The pipeline to copy
* -t, --target <TARGET>      The target path
* -s, --server <SERVER>      The name of the server to execute the copy operation
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld cp -p source_pipeline.yaml -t target_pipeline.yaml # Copy local pipelines
$ bld cp -p source_pipeline.yaml -t target_pipeline.yaml -s local_server # Copy server pipelines
```
