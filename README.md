# Zeron UI

Zeron UI 是一个 TypeScript-first 的组件库工作区，围绕可复制、可落地、可维护的产品组件体系构建。

项目以 shadcn/ui 的 registry 与 copy-paste 组件理念为基础，结合 Base UI 提供的无样式可访问性 primitives，在此之上沉淀 Zeron UI 自己的样式、变量、组件 API、文档和示例。

## 技术基础

- **React 19** 与 **TypeScript**：组件开发基础。
- **Tailwind CSS v4**：样式、设计变量和工具类组合。
- **Base UI**：提供 Dialog、Menu、Tabs、Popover、Select、Switch、Tooltip、表单控件等复杂交互的可访问性 primitives。
- **shadcn/ui registry 规范**：用于组件元数据、复制安装命令、文档示例和可迁移组件工作流。
- **class-variance-authority**、**clsx**、**tailwind-merge**：用于组件 variants 和 className 合并。
- **lucide-react**：图标库。
- **Next.js**、**Fumadocs**、**MDX**：文档站点与内容系统。
- **Turborepo** 与 **pnpm workspace**：monorepo 任务编排和包管理。
- **Biome**：代码检查与格式化。

## 项目目录结构

```txt
zeron-ui
├── apps
│   └── docs
│       ├── app                 # Next.js App Router、全局布局和页面入口
│       ├── components          # 文档站专用组件，如导航、预览、安装器、分类页
│       ├── content             # MDX 文档内容
│       │   ├── blocks          # 应用级区块文档
│       │   ├── components      # 基础组件文档
│       │   ├── docs            # 项目介绍、安装、架构等说明文档
│       │   └── patterns        # 产品模式和组合组件文档
│       ├── examples            # 文档预览用的可运行示例
│       └── lib                 # Fumadocs source 和共享布局配置
├── packages
│   ├── ui
│   │   └── src
│   │       ├── components      # Zeron UI 可复用组件源码
│   │       ├── hooks           # 组件共享 hooks
│   │       ├── lib             # 工具函数和共享逻辑
│   │       ├── index.ts        # UI 包入口
│   │       └── styles.css      # 设计变量、主题 token、共享 Tailwind 样式
│   ├── registry
│   │   └── src
│   │       ├── components.json # 组件 registry 元数据
│   │       └── blocks.json     # 区块 registry 元数据
│   └── typescript-config       # 共享 TypeScript 配置
├── docs                        # 项目内部架构和设计说明
├── pnpm-workspace.yaml         # workspace 包声明
├── turbo.json                  # Turborepo 任务配置
└── biome.json                  # Biome 检查与格式化配置
```

## 核心包说明

### `packages/ui`

组件库源码的唯一事实来源。所有可复用产品组件都放在这里，并通过 package subpath 暴露：

```ts
import { Button } from "@zeron-ui/ui/button";
import { Dialog } from "@zeron-ui/ui/dialog";
import { DataTable } from "@zeron-ui/ui/data-table";
```

`packages/ui/src/styles.css` 存放组件库的主题变量、基础 token 和共享 Tailwind 样式。文档应用会导入 `@zeron-ui/ui/styles.css`，确保组件预览和真实消费方式保持一致。

### `packages/registry`

保存 shadcn-compatible 的 registry 元数据：

- `components.json`：基础组件和 pattern 的注册信息。
- `blocks.json`：应用级 block 的注册信息。

这些文件用于文档安装器、组件示例和 copy-paste 分发流程。

### `apps/docs`

文档站点，基于 Next.js 和 Fumadocs 构建。它负责：

- 渲染 MDX 文档。
- 展示组件预览和代码示例。
- 读取 registry 元数据。
- 提供组件、patterns、blocks、icons 等文档入口。

## 文档系统

Zeron UI 的文档由以下库组成：

- **Next.js**：文档应用运行时和路由。
- **Fumadocs Core / UI / MDX**：文档内容加载、导航结构、页面布局和 MDX 渲染。
- **MDX frontmatter**：每个页面通过 frontmatter 声明 `title`、`description`、`icon`、`installer` 等元信息。
- **本地 examples**：`apps/docs/examples` 中的示例会被文档页面直接引用，用于保持文档、预览和真实代码同步。

常见内容位置：

- 基础组件文档：`apps/docs/content/components`
- 组合模式文档：`apps/docs/content/patterns`
- 应用区块文档：`apps/docs/content/blocks`
- 项目说明文档：`apps/docs/content/docs`

## 开发命令

安装依赖：

```bash
pnpm install
```

启动文档站：

```bash
pnpm dev
```

运行检查：

```bash
pnpm lint
pnpm check
pnpm build
```

## 开发约定

- 可复用产品组件放在 `packages/ui/src/components`。
- 文档站专用组件和预览逻辑放在 `apps/docs`。
- 组件主题变量和共享样式放在 `packages/ui/src/styles.css`。
- 新增可安装组件时，同步更新 `packages/registry/src/components.json`。
- 新增应用级区块时，同步更新 `packages/registry/src/blocks.json`。
- 复杂交互优先基于 Base UI primitive 实现，再叠加 Zeron UI 的样式、变体和组合 API。
