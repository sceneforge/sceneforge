# Scene Forge

The Scene Forge repository root refers to the mono repo for the
Scene Forge project, which contains the main packages for the
project ecosystem.

- Applications:
  - [Development Documentation](apps/docs/README.md)
  - [Scene Forge](apps/sceneforge/README.md)
- Packages:
  - [@sceneforge/core](packages/core/README.md)
  - [@sceneforge/data](packages/data/README.md)
  - [@sceneforge/eslint](packages/eslint/README.md)
  - [@sceneforge/platform](packages/platform/README.md)
  - [@sceneforge/scene](packages/scene/README.md)
  - [@sceneforge/ui](packages/ui/README.md)

## Development

Each package has its development and build process. Some scripts
are available in the repository root folder to run the pipeline
processes' general commands.

### Prerequisites

- [Bun](https://bun.sh/)

### Setup

To install all the dependencies, run:

```sh
bun install
```

The command will download all packages and their dependencies.
For the dependencies placed in the monorepo, the default install
will run the `prepack` script for each package, which will build
each package the main application depends on.

### Development Environment

To run the development environment for the main application, run:

```sh
bun run dev
```

The command will start the development server for the `@sceneforge/app`
package.

The default URL for the development server is `http://localhost:9000/`.

#### Lint

To lint all the packages, run:

```sh
bun run lint:all
```

The command will iterate over all the packages and run the lint
command.

#### Storybook

To run the Storybook for the `@sceneforge/ui` package, run:

```sh
bun run storybook
```

The command will start the Storybook server for the `@sceneforge/ui`
package.

### Build

To build all the packages, run:

```sh
bun run build
```

It will iterate over all the packages and run the build command.
The build output will be available in each package's `dist`
folder.

#### Deployment Structure

The `@sceneforge/app` generated files is the release artifact.
GitHub Pages hosts the files making the application available at
the URL `https://app.sceneforge.org/`.
