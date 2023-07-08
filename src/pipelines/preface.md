# Pipeline syntax
Bld pipelines are built with backwards compatibility in mind, meaning that after a bld update existing pipelines will not break even if new functionality is introduced or the pipeline changes alltogether.

This is achived through a version number that is seperate from the release version of bld. When a breaking change is introduced in the pipeline syntax, in order to support new features, a pipeline version bump will happen thus all existing pipelines will execute with the set of features they were designed and will not break. This is done to let the user migrate to a new pipeline syntax at their leasure.

The current pipeline versions are
- [Version 1](./version1.md)
- [Version 2](./version2.md) `latest`
