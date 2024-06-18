import type { ManifestOptions } from "vite-plugin-pwa";

export const webManifest = ({
  description,
  devPort,
  isDev,
  isProd,
  name,
}: {
  description?: string;
  devPort?: number;
  isDev?: boolean;
  isProd?: boolean;
  name: string;
}): Partial<ManifestOptions> | false => {
  {
    return {
      background_color: "#86159d",
      categories: ["productivity", "utilities", "education", "entertainment"],
      description: description,
      dir: "ltr",
      display: "standalone",
      display_override: ["window-controls-overlay", "fullscreen", "minimal-ui"],
      edge_side_panel: {
        preferred_width: 480,
      },
      file_handlers: [
        {
          accept: {
            "application/json": [".scfg", ".sceneforge"],
          },
          action: "/index.html#!action=new-tab&tab=new-scene",
          // icons: [
          //   {
          //     src: "icons/file-512x740.png",
          //     sizes: "512x740",
          //     type: "image/png",
          //   },
          //   {
          //     src: "icons/file-256x370.png",
          //     sizes: "256x370",
          //     type: "image/png",
          //   },
          // ],
          // launch_type: "single-client",
        },
      ],
      handle_links: "preferred",
      icons: [
        {
          purpose: "any",
          sizes: "48x48",
          src: "icons/favicon.ico",
          type: "image/x-icon",
        },
        {
          purpose: "any",
          sizes: "512x512",
          src: "icons/512.png",
          type: "image/png",
        },
        {
          purpose: "maskable",
          sizes: "1024x1024",
          src: "icons/1024.png",
          type: "image/png",
        },
        {
          purpose: "any",
          sizes: "any",
          src: "icons/icon.svg",
          type: "image/svg+xml",
        },
        {
          purpose: "monochrome",
          sizes: "512x512",
          src: "icons/monochrome-512.png",
          type: "image/png",
        },
        {
          purpose: "maskable monochrome",
          sizes: "1024x1024",
          src: "icons/monochrome-1024.png",
          type: "image/png",
        },
        {
          purpose: "any",
          sizes: "16x16",
          src: "icons/favicon-16x16.png",
          type: "image/png",
        },
        {
          purpose: "any",
          sizes: "32x32",
          src: "icons/favicon-32x32.png",
          type: "image/png",
        },
      ],
      lang: "en",
      launch_handler: {
        client_mode: ["focus-existing", "navigate-existing", "auto"],
      },
      name,
      orientation: "natural",
      prefer_related_applications: true,
      protocol_handlers: [
        {
          protocol: "web+sceneforge",
          url: "/index.html#!%s",
        },
      ],
      screenshots: [
        {
          form_factor: "wide",
          label: "Entry Screen of Scene Forge",
          platform: "macos",
          sizes: "1280x800",
          src: "screenshots/macos-main-1280.png",
          type: "image/png",
        },
        {
          form_factor: "wide",
          label: "Model Viewer and Editor Screen",
          platform: "macos",
          sizes: "1280x800",
          src: "screenshots/macos-modelview-1280.png",
          type: "image/png",
        },
        {
          form_factor: "narrow",
          label: "Entry Screen of Scene Forge",
          platform: "ios",
          sizes: "1290x2796",
          src: "screenshots/ios-main-iphone-15-pro-max.jpeg",
          type: "image/jpeg",
        },
      ],
      short_name: name,
      shortcuts: [
        {
          description: "Create a new scene",
          icons: [
            {
              purpose: "any",
              sizes: "96x96",
              src: "icons/shortcut-icon-deployed-code.png",
              type: "image/png",
            },
          ],
          name: "New Scene",
          short_name: "New",
          url: "/index.html#!action=new-tab&tab=new-scene",
        },
        {
          description: "Open the settings",
          icons: [
            {
              purpose: "any",
              sizes: "96x96",
              src: "icons/shortcut-icon-settings.png",
              type: "image/png",
            },
          ],
          name: "Settings",
          short_name: "Settings",
          url: "/index.html#!action=open-tab&tab=settings",
        },
        {
          description: "About Scene Forge",
          icons: [
            {
              purpose: "any",
              sizes: "96x96",
              src: "icons/shortcut-icon-info.png",
              type: "image/png",
            },
          ],
          name: "About Scene Forge",
          short_name: "About",
          url: "/index.html#!action=open-tab&tab=about",
        },
      ],
      start_url: "/index.html",
      theme_color: "#86159d",
      ...(isProd
        ? {
          id: "https://app.sceneforge.org/",
          related_applications: [
            {
              id: "https://app.sceneforge.org/",
              platform: "webapp",
              url: "https://sceneforge.org/manifest.webmanifest",
            },
          ],
          scope: "https://app.sceneforge.org/",
        }
        : (isDev
          ? {
            id: `http://localhost:${devPort}/`,
            scope: `http://localhost:${devPort}/`,
          }
          : {
            scope: "/",
          })),
    };
  }
};
