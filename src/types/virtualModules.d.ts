declare module "virtual:i18next-loader" {
  const resources: {
    [language: string]: {
      [namespace: string]:
        | {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          [key: string]: any;
        }
        | string;
    };
  };
  export default resources;
}
