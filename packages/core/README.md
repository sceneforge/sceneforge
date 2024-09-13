# @sceneforge/core

The `@sceneforge/core` package contains core utilities and functionalities for the Scene Forge project. This package provides essential tools and types that are used across the entire Scene Forge ecosystem.

## Usage

Here's an example of how to use the core utilities provided by the @sceneforge/core package:

```typescript
import { SceneBlobType, getSceneBlobType } from '@sceneforge/core';

// Example usage of SceneBlobType and getSceneBlobType
const file = new Blob();
const sceneBlobType = getSceneBlobType(file);

console.log(sceneBlobType); // Output: undefined (or the detected SceneBlobType)
```

## Build

To build the `@sceneforge/core` package, run:

```sh
bun run build
```

## Lint

To lint the `@sceneforge/core` package, run:

```sh
bun run lint
```
