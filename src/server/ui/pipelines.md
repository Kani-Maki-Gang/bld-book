# Pipelines page

The pipelines page displays the list of pipelines available to the server with the ability to search, filter and perform actions on them.

<p align="center">
    <img style="text-align: center;" height="400" width="800" src="../../assets/ui/pipelines.png">
</p>

For each pipelines the following actions are available:

<p align="center">
    <img style="text-align: center;" height="150" width="500" src="../../assets/ui/pipelines_actions.png">
</p>

Where each below is listed the action related to each one of them in the same order as they appear in the image above:
- `Edit`: This action allows the user to edit the pipeline by navigating to its info page (as of v0.4 the ability to edit the pipelines isn't implemented so you can only inspect the information about the pipeline).
- `Run`: This action allows the user to run the pipeline by navigating to the run page.
- `Move (Rename)`: This action allows the user to move the pipelines to a different path essentially renaming it.
- `Copy`: This action allows the user to create a new copy of the pipeline to a different path.
- `Delete`: This action allows the user to delete the pipeline.

Each operation triggers an action but some of them display a dialog to confirm or configure the operation.

### Move (Rename) action dialog

<p align="center">
    <img style="text-align: center;" height="300" width="600" src="../../assets/ui/pipelines_cut_action.png">
</p>

### Copy action dialog

<p align="center">
    <img style="text-align: center;" height="300" width="600" src="../../assets/ui/pipelines_copy_action.png">
</p>

### Delete action dialog

<p align="center">
    <img style="text-align: center;" height="300" width="600" src="../../assets/ui/pipelines_delete_action.png">
</p>
