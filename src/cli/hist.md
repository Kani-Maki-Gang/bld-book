# Hist
The `hist` sub-command will fetch execution history of pipelines on a Bld server.

__options__
* --verbose              Sets the level of verbosity
* -s, --server <SERVER>      The name of the server to fetch history from
* -x, --state <STATE>        Filter the history with state. Possible values are all, initial, queued, running, finished [default: running]
* -p, --pipeline <PIPELINE>  Filter the history with state. Possible values are all, initial, queued, running, finished
* -l, --limit <LIMIT>        Limit the results [default: 100]
* -h, --help                 Print help
* -V, --version              Print version

__usage__
```bash
$ bld hist -s local_server
$ bld hist -s local_server -x initial
$ bld hist -s local_server -x queued
$ bld hist -s local_server -x running
$ bld hist -s local_server -x finished
$ bld hist -s local_server -x faulted
$ bld hist -s local_server -x all
$ bld hist -s local_server -x running -l 200
```
