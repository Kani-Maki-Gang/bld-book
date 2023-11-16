# Github action
Bld has it's own custom github action called the [bld-action](https://github.com/marketplace/actions/bld-action). It's use case is to enable bld pipelines to run as part of a github workflow.

## How to use
This action runs under the current repository and will look for a valid bld project with a `.bld`directory. The action exposes a couple of arguments that can configure a run, and are similar to the options available to the `run` sub-command, since internally the action will invoke it to execute the pipeline. The available arguments are:
* pipeline: The name of the pipeline.
* server: The name of the server configuration that exists in the `.bld/config.yaml`.
* variables: A list of key values.
* environment: A list of key values.

Due to how the variables and environment variables are passed to the `run` sub-command you will need to use the below syntax to pass mulitple values in the workflow yaml file.
```yaml
variables: |-
   var1=hello
   var2=world
```

## Example usage in the bld repository
The `build-musl.yaml` pipeline that is responsible for creating the musl build of Bld uses a Dockerfile defined inside of the repository's `.bld` directory and executes a build of a specified branch with the default being master.
```yaml
name: Bld build pipeline for musl
version: 2
runs_on:
  name: bld-musl-builder
  dockerfile: ${{bld_root_dir}}/Dockerfile
  tag: latest

variables:
    branch: master

jobs:
  main:
  - working_dir: /usr/src
    exec:
    - echo 'Cloning repository on branch ${{branch}}'
    - git clone -b ${{branch}} https://github.com/Kani-Maki-Gang/bld.git
  - working_dir: /usr/src/bld
    exec:
    - cargo build --release --target x86_64-unknown-linux-musl

artifacts:
  - method: get
    from: /usr/src/bld/target/x86_64-unknown-linux-musl/release/bld
    to: ./dist
    after: main
```

The github workflow uses the `bld-action` to run the `build-musl.yaml` pipeline under the current branch that the workflow was run on.
```yaml
name: bld main workflow

on:
  push:
    branches: ["master"]
  pull_request:
    branches: ["master"]

jobs:
  build_musl:
    runs-on: ubuntu-latest
    name: Bld musl binary
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Get branch name
        id: get_branch_name
        shell: bash
        run: echo "branch=${GITHUB_HEAD_REF:-${GITHUB_REF#refs/heads/}}" >> $GITHUB_OUTPUT
      - name: Run bld pipeline
        uses: Kani-Maki-Gang/bld-github-action@v0.2.1-alpha
        with:
          pipeline: 'build-musl.yaml'
          variables: |-
            branch=${{ steps.get_branch_name.outputs.branch }}
```

> __Note__: The pipeline will be run using the `.bld/config.yaml` found in the repository.
> <br />__Note__: This action is still in alpha, one limitation is that the connection to docker needs to be specifically done using its unix socket since bld can't change how docker is started under the github workflow.
