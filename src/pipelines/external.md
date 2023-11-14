# External

> Supported in pipeline versions: `version 1`, `version 2`

The `external` section can used to declare information about another pipeline (either local or on a remote server) and be invoked by jobs.

Lets see all 3 ways that an external pipeline can be called. The first way is to simply call it in the exec part of a step.
```yaml
runs_on: ubuntu
version: 2

jobs:
  main:
  - ext: child.yaml
```

The second way is to define a new entry to the external section for the pipeline, where values for variables and environment variables can be defined.

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


As seen above in the external section you can define a server in order to invoke the child pipeline to a Bld server. For example let see the below example that invokes a pipeline to a server called `demo`.

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

Additionally as you will already have figured out you can pass both variables and environment variables to the target pipeline. See the below example for configuring them.

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

> Note: The external section support expressions so a variable, an environment variable or a keyword can be used in the `name`, `server`, `pipeline`, `variables` and `environment` fields.

