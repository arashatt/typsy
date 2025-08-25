// utils/sitemap.ts
import { type FileRouteTypes } from "../routeTree.gen";
import type { Sitemap } from "tanstack-router-sitemap";

// This will become a string literal union of all your routes
export type TRoutes = FileRouteTypes["fullPaths"];

// Define your sitemap
export const sitemap: Sitemap<TRoutes> = {
  siteUrl: "https://typeset.live",
  defaultPriority: 0.5,
  routes: {
    "/": {
      priority: 1,
      changeFrequency: "daily",
    },
    // Dynamic route example
    "/editor": {
      priority: 1,
      changeFrequency: "daily",
    },
  },
};
