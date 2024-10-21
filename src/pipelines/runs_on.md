# Runs_on
The `runs_on` field in the pipeline defines the platform of execution and currently the latest version of the pipeline syntax supports the below:

- machine
- container
- ssh connection

## Machine platform

> Supported in pipeline versions: `version 1`, `version 2`

The machine platform indicates that all commands will be executed directly on the host machine. The bld runtime will also create a temporary directory in `.bld/tmp` path with a unique Uuid as a directory that can be used for the run which will be cleaned up afterwards.

To use the machine platform simply use the below top level statement.

```yaml
runs_on: machine
```

## Container platform

The container platform is used so that commands defined in the pipeline are executed inside a docker container using an exec instance. The container platform supports various types of configuration.

### Run commands on existing docker images

> Supported in pipeline versions: `version 1`, `version 2`

To run commands on existing docker images. This option simply will try to create a new container at the start of the run based on the name of the provided image, if the image doesn't exist then the container won't be created. The user is responsible for maintaining the docker images in this case. As an example below we define this type of container platform for the latest ubuntu image.

```yaml
runs_on: ubuntu
```

### Run commands on existing or missing docker images

> Supported in pipeline versions: `version 2`

This type of the container platform is similar to the previous one but it can define the option to pull the docker image when the run starts. If the pull option is active then the run will look up the image, pull it if neccessary and then start the run on the created container. As an example to define such platform for the ubuntu image you can use the below top level statement.

```yaml
runs_on:
    image: ubuntu
    pull: true
```

To pull a specific image tag you can use the : notation similar to the example below.

```yaml
runs_on:
    image: ubuntu:20.04
    pull: true
```

Optionally you can specify the docker url to be used for the pull operation based on the defined urls in the bld configuration file. Remember that the docker url is the name of the target url.

```yaml
runs_on:
    image: ubuntu:20.04
    pull: true
    docker_url: unix_socket_docker_url
```

Last but not least you can define the docker registry to be used for the pull operation based on the defined registries in the bld configuration file or by setting a specific configuration for the pipeline.

```yaml
# Look up the registry in the global configuration
runs_on:
    image: ubuntu:20.04
    pull: true
    registry: ghcr

# Define the registry in the pipeline configuration
runs_on:
    image: ubuntu:20.04
    pull: true
    registry:
        url: ghcr.io
        username: some_username
        password: some_password
```

### Run commands on images built from a Dockerfile

> Supported in pipeline versions: `version 2`

This type of container platform leverages a Dockerfile to build an image based on specified configuration and then run the provided commands on a new container created with this image. As an example to create such a platform use the below top level statement.

```
runs_on:
    dockerfile: /path/to/dockerfile
    name: custom-image
    tag: latest
```

Optionally you can specify the docker url to be used for the pull operation based on the defined urls in the bld configuration file. Remember that the docker url is the name of the target url.

```yaml
runs_on:
    dockerfile: /path/to/dockerfile
    name: custom-image
    tag: latest
    docker_url: unix_socket_docker_url
```

## Ssh platform

> Supported in pipeline versions: `version 2`

The ssh platform exists in order to make the execution of multiple commands over an ssh connection easier. A user could always directly use the `ssh` binary in a command that is executed in a diffferent platform.

An example of using this platform is shown below:
```yaml
runs_on:
    host: 127.0.0.1
    port: 22
    user: some_user
    userauth:
        type: password
        password: the_user_password

```

Additionally you can define a global configuration for ssh connections in the `.bld/config.yaml` file and use the name of the configuration in the `runs_on` field as show below. See the `Server > SSH` section for more information on the global configuration.
```yaml
runs_on:
    ssh_config: my_global_ssh_config_key
```

Note here that this platform always expects the `host`, `user` and `userauth` fields with the `port` field being optional having a default value of `port: 22` if not provided. Additionally the `userauth` field has 3 types of authentication that can be defined.

### Password user authentication

The password authentication type for the ssh platform uses a password directly that is passed to the ssh connection when that is established. To define such user authentication you can use the below statement:

```yaml
userauth:
    type: password
    password: the_user_password
```

### Keys user authentication

The keys authentication type uses a private and a public key when establishing the ssh connection, and such a configuration can be done using the below statement:

```yaml
userauth:
    type: keys
    public_key: /path/to/public_key
    private_key: /path/to/private_key
```

The `private_key` field is mandatory but the `public_key` is optional.

### Agent user authentication

This type attemps to perform ssh agent authentication and can be configured using the below statement:

```yaml
userauth:
    type: agent
```
