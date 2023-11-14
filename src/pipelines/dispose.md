# Dispose

> Supported in pipeline versions: `version 1`, `version 2`

The dispose field is optional and when set to true, it wont clean up after a pipeline run.

Specifically
- For the machine platform the temporary directory that is created under the `.bld/tmp/` path with a Uuid directory for the run, won't be deleted.
- For the container platform the container itself won't be stopped and removed.
- Dispose is ignored for the `ssh` platform, since the ssh connection will close once the run finishes.
