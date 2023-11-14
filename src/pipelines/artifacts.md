# Artifacts

> Supported in pipeline versions: `version 1`, `version 2`

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

> Note: The artifacts section support expressions so a variable, an environment variable or a keyword can be used in the `from`, `to` and `after` fields.

