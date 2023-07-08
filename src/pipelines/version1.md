# Pipeline V1 syntax

This page is dedicated in explaining the syntax of the version 1 pipeline files with examples.

# Top level statements
The list of top level sections for a pipeline are:
- __name__(optional): A name that will be printed on the execution log.
- __runs_on__: The target run platform that can either be `machine` or the name of a docker image.
- __version__: The pipeline syntax version. This helps with backwards compatibility.
- __dispose__(optional): A boolean value that when set to true will not clean up after a run.
   - For machine runs a temporary directory is created under the `.bld/tmp/` path with a uuid directory for the run.
   - For container runs the container itself will not be stopped and removed.
- __variables__(optional): An array of variables that can be used to dynamically replace sections of a step command.
- __environment__(optional): An array of environment variables that will be set when executing a step command.
- __artifacts__(optional): An array that can configure operations for sending or fetching artifacts from a `container`.
- __external__(optional): An array that can configure execution of other pipelines either in the same Bld instance or to a target server.
- __steps__: An array of command to execute, pipelines to call or invoke in a server.

Let's take for example the below pipeline, with the file name example.yaml, that needs to run on the current `machine` and list all files in a directory
```yaml
name: Example pipeline 1
runs_on: machine
working_dir: /home/user/target_directory
version: 1

steps:
- name: List all content of target_directory
  working_dir: /home/user/target_directory
  exec:
  - ls
```

# Variables
The variables section is a hashmap where the key is the variable name and the value is its default value. The value of a variable can be modified the user when running the pipeline.

Based on the previous example, that was rather specific, we could enhance our pipeline with a variable to either list the content of the target_directory or another one specified when using the `run` subcommand. Below is a configured pipeline with a variable

```yaml
name: Example pipeline with variables 1
runs_on: machine
version: 1

variables:
  directory: /home/user/target_directory

steps:
- name: List all content of target_directory
  working_dir: bld:var:directory
  exec:
  - ls
```

Here we see the syntax for using a Bld variable, configuring its name and default value. It can be used with the `bld:var:` prefix and using the name `directory` for the variable name. You can run the pipeline normally and leave the value as is or you can use the `-v` or `--variable` option of the `run` subcommand

```bash
$ bld run -p example.yaml -v directory=/home/kvl/another_directory
```

We can define multiple variables
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

And set new values using the cli

```bash
$ bld run -p example.yaml -v first_directory=some_path -v second_directory=some_other_path -v third_directory=some_yet_another_path
```

# Environment variables
Same with the variables section, the environment variables section is a hashmap where the key is the variable name and the value is its default value. The value of an environment variable can be modified the user when running the pipeline.

Just like with variables, they can used with the `bld:env:` prefix or use the syntax $ syntax.

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

And specify a different value using the `-e` or `--environment` of the `run` subcommand

```bash
$ bld run -p example.yaml -e first_directory=some_path -e second_directory=some_other_path
```

# Artifacts
This section can be used to send or fetch files to or from a container created by a run. For example let say we create a pipeline that will create a file in an `ubuntu` container and then fetch it on the current machine.

```yaml
name: Example pipeline for artifacts
runs_on: ubuntu
version: 1

steps:
- name: Create a sample file
  exec:
  - echo 'hello world' > sample_file

artifacts:
- method: get
  from: /sample_file
  to: /home/user/some_directory
  after: Create a sample file
```

The artifacts section supports methods `get` to retrieve files and `push` to send files to the container. Additionally the `after` section can be omitted in order for the operation to execute before any step.

# External
The `external` section can used to declare information about another pipeline (either local or on a remote server) and be invoked by steps section. Let's see an example with a parent pipeline called `parent.yaml` that needs to execute a child pipeline called `child.yaml`.

```yaml
pipeline: Parent pipeline
runs_on: ubuntu
version: 1

external:
- pipeline: child.yaml

steps:
- name: Do execute child
  exec:
  - ext: child.yaml
```

The above is the simplest form of executing another pipeline locally, but a server option can be provided if the run of the child pipeline needs to be done in another machine. Lets change the above example in order to invoke the child pipeline to a Bld server called `demo`.

```yaml
pipeline: Parent pipeline
runs_on: ubuntu
version: 1

external:
- pipeline: child.yaml
  server: demo

steps:
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
  - variable2: world
  environment:
  - env1: hello world
```

Lets see all 3 ways that an external pipeline can be called. The first way is to simply call it in the exec part of a step.
```yaml
runs_on: ubuntu
version: 1

steps:
- exec:
  - ext: child.yaml
```

The second way is to define a new entry to the external section for the pipeline. This will pick up any values for variables and environment variables are desired for the invokation.

```yaml
runs_on: ubuntu
version: 1

external:
- pipeline: child.yaml
  variables:
    some-variable: an example value

steps:
- exec:
  - ext: child.yaml
```

The third way is to use a name in the external entries in order to have different declarations for the same pipeline.

```yaml
runs_on: ubuntu
version: 1

external:
- name: Call child.yaml with a variable
  pipeline: child.yaml
  variables:
    some-variable: an example value

- name: Call child.yaml on a server
  pipeline: child.yaml
  server: demo_server
  variables:
    some-variable: an example value

steps:
- exec:
  - ext: Call child.yaml with a variable
  - ext: Call child.yaml on a server
```

# Steps
The `steps` section describes a set of commands to be executed or external pipelines to be invoked. Lets look at an example where there are multiple steps in a pipeline for listing contents of a directory, creating a sample file and using curl to see the IP address of the machine.

```yaml
name: Example pipeline for multiple steps
runs_on: machine
version: 1

steps:
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

Let's consider now that the above pipeline was called `example-1.yaml` and we wanted all of its steps to be part of another pipeline called `example-2.yaml`, we could call the pipeline as shown below.

```yaml
name: Example pipeline for calling another pipeline
runs_on: machine
version: 1

steps:
- name: Call another pipeline and list a directory
  exec:
  - ext: example-1.yaml
  - ls ./some_directory
```

You can use the `working_dir` option to change the target directory for a specific step as show below

```yaml
name: Example pipeline
runs_on: ubuntu
version: 1

steps:
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
