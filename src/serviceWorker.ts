/// <reference lib="WebWorker" />

import { precacheAndRoute } from "workbox-precaching";
import { activate } from "./sw";

declare let self: ServiceWorkerGlobalScope;

precacheAndRoute(self.__WB_MANIFEST);

activate();

export type {};
