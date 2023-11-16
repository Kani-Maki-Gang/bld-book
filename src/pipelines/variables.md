# Variables

> Supported in pipeline versions: `version 1`, `version 2`.
> <br /> The syntax between the pipeline versions differ so all examples will be presented for both.

The variables section is a hashmap where the key is the variable name and the value is its default value. The value of a variable can be modified by the user when running the pipeline.

Based on the first example, that was rather specific, we could enhance our pipeline with a variable to either list the content of the target_directory or another one specified when using the `run` subcommand. Below is a configured pipeline with a variable

__version 1__
```yaml
name: Example pipeline with variables 1
runs_on: machine
version: 1

variables:
  directory: /home/user/target_directory

steps:
- name: List all content of target_directory
  exec:
  - ls bld:var:directory
```

__version 2__
```yaml
name: Example pipeline with variables 1
runs_on: machine
version: 2

variables:
  directory: /home/user/target_directory

jobs:
  main:
  - ls ${{directory}}
```

Here we see the syntax for using a Bld variable, configuring its name and default value. It can be used with the format `bld:var:directory` for version 1 and `${{directory}}` for version 2. You can run the pipeline normally and leave the value as is or you can use the `-v` or `--variable` option of the `run` subcommand

```bash
$ bld run -p example.yaml -v directory=/home/kvl/another_directory
```

We can define multiple variables

__version 1__
```yaml
name: Example pipeline with variables 2
runs_on: machine
version: 1

variables:
  first_directory: /home/user/target_directory
  second_directory: /home/user/another_directory
  third_directory: /home/user/yet_another_directory

steps:
- name: List content of all directories
  exec:
  - ls bld:var:first_directory
  - ls bld:var:second_directory
  - ls bld:var:third_directory
```

__version 2__
```yaml
name: Example pipeline with variables 2
runs_on: machine
version: 2

variables:
  first_directory: /home/user/target_directory
  second_directory: /home/user/another_directory
  third_directory: /home/user/yet_another_directory

jobs:
  main:
  - ls ${{first_directory}}
  - ls ${{second_directory}}
  - ls ${{third_directory}}
```

And set new values using the cli

```bash
$ bld run -p example.yaml -v first_directory=some_path -v second_directory=some_other_path -v third_directory=some_yet_another_path
```
> Note: The variable fields support expressions so a variable, an environment variable or a keyword can be used as a variable's default value.
