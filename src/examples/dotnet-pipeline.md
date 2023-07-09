# Build a dotnet project
This is an example pipeline for building a dotnet project in a container and copying the build artifacts to the host machine.

```yaml
name: Example dotnet pipeline
version: 2
runs_on:
  image: mcr.microsoft.com/dotnet/sdk:6.0-focal
  pull: true

variables:
  branch: master
  config: release

artifacts:
- method: get
  from: /example_project/src/ExampleProject/bin/bld:var:CONFIG/net6.0
  to: /some/local/path
  after: main

jobs:
  main:
  - git clone -b ${{branch}} https://some-url-to-the-example-project-repository
  - name: Build project
    working_dir: /example_project
    exec:
    - dotnet build -c ${{config}}

```

