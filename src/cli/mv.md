# Mv
The `mv` sub-command will move local or server pipelines.

__options__
* --verbose              Sets the level of verbosity
* -p, --pipeline <PIPELINE>  The pipeline to move
* -t, --target <TARGET>      The target path
* -s, --server <SERVER>      The name of the server to execute the move operation
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld mv -p source_pipeline.yaml -t target_pipeline.yaml # Move local pipelines
$ bld mv -p source_pipeline.yaml -t target_pipeline.yaml -s local_server # Move server pipelines
```
