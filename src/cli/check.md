# Check
The `check` sub-command will validate a pipeline file for errors.

__options__
* --verbose              Sets the level of verbosity
* -p, --pipeline <PIPELINE>  Path to pipeline script [default: default.yaml]
* -s, --server <SERVER>      The name of the server to check the pipeline from

__usage__
```bash
$ bld check
$ bld check -s local_server -p example_pipeline.yaml
```
