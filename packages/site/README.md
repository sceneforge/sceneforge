# Scene Forge Site

The Site package contains the source code for the Scene Forge
project's public-facing website. The site's primary goal is
to provide documentation and information about the project
and showcase some of the application's features and
capabilities.

## Development

The site creation is on top of the libraries
[Astro](https://astro.build/) and the
[Starlight theme](https://starlight.astro.build/).

To start the development server, run the following:

**In the root folder of the repository:**
```sh
yarn workspace @sceneforge/site dev
```

**In the site workspace folder (`packages/site`):**
```sh
yarn dev
```

This will start the development server, commonly available at
the URL `http://localhost:4321'.

### Build

The build process generates a static site ready to deploy to
any static hosting provider, with no server-side processing
required.

To build the site, run:

**In the root folder of the repository:**
```sh
yarn workspace @sceneforge/site build
```

**In the site workspace folder (`packages/site`):**
```sh
yarn build
```

The build output will be in the `dist` folder, containing all
the files needed to deploy the site.

## Authoring Content

As the Starlight theme predefines, the content lives in the
`src/content` folder. Inside it, the folder `docs` contains
the Markdown files that will be transformed into stunning
HTML pages.

More details about the authoring content are available on the
[Starlight documentation page](https://starlight.astro.build/guides/authoring-content/).

## Contributing

Please read [CONTRIBUTING.md](../../CONTRIBUTING.md) for
details on our code of conduct, and the process for submitting
pull requests to us.

## License

This project is licensed under the Creative Commons Legal
Code - see the [LICENSE](../../LICENSE) file for details.
