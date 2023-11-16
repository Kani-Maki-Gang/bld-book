# Authorization

Server mode does not have it's own authorization method but it uses external services. The only current method is using an existing oidc provider with an example below.

## Configuration of server to validate user using google's oidc
The below example assumes that google authorization has been setup.
```yaml
local:
  server:
    host: localhost
    port: 6080
    auth:
      method: oidc
      issuer_url: https://accounts.google.com
      redirect_url: http://localhost:6080/auth/redirect
      client_id: __the client id__
      client_secret: __the client secret__
      scopes: ["openid", "profile", "email"]
      user_property: name
  docker_url: tcp://127.0.0.1:2376
```

> Note: The `user_property` field will be used as the identification name for the user for various logs in the server such as run history etc. The only available values are name or email and these are retrieved from the user info url discovered from the oidc provider.

## Configuration of a server from a client's config.yaml
This will send a request to the provided validation url in order to fetch the user info.
```yaml
local:
  docker_url: tcp://127.0.0.1:2376
remote:
- server: local_server
  host: localhost
  port: 6080
```

## Login process
Use the `login` subcommand from the client this will connect to the server using a websocket that in turn will start the login operation.
```bash
$ bld login -s local_server
```

Once the login process starts, a url will be sent to the client and be opened automatically in a browser instance that will point to google's login page (If opening the brower fails, the url will be printed to stdout for the user to navigate m. Once the user is authenticated, the server will receive the tokens send them to the client throught the open web socket and then the login process will finish.
