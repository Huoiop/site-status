// EdgeOne Makers build wrapper.
// EdgeOne only injects @edgeone/nuxt-pages automatically for Nuxt >= 3.16.
// This project stays on Nuxt 3.15, so run the adapter hooks ourselves.
import { execSync } from "node:child_process";
import { onPreBuild, onBuild, onPostBuild } from "@edgeone/nuxt-pages";

const options = {
  cwd: process.cwd(),
  env: process.env,
  meta: {},
  functions: {},
  constants: { PUBLISH_DIR: ".edgeone" },
};

await onPreBuild(options);

try {
  execSync("pnpm exec nuxt build", { stdio: "inherit", env: process.env });
  await onBuild(options);
} finally {
  // Always restore nuxt.config.ts, even if the build fails.
  await onPostBuild(options);
}
