// Platform-aware build entry.
//
// DEPLOYMENT_PLATFORM:
//   cloudflare (default) -> original NuxtHub / Cloudflare Pages build
//   auto                 -> original generic Node.js build
//   eo                   -> EdgeOne Makers build (.edgeone)
//   esa                  -> Alibaba Cloud ESA build (.output Worker + public)
//
// Keep `cloudflare` and `auto` on the original `nuxt build` path.
import { execSync } from "node:child_process";

const platform = (process.env.DEPLOYMENT_PLATFORM || "cloudflare").toLowerCase();

const run = (command, env = process.env) =>
  execSync(command, { stdio: "inherit", env });

if (platform === "eo" || platform === "edgeone") {
  // tools/build-edgeone.mjs runs the @edgeone/nuxt-pages hooks around nuxt build.
  await import("./build-edgeone.mjs");
} else if (platform === "esa") {
  // ESA expects an edge Worker export; Nitro's cloudflare-module preset emits one.
  run("pnpm exec nuxt build", {
    ...process.env,
    NITRO_PRESET: "cloudflare-module",
  });
} else {
  // cloudflare / auto / any other value: preserve the original behavior.
  run("pnpm exec nuxt build");
}
