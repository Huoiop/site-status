简体中文 | [English](./README.md)

<div align="center">
<h1>site-status</h1>
<p>一个基于 UptimeRobot API 的在线状态面板</p>
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

- [IMSYY-站点监测](https://status.imsyy.top/)

## 🎉 特色

- 🌍 多平台部署支持
- ✨ 优雅且流畅的浏览体验
- 🔐 支持站点密码加密（JWT + Hash）
- 👀 全站状态预览
- ⏲️ 数据定时刷新
- 📱 移动端适配

## 事先准备

- 您需要先到 [UptimeRobot](https://uptimerobot.com/dashboard) 添加站点监控，并在 `My Settings` 页面或者 [API 管理](https://dashboard.uptimerobot.com/integrations) 页面获取类型为 `Read-Only API Key` 的 `API Key`，或者使用用于单独监视器的 `Monitor-specific API keys`（ 不要使用 `Main API key` ）

## 部署

### 构建目标

`DEPLOYMENT_PLATFORM` 决定构建产物：

| 值 | 目标平台 | 产物 |
| --- | --- | --- |
| `cloudflare`（默认） | Cloudflare Pages（NuxtHub） | `dist/` |
| `auto` | 通用 Node.js 服务器 | `.output/` |
| `eo` | EdgeOne Makers | `.edgeone/` |
| `esa` | 阿里云 ESA | `.output/server/index.mjs` + `.output/public/` |

### Cloudflare

本项目默认使用 [Cloudflare Pages](https://pages.cloudflare.com/) 来行部署

- `star` 并 `fork` 本项目 😘
- 可以使用全新的 [NuxtHub](https://hub.nuxt.com/) 来快捷的部署本项目，如果您有在 Vercel 上部署项目的经历，那么过程是大致相同的，当然，也可以使用 [Cloudflare Pages](https://pages.cloudflare.com/) 来部署
- 在点击下一步之前请先配置好环境变量，具体内容请参考 `.env.example` 文件中的内容，其中 `API_KEY` 为必填项
- 若进展顺利，你就可看到项目主页面了

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Huoiop/site-status)

- 点击上方按钮以前往部署
- 在环境变量中添加下方的内容（ 重要 ）

  | **变量名称**        | **值** |
  | ------------------- | ------ |
  | DEPLOYMENT_PLATFORM | auto   |
  | API_KEY             |        |

- 大功告成

### EdgeOne Makers

设置 `DEPLOYMENT_PLATFORM=eo`，构建时会运行 `@edgeone/nuxt-pages`，并输出 EdgeOne Build Output API 结构到 `.edgeone`。

| 配置项 | 值 |
| --- | --- |
| 根目录 | `./` |
| 安装命令 | `pnpm install` |
| 构建命令 | `pnpm run build` |
| 输出目录 | `.edgeone` |
| Node.js 版本 | 22.x |

在 EdgeOne 项目设置中配置 `DEPLOYMENT_PLATFORM=eo`、`API_KEY` 以及 `.env.example` 中的其他变量，然后部署即可。

> EdgeOne 的环境变量值不能包含空格。文本类变量（`SITE_TITLE`、`SITE_DESCRIPTION`、`SITE_KEYWORDS`、`SITE_ICP`、`SITE_AUTHOR`）请用 `+` 代替空格，例如 `SITE_TITLE="Huoiop+NET+服务检测"`。

### 阿里云 ESA

设置 `DEPLOYMENT_PLATFORM=esa`，构建时使用 Nitro 的 `cloudflare-module` 预设，产出边缘 Worker。

| 配置项 | 值 |
| --- | --- |
| 根目录 | `/` |
| 安装命令 | `pnpm install` |
| 构建命令 | `pnpm run build` |
| 静态资源目录 | `.output/public` |
| 函数文件路径 | `.output/server/index.mjs` |
| Node.js 版本 | 22.x |

在 ESA 项目设置中配置 `DEPLOYMENT_PLATFORM=esa`、`API_KEY` 以及 `.env.example` 中的其他变量。

也可以在仓库根目录使用 `esa.jsonc`：

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

> 存在 `esa.jsonc` 时，其配置优先于 ESA 控制台的构建配置。

### 其他托管平台

请参考官方文档：[部署 Nuxt 应用](https://nuxtjs.org.cn/deploy)

## Q & A

### 如何开启站点加密

在环境变量中添加 `SITE_PASSWORD` 和 `SITE_SECRE_KEY`，都必须填写，缺一不可，其中 `SITE_PASSWORD`是站点密码，`SITE_SECRE_KEY` 是加密密钥，可随意填写

### 如何自定义页脚链接

使用 `SITE_GITHUB`、`SITE_HOME`、`SITE_EMAIL`、`SITE_AUTHOR` 和 `SITE_AUTHOR_URL`，具体见 `.env.example`。

版权栏始终显示 `IMSYY`（跳转到 `https://github.com/imsyy/`）；设置 `SITE_AUTHOR` 后会显示为 `IMSYY & <名称>`。`SITE_AUTHOR_URL` 默认从 `SITE_GITHUB` 推导 GitHub 主页，例如 `https://github.com/Huoiop/site-status` 会跳转到 `https://github.com/Huoiop/`。

## 鸣谢

- [uptime-status](https://github.com/yb/uptime-status) 受此项目启发
