# Build a dotnet project
This is an example pipeline for building a dotnet project in a container and copying the build artifacts to the host machine.

```yaml
name: Example dotnet pipeline
runs_on: mcr.microsoft.com/dotnet/sdk:6.0-focal
version: 1

variables:
  BRANCH: master
  CONFIG: release

steps:
- name: Fetch repository
  exec:
  - git clone -b bld:var:BRANCH https://some-url-to-the-example-project-repository

- name: Build project
  working_dir: /example_project
  exec:
  - dotnet build -c bld:var:CONFIG

artifacts:
- method: get
  from: /example_project/src/ExampleProject/bin/bld:var:CONFIG/net6.0
  to: /some/local/path
  after: Build project
```

# Build a nodejs project
This is an example for building a nodejs project in a container and copying the build artifacts to the host machine.

```yaml
name: Example nodejs pipeline
runs_on: node:16.14.2
version: 1

variables:
  BRANCH: master
  SCRIPT: build-prod

steps:
- name: Fetch repository
  exec:
  - git clone -b bld:var:BRANCH https://some-url-to-the-example-project-repository

- name: Build project
  working-dir: /example_project
  exec:
  - npm install
  - npm run bld:var:SCRIPT

artifacts:
- method: get
  from: /example_project/path/to/build/files
  to: /some/local/path
  after: Build project
```
