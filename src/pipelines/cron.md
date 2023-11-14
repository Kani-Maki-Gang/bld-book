# Cron

> Supported in pipeline versions: `version 2`

The `cron` field is optional and can configure the execution of a pipeline in a schedule that is defined using the cron syntax.

This field is only supported for server runs and doesn't affect local runs. Additionally it will set up a scheduled execution with the default values for variables and environment variables, if a more parameterized scheduled job is required please visit the `cron` cli subcommand.

An example use case it would be to execute a pipeline every 10 seconds
```yaml
cron: 10 * * * * * *
```
