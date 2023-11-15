# Validation

> Supported in pipeline versions: `version 1`, `version 2`

Pipelines are run under a set of validation rules that target to help identify issues before the pipeline actually runs. This is the first part of a local run, but validation rules will be executed when a pipeline is pushed in a bld server instance and manually by running the `check` subcommand.

The validation rules differ between pipeline versions since the syntax could change drastically,  since the validation are both structural for the yaml file as well as contextual based on what features are used. Below all validation rules for each version will be presented.

## Version 1
| Pipeline section | Validation rule |
|------------------|-----------------|
| `external->pipeline` | Checks if the pipeline file path exists. |
| `external->server` | Checks if the server name used is found in the `.bld/config.yaml` file. |
| `steps->exec->ext` | Checks if the external key is found either as a local pipeline or a defined external declaration inside the pipeline itself. |
| `artifacts->after` | Checks if the step name in the after key is found in the pipeline's steps. |

## Version 2
| Pipeline section | Validation rule |
|------------------|-----------------|
| `runs_on` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->name` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->tag` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->dockerfile` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->image` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->ssh_config` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->ssh_config` | If no variables or keywords found then the name is checked in the `.bld/config.yaml` file in order to find if it has been defined. |
| `runs_on->host` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->port` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->user` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->userauth->public_key` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->userauth->public_key` | If no variables or keywords are used then the path is checked if it exists. |
| `runs_on->userauth->private_key` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `runs_on->userauth->private_key` | If no variables or keywords are used then the path is checked if it exists. |
| `runs_on->userauth->password` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `cron` | Checks if the defined cron syntax is a valid schedule. |
| `variables` | Checks all defined variables if the name is a built in keyword. |
| `variables` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `environment` | Checks all defined variables if the name is a built in keyword. |
| `environment` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `external->name` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `external->pipeline` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `external->pipeline` | Checks if the pipeline file path exists when no variables or keywords are used. |
| `external->server` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `external->server` | Checks if the server name used is found in the `.bld/config.yaml` file when no variables or keywords are used. |
| `external->variables` | Checks all defined variables if the name is a built in keyword. |
| `external->variables` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `external->environment` | Checks all defined variables if the name is a built in keyword. |
| `external->environment` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `artifacts->from` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `artifacts->to` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `artifacts->after` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `artifacts->after` | Checks if the step name in the after key is found in the pipeline's jobs or steps. |
| `steps->exec->ext` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
| `steps->exec->ext` | Checks if the external key is found either as a local pipeline or a defined external declaration inside the pipeline itself. |
| `steps->exec->working_dir` | Checks for use of variables, environment variables or keywords and if their name is defined in the pipeline. |
