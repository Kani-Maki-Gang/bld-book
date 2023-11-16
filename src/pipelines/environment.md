# Environment variables

> Supported in pipeline versions: `version 1`, `version 2`.
> <br /> The syntax between the pipeline versions differ so all examples will be presented for both.

Same with the variables section, the environment variables section is a hashmap where the key is the variable name and the value is its default value. The value of an environment variable can be modified the user when running the pipeline.

Just like with variables, they can be used with the same format as a variable with the `bld:env:` prefix for version 1 and the `${{ ... }}` syntax for version 2.

__version 1__
```yaml
name: Example pipeline with environment variables 1
runs_on: machine
version: 1

environment:
  first_directory: /home/user/target_directory
  second_directory: /home/user/another_directory

steps:
- name: List content of all directories
  exec:
  - ls bld:env:first_directory
  - ls $second_directory
```

__version 2__
```yaml
name: Example pipeline with environment variables 1
runs_on: machine
version: 2

environment:
  first_directory: /home/user/target_directory
  second_directory: /home/user/another_directory

jobs:
  main:
  - name: List content of all directories
    exec:
    - ls ${{first_directory}}
    - ls $second_directory
```

And specify a different value using the `-e` or `--environment` of the `run` subcommand

```bash
$ bld run -p example.yaml -e first_directory=some_path -e second_directory=some_other_path
```

> Note: The environment variable fields support expressions so a variable, an environment variable or a keyword can be used as a environment variable's default value.
