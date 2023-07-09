# Cat
The `cat` sub-command will print the content of a pipeline on a Bld server.

__options__
* --verbose              Sets the level of verbosity
* -p, --pipeline <PIPELINE>  The name of the pipeline to print
* -s, --server <SERVER>      The name of the server to print the pipeline from
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld inspect -s local_server -p example_pipeline.yaml
```
