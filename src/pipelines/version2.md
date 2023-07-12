# Pipeline V2 syntax

This page explains the syntax of the version 2 pipeline files with examples.

# Top level statements
The list of top level sections for a pipeline are:
- __version__: The pipeline syntax version. This helps with backwards compatibility and to target this version pipelines it should always be 2.
- __name__(optional): A name that will be printed on the execution log
- __runs_on__: The platform configuration that can either be `machine` or a set of options for a docker image.
- __cron__(optional): A text value that should represent a schedule of automatic execution for the pipeline that uses the cron syntax.
- __dispose__(optional): A boolean value that when set to true will not clean up after a run.
   - For machine runs a temporary directory is created under the `.bld/tmp/` path with a uuid directory for the run.
   - For container runs the container itself will not be stopped and removed.
- __variables__(optional): A set of variables that can be used to dynamically replace sections of various other options in the pipeline file.
- __environment__(optional): A set of environment variables that will be set when executing a step command or can dynamically replace sections of various other options in the pipeline file.
- __artifacts__(optional): An array that can configure operations for sending or fetching artifacts from a `container`.
- __external__(optional): An array that can configure execution of other pipelines either in the same Bld instance or to a target server.
- __jobs__: A set of command steps to execute, pipelines to call or invoke in a server. Jobs are executed in parallel.

Let's take for example the below pipeline, with the file name example.yaml, that needs to run on the current `machine` and list all files in a directory
```yaml
name: Example pipeline 1
runs_on: machine
working_dir: /home/user/target_directory
version: 2

jobs:
  main:
  - ls /home/user/target_directory
```

# Version
The `version` field is a mandatory field for the pipeline and for this part of the documentation it should always be 2 for the below features to be supported.
```yaml
version: 2
```

# Name
The `name` field is optional and simply will print out the defined value at the start of the pipeline's execution.
```yaml
name: An example pipeline name
```

> Note: The name field supports expressions so a variable, an environment variable or a built in constant can be used.

# Runs_on
The `runs_on` field in the pipeline defines the platform of execution. This can either be the host `machine` or a container and as shown above to invoke a pipeline on the machine you simply specify the value machine.
```yaml
runs_on: machine
```

For container there are mutliple options that can either simply create a container with an existing image by specifing it by name.
```yaml
runs_on: ubuntu
```

But it can also be configured to pull the desired image based on its name and it supports the use of a tag.
```yaml
runs_on:
  image: ubuntu
  pull: true
```

```yaml
runs_on:
  image: ubuntu:20.04
  pull: true
```

Finally the runs_on field can be configured to build a dockerfile and create the necessary image, and provide it with a name and a tag.
```
runs_on:
  dockerfile: /path/to/dockerfile
  name: custom-image
  tag: latest
```

> Note: The runs_on field supports expressions so a variable, an environment variable or a built in constant can be used.

# Cron
The `cron` field is optional and can configure the execution of a pipeline in a schedule that is defined using the cron syntax. _This field is only supported for server runs and doesn't affect local runs_.

An example use case it would be to execute a pipeline every 10 seconds
```yaml
cron: 10 * * * * * *
```

>Note: This field will set up a scheduled execution with the default values for variables and environment variables. If a more parameterized scheduled job is required please visit the `cron` cli subcommand.

# Dispose
The dispose field is optional and when set to true, it wont clean up after a pipeline run.

Specifically
- For machine runs a temporary directory is created under the `.bld/tmp/` path with a uuid directory for the run.
- For container runs the container itself will not be stopped and removed.

# Variables
The variables section is a hashmap where the key is the variable name and the value is its default value. The value of a variable can be modified by the user when running the pipeline.

Based on the first example, that was rather specific, we could enhance our pipeline with a variable to either list the content of the target_directory or another one specified when using the `run` subcommand. Below is a configured pipeline with a variable

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

Here we see the syntax for using a Bld variable, configuring its name and default value. It can be used with the format `${{directory}}` with the target variable name inside the curly braces. You can run the pipeline normally and leave the value as is or you can use the `-v` or `--variable` option of the `run` subcommand

```bash
$ bld run -p example.yaml -v directory=/home/kvl/another_directory
```

We can define multiple variables
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
> Note: The variable fields support expressions so a variable, an environment variable or a built in constant can be used as a variable's default value.

# Environment variables
Same with the variables section, the environment variables section is a hashmap where the key is the variable name and the value is its default value. The value of an environment variable can be modified the user when running the pipeline.

Just like with variables, they can be used with the same format as a variable or use the syntax $ syntax.

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

> Note: The environment variable fields support expressions so a variable, an environment variable or a built in constant can be used as a environment variable's default value.

# Keywords
This isn't related to any field available to the pipeline syntax but more regarding the expressions. Bld has some built in keywords for specific information about a run, those are
* __bld_root_dir__: This is the path to the .bld directory of the project.
* __bld_run_id__: This is the unique uuid for the pipeline run.
* __bld_start_time__: The start time of the pipeline run.

> All of the above can be used with the expression syntax similar to a variable and environment variable e.g. ${{bld_root_dir}}

# Artifacts
This section can be used to send or fetch files to or from a container created by a run. For example let say we create a pipeline that will create a file in an `ubuntu` container and then fetch it on the current machine.

