import type { ManifestOptions } from "vite-plugin-pwa";

export const webManifest = ({
  name,
  description,
  isProd,
}: {
  name: string;
  description?: string;
  isProd: boolean;
}): Partial<ManifestOptions> | false => {
  {
    return {
      dir: "ltr",
      lang: "en",
      name,
      short_name: name,
      description: description,
      start_url: "/",
      display_override: ["window-controls-overlay", "fullscreen", "minimal-ui"],
      file_handlers: [
        {
          action: "/index.html#!action=new-tab&tab=new-scene",
          accept: {
            "application/json": [".scfg", ".sceneforge"],
          },
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
      display: "standalone",
      orientation: "natural",
      background_color: "#86159d",
      theme_color: "#86159d",
      edge_side_panel: {
        preferred_width: 480,
      },
      protocol_handlers: [
        {
          protocol: "web+sceneforge",
          url: "/index.html#!%s",
        },
      ],
      handle_links: "preferred",
      categories: ["productivity", "utilities", "education", "entertainment"],
      launch_handler: {
        client_mode: ["focus-existing", "navigate-existing", "auto"],
      },
      shortcuts: [
        {
          name: "New Scene",
          short_name: "New",
          url: "/index.html#!action=new-tab&tab=new-scene",
          description: "Create a new scene",
          icons: [
            {
              src: "icons/shortcut-icon-deployed-code.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "any",
            },
          ],
        },
        {
          name: "Settings",
          short_name: "Settings",
          url: "/index.html#!action=open-tab&tab=settings",
          description: "Open the settings",
          icons: [
            {
              src: "icons/shortcut-icon-settings.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "any",
            },
          ],
        },
        {
          name: "About Scene Forge",
          short_name: "About",
          url: "/index.html#!action=open-tab&tab=about",
          description: "About Scene Forge",
          icons: [
            {
              src: "icons/shortcut-icon-info.png",
              sizes: "96x96",
              type: "image/png",
              purpose: "any",
            },
          ],
        },
      ],
      icons: [
        {
          src: "icons/favicon.ico",
          sizes: "48x48",
          type: "image/x-icon",
          purpose: "any",
        },
        {
          src: "icons/512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "icons/icon.svg",
          sizes: "any",
          type: "image/svg+xml",
          purpose: "any",
        },
        {
          src: "icons/monochrome-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "monochrome",
        },
        {
          src: "icons/monochrome-1024.png",
          sizes: "1024x1024",
          type: "image/png",
          purpose: "maskable monochrome",
        },
        {
          src: "icons/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "icons/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
          purpose: "any",
        },
      ],
      screenshots: [
        {
          src: "screenshots/macos-main-1280.png",
          sizes: "1280x800",
          type: "image/png",
          form_factor: "wide",
          label: "Entry Screen of Scene Forge",
          platform: "macos",
        },
        {
          src: "screenshots/macos-modelview-1280.png",
          sizes: "1280x800",
          type: "image/png",
          form_factor: "wide",
          label: "Model Viewer and Editor Screen",
          platform: "macos",
        },
        {
          src: "screenshots/ios-main-iphone-15-pro-max.jpeg",
          sizes: "1290x2796",
          type: "image/jpeg",
          form_factor: "narrow",
          label: "Entry Screen of Scene Forge",
          platform: "ios",
        },
      ],
      prefer_related_applications: true,
      ...(isProd
        ? {
            id: "https://sceneforge.org/",
            scope: "https://sceneforge.org/",
            related_applications: [
              {
                platform: "webapp",
                url: "https://sceneforge.org/manifest.webmanifest",
              },
            ],
            scope_extensions: [
              { origin: "*.sceneforge.org" },
              { origin: "sceneforge.org" },
            ],
          }
        : {
            scope: "/",
          }),
    };
  }
};
