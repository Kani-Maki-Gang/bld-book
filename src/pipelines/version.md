# Version
The `version` field is a mandatory field that indicates which specific features are available to a pipeline. A new pipeline version is created when a breaking change must be done in the pipeline yaml structure for a specific feature to be supported. Additionally each version has a dedicated runner which means that a new version of bld will execute the existing pipelines as before.

An example of defining a version is below.
```yaml
version: 2
```

Pipeline versions are independent of the bld version, since the pipeline execution or structure might not change at all between releases.

The current available versions and features are listed below.

| Feature | Version 1 | Version 2 |
|---------|-----------|-----------|
| Execute commands on host machine | <span style="color:lightgreen">Yes</span> | <span style="color:lightgreen">Yes</span> |
| Execute commands on an existing container image | <span style="color:lightgreen">Yes</span> | <span style="color:lightgreen">Yes</span> |
| Execute commands on a container image that can be pulled if not found | <span style="color:red">No</span> | <span style="color:lightgreen">Yes</span> |
| Execute commands on a container image that is built directly through a Dockerfile | <span style="color:red">No</span> | <span style="color:lightgreen">Yes</span> |
| Execute commands on a server with an ssh connection | <span style="color:red">No</span> | <span style="color:lightgreen">Yes</span> |
| Run parallel jobs | <span style="color:red">No</span> | <span style="color:lightgreen">Yes</span> |
| Support for variables | <span style="color:lightgreen">Yes</span> | <span style="color:lightgreen">Yes</span> |
| Support for environment variables | <span style="color:lightgreen">Yes</span> | <span style="color:lightgreen">Yes</span> |
| Call child pipelines with the ability to provide variables and environment variables | <span style="color:lightgreen">Yes</span> | <span style="color:lightgreen">Yes</span> |
