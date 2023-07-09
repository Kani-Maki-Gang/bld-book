# Cron
The `cron` subcommand provides functionality from manipulating cron jobs in a server.

__commands__
* cat     Print detailed information for a registered cron job in a server
* add     Adds a cron job to a server
* ls      Lists all registered cron jobs in a server
* update  Updates a cron job to a server
* rm      Removes a registered cron job from a server
* help    Print this message or the help of the given subcommand(s)

__options__
* -h, --help     Print help
* -V, --version  Print version

## Cron cat
The `cron cat` subcommand prints detailed information for a registered cron job in a server.

__options__
* --verbose          Sets the level of verbosity
* -s, --server <SERVER>  The name of the server to fetch the cron job from
* -i, --id <ID>          The id of the target cron job
* -h, --help             Print help
* -V, --version          Print version

__usage__
```bash
$ bld cron cat -i 5592508f-507c-4224-a7af-1983c2ccb971 -s local
```

## Cron add
the `cron add` subcommand adds a cron job to a server.

__options__
* --verbose                    Sets the level of verbosity
* -s, --server <SERVER>            The name of the server to upsert the cron job to
* -p, --pipeline <PIPELINE>        The name of the target pipeline
* -S, --schedule <SCHEDULE>        The new schedule for the cron job
* -v, --variable <VARIABLES>       Define value for a variable. Can be used multiple times
* -e, --environment <ENVIRONMENT>  Define value for an environment variable. Can be used multiple times
* -h, --help                       Print help
* -V, --version                    Print version

__usage__
```bash
$ bld cron add -s local -p sample-pipeline.yaml -S '10 * * * * * *' -v var1=hello -v var2=world -e env1='hello world'
```

## Cron ls
The `cron ls` subcommand lists all registered cron jobs in a server.

__options__
* --verbose               Sets the level of verbosity
* -s, --server <SERVER>       The name of the server to list the cron jobs from
* -i, --id <ID>               The id of the target cron job
* -p, --pipeline <PIPELINE>   The pipeline name for the target cron jobs
* -S, --schedule <SCHEDULE>   The schedule for the target cron jobs
* -d, --default <IS_DEFAULT>  Fetch only the default cron jobs [possible values: true, false]
* -l, --limit <LIMIT>         Limit the results
* -h, --help                  Print help
* -V, --version               Print version

__usage__
```bash
$ bld cron ls -s local
$ bld cron ls -s local -p sample-pipeline.yaml
$ bld cron ls -s local -p sample-pipeline.yaml -l 10
$ bld cron ls -s local -l 10 -d true
```

## Cron update
The `cron update` subcommand updates a cron job to a server.

__options__
* --verbose                    Sets the level of verbosity
* -s, --server <SERVER>            The name of the server to upsert the cron job to
* -i, --id <ID>                    The id of the target cron job
* -S, --schedule <SCHEDULE>        The new schedule for the cron job
* -v, --variable <VARIABLES>       Define value for a variable. Can be used multiple times
* -e, --environment <ENVIRONMENT>  Define value for an environment variable. Can be used multiple times
* -h, --help                       Print help
* -V, --version                    Print version

__usage__
```bash
$ bld cron update -s local -i 5592508f-507c-4224-a7af-1983c2ccb971 -S '10 * * * * * *' -v var1=hello -e env1=world
```

## Cron rm
The `cron rm` subcommand removes a registered cron job from a server.

__options__
* --verbose           Sets the level of verbosity
* -i, --id <CRON_JOB_ID>  The id of the cron job to remove
* -s, --server <SERVER>   The name of the server to remove the cron job from
* -h, --help              Print help
* -V, --version           Print version

__usage__
```bash
$ bld cron rm -s local -i 5592508f-507c-4224-a7af-1983c2ccb971
```
