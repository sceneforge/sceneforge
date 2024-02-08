// Type definitions for pnpapi 0.0
// Project: https://yarnpkg.github.io/berry/advanced/pnpapi
// Definitions by: Maël Nison <https://github.com/arcanis>
//                 ExE Boss <https://github.com/ExE-Boss>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
declare module "pnpapi" {
  /**
   * Original Definition of the enum
   * {@link https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L3-L7 | `PathType` }
   * found in package {@link https://www.npmjs.com/package/@yarnpkg/fslib | `npm:@yarnpkg/fslib`}
   *
   * @remarks This enum is not exported by the package `@yarnpkg/fslib`.
   *
   * @see https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L3-L7
   */
  enum PathType {
    File,
    Portable,
    Native,
  }

  /**
   * Original Definition of the type
   * {@link https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L9 | `PortablePath` }
   * found in package {@link https://www.npmjs.com/package/@yarnpkg/fslib | `npm:@yarnpkg/fslib`}
   *
   * @see https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L9
   */
  type PortablePath = string & {
    __pathType: PathType.File | PathType.Portable;
  };

  /**
   * Original Definition of the type
   * {@link https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L10 | `NativePath` }
   * found in package {@link https://www.npmjs.com/package/@yarnpkg/fslib | `npm:@yarnpkg/fslib`}
   *
   * @see https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L10
   */
  type NativePath = string & {
    __pathType?: PathType.File | PathType.Native;
  };

  /**
   * Original Definition of the type
   * {@link https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L19 | `Path`}
   * found in package {@link https://www.npmjs.com/package/@yarnpkg/fslib | `npm:@yarnpkg/fslib`}
   *
   * @see https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/path.ts#L19
   */
  type Path = PortablePath | NativePath;

  export enum LinkType {
    HARD = `HARD`,
    SOFT = `SOFT`,
  }

  export interface PhysicalPackageLocator {
    name: string;
    reference: string;
  }
  export interface TopLevelPackageLocator {
    name: null;
    reference: null;
  }

  export type PackageLocator = PhysicalPackageLocator | TopLevelPackageLocator;

  export type DependencyTarget =
    // A reference, to link with the dependency name
    | string
    // An aliased package
    | [string, string]
    // A missing peer dependency
    | null;

  export interface PackageInformation<P extends Path> {
    packageLocation: P;
    packageDependencies: Map<string, DependencyTarget>;
    packagePeers: Set<string>;
    linkType: LinkType;
    discardFromLookup: boolean;
  }

  export interface PackageInformationData<P extends Path> {
    packageLocation: P;
    packageDependencies: [string, DependencyTarget][];
    packagePeers?: string[];
    linkType: LinkType;
    discardFromLookup?: boolean;
  }

  export type PackageStore = Map<
    string | null,
    PackageInformation<PortablePath>
  >;

  export type PackageStoreData = [
    string | null,
    PackageInformationData<PortablePath>
  ][];

  export type PackageRegistry = Map<string | null, PackageStore>;

  export type PackageRegistryData = [string | null, PackageStoreData][];

  export type LocationLengthData = number[];

  // This is what is stored within the .pnp.data.json file
  export interface SerializedState {
    // @eslint-ignore-next-line @typescript-eslint/naming-convention
    __info: string[];
    enableTopLevelFallback: boolean;
    fallbackExclusionList: [string, string[]][];
    fallbackPool: [string, DependencyTarget][];
    ignorePatternData: string | null;
    packageRegistryData: PackageRegistryData;
    dependencyTreeRoots: PhysicalPackageLocator[];
  }

  // This is what `makeApi` actually consumes
  export interface RuntimeState {
    basePath: PortablePath;
    enableTopLevelFallback: boolean;
    fallbackExclusionList: Map<string, Set<string>>;
    fallbackPool: Map<string, DependencyTarget>;
    ignorePattern: RegExp | null;
    packageLocatorsByLocations: Map<
      PortablePath,
      { locator: PhysicalPackageLocator; discardFromLookup: boolean }
    >;
    packageRegistry: PackageRegistry;
    dependencyTreeRoots: PhysicalPackageLocator[];
  }

