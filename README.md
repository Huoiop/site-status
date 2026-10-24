English | [简体中文](./README.zh-CN.md)

<div align="center">
<h1>site-status</h1>
<p>An online status panel based on UptimeRobot API</p>
<br />
<img src="https://img.shields.io/github/last-commit/imsyy/site-status" alt="last commit"/>
<img src="https://img.shields.io/github/languages/code-size/imsyy/site-status" alt="code size"/>
<img src="https://img.shields.io/github/stars/imsyy/site-status?style=full" alt="GitHub stars"/>
<img src="https://img.shields.io/github/forks/imsyy/site-status?style=full&color=orange" alt="GitHub followers"/>
<br />
<br />
<img src="https://s1.ax1x.com/2023/07/20/pCHnLLt.png" alt="demo"/>
</div>

## 👀 Demo

> Demo password: `123456`

- [IMSYY-Site Monitoring](https://status.imsyy.top/)

## 🎉 Features

- 🌍 Multi-platform deployment support
- ✨ Elegant and smooth browsing experience
- 🔐 Supports site password encryption (JWT + Hash)
- 👀 Overall site status preview
- ⏲️ Data auto-refresh
- 📱 Mobile-friendly design

## Prerequisites

- You need to first add site monitors on [UptimeRobot](https://uptimerobot.com/dashboard) and get the `Read-Only API Key` from the `My Settings` or [API Management](https://dashboard.uptimerobot.com/integrations) page (Do not use the `Main API key`).
- You can also use `Monitor-specific API keys` for individual monitors.

## Deployment

### Build targets

`DEPLOYMENT_PLATFORM` controls the build output:

| Value | Target | Output |
| --- | --- | --- |
| `cloudflare` (default) | Cloudflare Pages via NuxtHub | `dist/` |
| `auto` | Generic Node.js server | `.output/` |
| `eo` | EdgeOne Makers | `.edgeone/` |
| `esa` | Alibaba Cloud ESA | `.output/server/index.mjs` + `.output/public/` |

### Cloudflare

This project is deployed by default using [Cloudflare Pages](https://pages.cloudflare.com/).

- `star` and `fork` this project 😘
- You can use the new [NuxtHub](https://hub.nuxt.com/) to quickly deploy this project. If you have experience deploying on Vercel, the process is quite similar. Alternatively, you can use [Cloudflare Pages](https://pages.cloudflare.com/) for deployment.
- Before moving on, make sure to configure the environment variables as detailed in the `.env.example` file. The `API_KEY` is a required field.
- If everything goes smoothly, you should be able to see the project’s main page.

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Huoiop/site-status)

- Click the button above to deploy.
- Add the following environment variables (important):

  | **Variable Name**   | **Value** |
  | ------------------- | --------- |
  | DEPLOYMENT_PLATFORM | auto      |
  | API_KEY             |           |

- All set!

### EdgeOne Makers

Set `DEPLOYMENT_PLATFORM=eo`. The build runs `@edgeone/nuxt-pages` and emits the EdgeOne Build Output API structure into `.edgeone`.

| Setting | Value |
| --- | --- |
| Root directory | `./` |
| Install command | `pnpm install` |
| Build command | `pnpm run build` |
| Output directory | `.edgeone` |
| Node.js version | 22.x |

Add `DEPLOYMENT_PLATFORM=eo`, `API_KEY` and the other variables from `.env.example` in the EdgeOne project settings, then deploy.

> EdgeOne environment variable values cannot contain spaces. In text fields (`SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_KEYWORDS`, `SITE_ICP`, `SITE_AUTHOR`), use `+` as a space placeholder, e.g. `SITE_TITLE="Huoiop+NET+Status"`.

### Alibaba Cloud ESA

Set `DEPLOYMENT_PLATFORM=esa`. The build uses Nitro's `cloudflare-module` preset and produces an edge Worker.

| Setting | Value |
| --- | --- |
| Root directory | `/` |
| Install command | `pnpm install` |
| Build command | `pnpm run build` |
| Static assets directory | `.output/public` |
| Function file path | `.output/server/index.mjs` |
| Node.js version | 22.x |

Add `DEPLOYMENT_PLATFORM=esa`, `API_KEY` and the other variables from `.env.example` in the ESA project settings.

You can also configure the same values with an `esa.jsonc` in the repository root:

```jsonc
{
  "name": "site-status",
  "entry": "./.output/server/index.mjs",
  "installCommand": "pnpm install",
  "buildCommand": "pnpm run build",
  "assets": {
    "directory": ".output/public"
  }
}
```

> When `esa.jsonc` exists, its settings take precedence over the ESA console build configuration.

### Other Hosting Platforms

For deployment guides, refer to the official documentation: [Deploying Nuxt Apps](https://nuxtjs.org.cn/deploy)

## Q & A

### How to Enable Site Encryption

Add the following environment variables: `SITE_PASSWORD` and `SITE_SECRE_KEY`. Both are required. The `SITE_PASSWORD` is the site password, and the `SITE_SECRE_KEY` is the encryption key, which you can choose freely.

### How to Customize Footer Links

Use `SITE_GITHUB`, `SITE_HOME`, `SITE_EMAIL`, `SITE_AUTHOR` and `SITE_AUTHOR_URL`. See `.env.example` for details.

The copyright line always shows `IMSYY` (linking to `https://github.com/imsyy/`). When `SITE_AUTHOR` is set, it is displayed as `IMSYY & <author>`. `SITE_AUTHOR_URL` defaults to the GitHub profile derived from `SITE_GITHUB`, so `https://github.com/Huoiop/site-status` links to `https://github.com/Huoiop/`.

## Thanks

- [uptime-status](https://github.com/yb/uptime-status) inspired this project
