# Build a nodejs project
This is an example for building a nodejs project in a container and copying the build artifacts to the host machine.

```yaml
name: Example nodejs pipeline
version: 2
runs_on:
  image: node:lts
  pull: true

variables:
  branch: master
  script: build-prod

artifacts:
- method: get
  from: /example_project/path/to/build/files
  to: /some/local/path
  after: main

jobs:
  main:
  - git clone -b ${{branch}} https://some-url-to-the-example-project-repository
  - name: Build project
    working-dir: /example_project
    exec:
    - npm install
    - npm run ${{SCRIPT}}

```
