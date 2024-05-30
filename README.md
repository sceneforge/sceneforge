# Scene Forge

The Scene Forge repository root refers to the mono repo for the
Scene Forge project, which contains the main packages for the
project ecosystem.

## Packages

- [Site](packages/site/README.md)
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

Starting from the package `@sceneforge/site`, all files generated
by the build process will be placed in the root `dist` folder,
making the website available at the root URL.

Next, the `@sceneforge/app` generated files will be placed in the
`dist/app` folder, making the application available at the `/app`
URL.

> **Note:**
> 
> The build process of the `@sceneforge/site` package should not
> generate a folder named `app` in the root of the `dist` folder,
> as it will conflict with the application build. The general
> build will replace the `app` folder, causing the site to have
> possible broken links or unexpected behaviour.
