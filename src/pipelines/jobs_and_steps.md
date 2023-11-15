# Jobs and steps

> Jobs are supported in pipeline versions: `version 2`
> <br />Steps are supported in pipeline versions: `version 1`, `version 2`

The `jobs` section describes a set of parallel commands to be executed or external pipelines to be invoked. All jobs contain a number of steps with steps having mutliple representation for the level of complexity they want to achieve.

In `version 1` of the pipeline syntax only steps could be defined and run sequentially, while in `version 2` jobs were introduced for parallel execution.

Let's take a look at an example where a `version 1` pipeline will execute some command in sequential order:
```yaml
name: Example pipeline for multiple steps
runs_on: machine
version: 1

steps:
  - exec:
    - ls ./some_directory
    - ls ./some_other_directory
    - ls ./yet_another_directory

  - exec:
    - echo 'hello world' > sample_file

  - exec:
    - curl ifconfig.me
```

The same example for a `version 2` pipeline that executes the command but in parallel:
```yaml
name: Example pipeline
runs_on: machine
version: 2

jobs:
  list_content_of_directories:
  - ls ./some_directory
  - ls ./some_other_directory
  - ls ./yet_another_directory

  create_sample_file:
  - echo 'hello world' > sample_file

  curl_ip_address:
  - curl ifconfig.me
```

If you've read the previous section for the external pipelines, you will already know that by using the `ext:` key on a step, the action taken is to invoke that pipeline, based on the external configuration (if no configuration is present the pipeline is simply run locally).

__version 1__
```yaml
name: Example pipeline
runs_on: machine
version: 1

steps:
  - exec:
    - ext: example-pipeline-1.yaml
    - ext: example-pipeline-2.yaml
    - echo 'hello'
```

__version 2__
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

__version 1__
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

__version 2__
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

__version 1__
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

__version 2__
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

__version 1__
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

__version 2__
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

Remember that a named step can be used from an artifacts section to transfer data from or to the used platform.

> Note: The jobs section support expressions so a variable, an environment variable or a keyword can be used in all forms of a step and it's fields.
