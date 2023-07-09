# Authorization

Server mode does not have it's own authentication method but it uses external authentication services. The only current method is using an existing oauth2 service (currently tested only with GitHub's OAuth apps), with an example below.

## Configuration of client to login using github
The below example assumes that a github oauth2 app has been setup.
```yaml
local:
  docker_url: tcp://127.0.0.1:2376
remote:
  - server: local_srv
    host: 127.0.0.1
    port: 6080
    auth:
      method: oauth2
      auth_url: https://github.com/login/oauth/authorize
      token_url: https://github.com/login/oauth/access_token
      client_id: your_oauth2_app_client_id
      client_secret: your_oauth2_app_client_secret
      scopes: ["public_repo", "user:email"]
  - server: local_srv_2
    host: 127.0.0.1
    port: 6090
    same_auth_as: local_srv
```

## Configuration of server to validate user using github
This will send a request to the provided validation url in order to fetch the user info.
```yaml
local:
    server:
      host: 127.0.0.1
      port: 6080
      auth:
        method: oauth2
        validation_url: https://api.github.com/user
    logs: .bld/logs
    db: .bld/db
    docker_url: tcp://127.0.0.1:2376
```

## Login process
```bash
# Use the login command to generate a url that will provide you with a code and state
# tokens used for the auth process
$ bld login

# Or use -s to specify the server name
$ bld login -s local_srv

Open the printed url in a browser in order to login with the specified oauth2 provider.

https://github.com/login/oauth/authorize?response_type=code&client_id=your_oauth2_client_id&state=some_state_token&code_challenge=some_generated_code_challenge&code_challenge_method=the_code_challenge_method&redirect_uri=http%3A%2F%2F127.0.0.1%3A6080%2FauthRedirect&scope=public_repo+user%3Aemail

After logging in input both the provided code and state here.
code:

state:

# At this point by navigating to the generated url you will be able to get the code and state. Copy it to your terminal and a new
# token will be created under .bld/oauth2 directory on a file with the target server as name.
```
