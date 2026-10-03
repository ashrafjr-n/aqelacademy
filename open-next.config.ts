import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// ponytail: pages are prerendered at build time and served from static assets (no revalidation).
// Switch to the R2 incremental cache if a page ever needs ISR/revalidation.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
