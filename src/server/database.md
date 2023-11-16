# Database

> <span style="color:red">IMPORTANT!</span> prior to the v0.3 release bld used the `diesel` crate for connecting to an `sqlite` database but from v0.3 onwards the project migrated to `SeaOrm` and now supports `postgres`, `mysql` as well as `sqlite` as a database. Due to this change projects running a server in prior versions will have issues with migrations since this was a breaking change.

Bld supports connecting to a `postgres`, `mysql` or `sqlite` databases. To do so you need to provide an appropriate connection url in the `.bld/config.yaml` file. Below there are examples on how you can configure the url for all 3 backends.

### Postgres
```yaml
local:
    server:
        db: postgres://some_user:some_password@127.0.0.1/bld-server
```

And an example using an explicit port:
```yaml
local:
    server:
        db: postgres://some_user:some_password@127.0.0.1:8888/bld-server
```

### Mysql
```yaml
local:
    server:
        db: mysql://some_user:some_password@127.0.0.1/bld-server
```

And an example using an explicit port:
```yaml
local:
    server:
        db: mysql://some_user:some_password@127.0.0.1:8888/bld-server
```

### Sqlite
```yaml
local:
    server:
        db: sqlite:///some/path/to/.bld/db/bld-server.db
```
