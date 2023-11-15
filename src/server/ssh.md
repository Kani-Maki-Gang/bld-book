# SSH

One of the supported platforms is `ssh` which lets a pipeline execute all commands using a ssh connection. This part of the book isn't neccessarily only for bld servers but for local configurations as well.

In the `.bld/config.yaml` file you can define a `ssh` section that accepts keys/values for a number of ssh configurations, with an example shown below:

```yaml
local:
    ssh:
        test_server_1:
            host: 192.168.122.3
            user: test_user
            userauth:
                type: keys
                public_key: /path/to/public_key
                private_key: /path/to/private_key
        test_server_2:
            host: 192.168.122.4
            user: test_user_2
            userauth:
                type: password
                password: some_password
        test_server_3:
            host: 192.168.122.5
            user: test_user_3
            userauth:
                type: agent
```

And use one of the above keys in a pipeline as shown below:
```yaml
version: 2
runs_on:
    ssh_config: test_server_1

jobs:
    main:
    - echo hello world
```

The `ssh` configuration is similar to the one described in the `Pipelines > Runs on` section but for quick reference they will be presented here as well.


This configuration always expects the `host`, `user` and `userauth` fields with the `port` field being optional having a default value of `port: 22` if not provided. Additionally the `userauth` field has 3 types of authentication that can be defined.

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
