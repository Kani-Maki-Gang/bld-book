# Keywords

> Supported for pipeline versions: `version 1`, `version 2`

This isn't related to any field available to the pipeline syntax but more regarding the expressions. Bld has some built in keywords for specific information about a run, those are

### Version 1
All of the below keywords are used with the `bld:run:` prefix.

* __root_dir__ : This is the path to the .bld directory of the project.
* __id__: This is the unique uuid for the pipeline run.
* __start_time__: The start time of the pipeline run.

```yaml
version: 1
runs_on: machine

steps:
    - exec:
      - echo bld:run:root_dir
      - echo bld:run:id
      - echo bld:run:start_time
```

### Version 2
All of the below keywords are used inside the `${{ ... }}` syntax.

* __bld_root_dir__: This is the path to the .bld directory of the project.
* __bld_project_dir__: This is the path to the current project directory, that is the parent of the .bld directory.
* __bld_run_id__: This is the unique uuid for the pipeline run.
* __bld_start_time__: The start time of the pipeline run.

```yaml
version: 2
runs_on: machine

jobs:
    main:
      - echo ${{bld_root_dir}}
      - echo ${{bld_project_dir}}
      - echo ${{bld_run_id}}
      - echo ${{bld_start_time}}
```
