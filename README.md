# Scene Forge

The Scene Forge repository root refers to the mono repo for the
Scene Forge project, which contains the main packages for the
project ecosystem.

## Packages

- [Application](packages/app/README.md)

## Development

Each package has its development and build process. Some scripts
are available in the repository root folder to run the pipeline
processes' general commands.

### Build

To build all the packages, run:

```sh
yarn build
```

It will iterate over all the packages and run the build command.
The build output will be available in each package's `dist`
folder. Still, in the repository's root folder, a new `dist`
folder will be created containing all generated outputs of all
packages respecting the deployment structure.

#### Deployment Structure

The `@sceneforge/app` generated files will be placed in the
`dist/` folder, making the application available at the
`https://app.sceneforge.org/` URL.
