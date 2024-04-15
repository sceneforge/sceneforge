declare module "virtual:i18next-loader" {
  const resources: {
    [language: string]: {
      [namespace: string]:
        | string
        | {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            [key: string]: any;
          };
    };
  };
  export default resources;
}