  /**
   * Original Definition of the interface
   * {@link https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-pnp/sources/loader/makeApi.ts#L14-L19 | `MakeApiOptions`}
   * is available in the package
   * {@link https://www.npmjs.com/package/@yarnpkg/pnp | `npm:@yarnpkg/pnp`}
   *
   * @remarks This interface is not exported by the package `@yarnpkg/pnp`.
   */
  interface MakeApiOptions extends Partial<RuntimeState> {
    allowDebug?: boolean;
    compatibilityMode?: boolean;
    /**
     * The definition of `fakeFs` property is marked as `unknown` but it is
     * actually an instance of the {@link https://github.com/yarnpkg/berry/blob/master/packages/yarnpkg-fslib/sources/FakeFS.ts#L135-L778 | `FakeFS`}`<`{@link PortablePath | `PortablePath`}`>`
     * abstract class found in the package {@link https://www.npmjs.com/package/@yarnpkg/fslib | `npm:@yarnpkg/fslib`}.
     */
    fakeFs: unknown;
    pnpapiResolution: NativePath;
  }

  // This is what the generation functions take as parameter
  export interface PnpSettings {
    // Whether the top-level dependencies should be made available to all the
    // dependency tree as a fallback (default is true)
    enableTopLevelFallback?: boolean;

    // Which packages should never be allowed to use fallbacks, no matter what
    fallbackExclusionList?: PhysicalPackageLocator[];

    // Which packages should be made available through the fallback mechanism
    fallbackPool?: Map<string, DependencyTarget>;

    // Which paths shouldn't use PnP, even if they would otherwise be detected
    // as being owned by a package (legacy settings used to help people migrate
    // to PnP + workspaces when they weren't using either)
    ignorePattern?: string | null;

    // The set of packages to store within the PnP map
    packageRegistry: PackageRegistry;

    // The shebang to add at the top of the file, can be any string you want (the
    // default value should be enough most of the time)
    shebang?: string | null;

    // The following locators will be made available in the API through the
    // getDependencyTreeRoots function. They are typically the workspace
    // locators.
    dependencyTreeRoots: PhysicalPackageLocator[];
  }

  export interface ResolveToUnqualifiedOptions {
    considerBuiltins?: boolean;
  }

  export interface ResolveUnqualifiedOptions {
    extensions?: string[];
    conditions?: Set<string>;
  }

  export type ResolveRequestOptions = ResolveToUnqualifiedOptions &
    ResolveUnqualifiedOptions;

  export const VERSIONS: { std: number; [key: string]: number };

  export const topLevel: { name: null; reference: null };

  export const getLocator: (
    name: string,
    referencish: string | [string, string]
  ) => PhysicalPackageLocator;

  export const getDependencyTreeRoots: () => PhysicalPackageLocator[];

  export const getPackageInformation: (
    locator: PackageLocator
  ) => PackageInformation<NativePath> | null;

  export const findPackageLocator: (
    location: NativePath
  ) => PhysicalPackageLocator | null;

  export const resolveToUnqualified: (
    request: string,
    issuer: NativePath | null,
    opts?: ResolveToUnqualifiedOptions
  ) => NativePath | null;

  export const resolveUnqualified: (
    unqualified: NativePath,
    opts?: ResolveUnqualifiedOptions
  ) => NativePath;

  export const resolveRequest: (
    request: string,
    issuer: NativePath | null,
    opts?: ResolveRequestOptions
  ) => NativePath | null;

  // Extension methods
  export const resolveVirtual:
    | ((p: NativePath) => NativePath | null)
    | undefined;

  export const getAllLocators: (() => PhysicalPackageLocator[]) | undefined;

  export const makeApi: ((options: MakeApiOptions) => PnpApi) | undefined;

  export const setup: ((api: PnpApi) => void) | undefined;

  export interface PnpApi {
    VERSIONS: typeof VERSIONS;
    topLevel: typeof topLevel;
    getLocator: typeof getLocator;
    getDependencyTreeRoots: typeof getDependencyTreeRoots;
    getPackageInformation: typeof getPackageInformation;
    findPackageLocator: typeof findPackageLocator;
    resolveToUnqualified: typeof resolveToUnqualified;
    resolveUnqualified: typeof resolveUnqualified;
    resolveRequest: typeof resolveRequest;
    resolveVirtual: typeof resolveVirtual;
    getAllLocators: typeof getAllLocators;
  }
}