```yaml
name: Example pipeline for artifacts
runs_on: ubuntu
version: 2

artifacts:
- method: get
  from: /sample_file
  to: /home/user/some_directory
  after: main

jobs:
  main:
  - echo 'hello world' > sample_file

```

The artifacts section supports methods `get` to retrieve files and `push` to send files to the container. The `after` field can specify a step instead of a job or it can be omitted in order for the operation to execute before any job or step.

```yaml
name: Example pipeline for artifacts
runs_on: ubuntu
version: 2

artifacts:
- method: get
  from: /sample_file
  to: /home/user/some_directory
  after: Echo step

jobs:
  main:
  - name: Echo step
    exec:
    - echo 'hello world' > sample_file
  - name: Another echo step
    exec:
    - echo 'hello again'
```

> Note: The artifacts section support expressions so a variable, an environment variable or a built in constant can be used in the `from`, `to` and `after` fields.

# External
The `external` section can used to declare information about another pipeline (either local or on a remote server) and be invoked by jobs.

Lets see all 3 ways that an external pipeline can be called. The first way is to simply call it in the exec part of a step.
```yaml
runs_on: ubuntu
version: 2

jobs:
  main:
  - ext: child.yaml
```

The second way is to define a new entry to the external section for the pipeline. This will pick up any values for variables and environment variables are desired for the invokation.

```yaml
runs_on: ubuntu
version: 2

external:
- pipeline: child.yaml
  variables:
    some-variable: an example value

jobs:
  main:
  - ext: child.yaml
```

The third way is to use a name in the external entries which can even have the same pipelines but with different declarations.

```yaml
runs_on: ubuntu
version: 2

variables:
  some-variable: an examples value

external:
- name: Call child.yaml with a variable
  pipeline: child.yaml
  variables:
    some-variable: ${{some-variable}}

- name: Call child.yaml on a server
  pipeline: child.yaml
  server: demo_server
  variables:
    some-variable: an example value

- name: Call child-2.yaml on a server
  pipeline: child-2.yaml
  server: demo_server

jobs:
  main:
  - ext: Call child.yaml with a variable
  - ext: Call child.yaml on a server
  - ext: Call child-2.yaml on a server
```


In the external section you can define a server in order to invoke the child pipeline to a Bld server. For example let see the below example that invokes a pipeline to a server called `demo`.

```yaml
pipeline: Parent pipeline
runs_on: ubuntu
version: 2

external:
- pipeline: child.yaml
  server: demo

jobs:
  main:
  - name: Do execute child
    exec:
    - ext: child.yaml
```

The `external` section can be configured to pass both variables and environment variables to the target pipeline. See the below example for configuring them

```yaml
external:
- name: Execute child pipeline
  pipeline: child.yaml
  variables:
  - variable1: hello
  - variable2: ${{some_variable}}
  environment:
  - env1: hello world
```


> Note: The external section support expressions so a variable, an environment variable or a built in constant can be used in the `name`, `server`, `pipeline`, `variables` and `environment` fields.

# Jobs
The `jobs` section describes a set of parallel commands to be executed or external pipelines to be invoked. All jobs contain a number of steps with steps having mutliple representation for the level of complexity they want to achieve.

Let's take a look at an example where a pipeline will execute a single job with multiple steps that print a message to stdout.
```yaml
name: Example pipeline
runs_on: machine
version: 2

jobs:
  main:
  - echo 'hello world'
  - echo 'hello again'
  - echo 'goodbye'
```

If you've read the previous section for the external pipelines, you will already know that by using the `ext:` on one of a job's step, the action taken is to invoke that pipeline, based on the external configuration (if no configuration is present the pipeline is simply run locally).
```yaml
name: Example pipeline
runs_on: machine
version: 2

jobs:
  main:
  - ext: example-pipeline-1.yaml
  - ext: example-pipeline-2.yaml
  - echo 'hello'
```

if a step requires more refined operations such as executing many actions you can define a `name` and an `exec` list.

```yaml
name: Example pipeline for multiple steps
runs_on: machine
version: 2

jobs:
  main:
  - name: List the content of directories
    exec:
    - ls ./some_directory
    - ls ./some_other_directory
    - ls ./yet_another_directory

  - name: Create a sample file
    exec:
    - echo 'hello world' > sample_file

  - name: Curl IP address
    exec:
    - curl ifconfig.me
```

A named step can also have `ext` entries as shown below
```yaml
name: Example pipeline for calling another pipeline
runs_on: machine
version: 2

jobs:
  main:
  - name: Call another pipeline and list a directory
    exec:
    - ext: example-1.yaml
    - ls ./some_directory
```

You can use the `working_dir` option to change the target directory for a specific step as show below

```yaml
name: Example pipeline
runs_on: ubuntu
version: 2

jobs:
  main:
  - name: First step
    working_dir: /some/working/directory
    exec:
    - ls ./subdirectory
    - rm ./subdirectory/file

  - name: Second step
    working_dir: /another/working/directory
    exec:
    - ls ./some-other-dir/
```

Remember that a named step can be used from an artifacts section to transfer data from or to a container.

> Note: The jobs section support expressions so a variable, an environment variable or a built in constant can be used in all forms of a step and it's fields.
