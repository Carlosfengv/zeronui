# zeron-ui 样式变量文档

## 1. 样式文件来源

zeron-ui 当前没有 `style.css`，相关样式入口主要有两个：

| 文件 | 职责 |
| --- | --- |
| `zeron-ui/packages/ui/src/styles.css` | 组件库主题变量、Tailwind v4 `@theme inline` 映射、自定义状态 variant、通用 utility |
| `zeron-ui/apps/docs/app/global.css` | 文档站全局入口，导入组件库样式、Fumadocs 样式、页面布局变量和少量全局样式 |

核心结论：

- 组件库的样式变量源是 `packages/ui/src/styles.css`。
- docs app 通过 `global.css` 引入 `@zeron-ui/ui/styles.css`，再把 Fumadocs 的变量桥接到 zeron-ui 的语义变量上。
- 变量体系使用 Tailwind CSS v4 的 `@theme inline`，颜色值使用 `oklch()`。

## 2. 样式加载顺序

`apps/docs/app/global.css` 中的导入顺序：

```css
@import "tailwindcss";
@import "@zeron-ui/ui/styles.css";
@import "fumadocs-ui/css/neutral.css";
@import "fumadocs-ui/css/preset.css";
@import "tw-animate-css";
```

这意味着：

- Tailwind 先加载。
- zeron-ui 组件库变量随后注入。
- Fumadocs 的基础样式和 preset 再加载。
- `tw-animate-css` 提供动画工具类。

`global.css` 还通过 `@source` 把 docs app 和组件库源码纳入 Tailwind 扫描范围：

```css
@source "../../../packages/ui/src/**/*.{js,jsx,ts,tsx}";
@source "./**/*.{js,jsx,ts,tsx,mdx}";
```

## 3. Tailwind v4 主题映射

`packages/ui/src/styles.css` 使用 `@theme inline` 把 CSS variables 暴露成 Tailwind token。

### 3.1 字体 token

| Tailwind token | CSS variable | 默认值 |
| --- | --- | --- |
| `--font-sans` | `--font-sans` | `Geist, ui-sans-serif, system-ui, sans-serif` |
| `--font-mono` | `--font-mono` | `"Geist Mono", ui-monospace, SFMono-Regular, monospace` |

常见使用：

```tsx
<div className="font-sans" />
<code className="font-mono" />
```

### 3.2 颜色 token 映射

| Tailwind token | CSS variable | 语义 |
| --- | --- | --- |
| `--color-background` | `--background` | 页面默认背景 |
| `--color-foreground` | `--foreground` | 页面默认文字和图标 |
| `--color-card` | `--card` | 卡片/面板背景 |
| `--color-card-foreground` | `--card-foreground` | 卡片/面板前景 |
| `--color-popover` | `--popover` | 浮层背景 |
| `--color-popover-foreground` | `--popover-foreground` | 浮层前景 |
| `--color-primary` | `--primary` | 主操作/主强调 |
| `--color-primary-foreground` | `--primary-foreground` | 主色背景上的前景 |
| `--color-secondary` | `--secondary` | 次级背景/次级按钮 |
| `--color-secondary-foreground` | `--secondary-foreground` | 次级背景上的前景 |
| `--color-muted` | `--muted` | 弱化背景 |
| `--color-muted-foreground` | `--muted-foreground` | 弱化前景/辅助文本 |
| `--color-accent` | `--accent` | hover、active、选中行等交互背景 |
| `--color-accent-foreground` | `--accent-foreground` | 交互背景上的前景 |
| `--color-destructive` | `--destructive` | 删除、错误、危险操作 |
| `--color-border` | `--border` | 默认边框 |
| `--color-input` | `--input` | 表单控件边框/背景 |
| `--color-ring` | `--ring` | focus ring |
| `--color-chart-1` 到 `--color-chart-5` | `--chart-1` 到 `--chart-5` | 图表色板 |

组件中应优先使用语义类名：

```tsx
<div className="bg-background text-foreground" />
<button className="bg-primary text-primary-foreground" />
<div className="border-border ring-ring" />
```

### 3.3 圆角 token

| Tailwind token | 计算方式 | 用途 |
| --- | --- | --- |
| `--radius-sm` | `calc(var(--radius) - 4px)` | 小控件、小标签 |
| `--radius-md` | `calc(var(--radius) - 2px)` | 输入框、按钮 |
| `--radius-lg` | `var(--radius)` | 卡片、弹窗、面板 |
| `--radius-xl` | `calc(var(--radius) + 4px)` | 大容器 |

基础值：

```css
:root {
  --radius: 0.625rem;
}
```

## 4. 明暗主题变量

zeron-ui 使用 `:root` 作为默认浅色主题，用 `.dark` 覆盖同名变量实现暗色主题。

### 4.1 基础承载面

| 变量 | 浅色值 | 暗色值 | 含义 |
| --- | --- | --- | --- |
| `--background` | `oklch(1 0 0)` | `oklch(0.141 0.005 285.823)` | 页面背景 |
| `--foreground` | `oklch(0.145 0 0)` | `oklch(0.985 0 0)` | 页面主前景 |
| `--card` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` | 卡片背景 |
| `--card-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | 卡片前景 |
| `--popover` | `oklch(1 0 0)` | `oklch(0.21 0.006 285.885)` | 浮层背景 |
| `--popover-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | 浮层前景 |

维护建议：

- `background` 应保持适合大面积铺底。
- `card` 和 `popover` 用于从页面背景中抬起内容，不要和业务强调色混用。
- `foreground`、`card-foreground`、`popover-foreground` 必须分别和对应背景保持可读对比。

### 4.2 操作与状态色

| 变量 | 浅色值 | 暗色值 | 含义 |
| --- | --- | --- | --- |
| `--primary` | `oklch(10.511% 0.02984 250.114)` | `oklch(0.92 0.004 286.32)` | 主操作背景 |
| `--primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.21 0.006 285.885)` | 主操作前景 |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | 次级操作/弱背景 |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | 次级操作前景 |
| `--accent` | `oklch(91.405% 0.01811 261.4 / 0.25)` | `oklch(0.274 0.006 286.033)` | hover、active、菜单高亮 |
| `--accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | accent 背景上的前景 |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | 危险/错误/删除 |

维护建议：

- `primary` 在浅色模式接近深蓝黑，暗色模式接近浅灰，用于形成高对比主操作。
- `accent` 更偏交互状态，不应承担品牌主按钮职责。
- 当前没有定义 `--destructive-foreground`，危险按钮如果需要实底样式，需要组件内显式处理文字色，或补充该变量。

### 4.3 弱化、边框与输入

| 变量 | 浅色值 | 暗色值 | 含义 |
| --- | --- | --- | --- |
| `--muted` | `oklch(91.405% 0.01811 261.4 / 0.8)` | `oklch(0.274 0.006 286.033)` | 弱化背景 |
| `--muted-foreground` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` | 辅助文字 |
| `--border` | `oklch(34.567% 0.02551 269.635 / 0.12)` | `oklch(1 0 0 / 10%)` | 默认边框 |
| `--input` | `oklch(0.92 0.004 286.32)` | `oklch(1 0 0 / 15%)` | 表单控件边框/底色 |
| `--ring` | `oklch(0.705 0.015 286.067)` | `oklch(0.552 0.016 285.938)` | 聚焦描边 |

维护建议：

- `border` 在浅色模式带透明度，适合轻边界。
- `input` 暗色模式比 `border` 更亮，能让表单控件更容易被识别。
- `muted-foreground` 是说明文字、placeholder、meta 信息的默认选择。

### 4.4 图表色板

| 变量 | 浅色值 | 暗色值 |
| --- | --- | --- |
| `--chart-1` | `oklch(0.552 0.016 285.938)` | `oklch(0.705 0.015 286.067)` |
| `--chart-2` | `oklch(0.442 0.017 285.786)` | `oklch(0.552 0.016 285.938)` |
| `--chart-3` | `oklch(0.37 0.013 285.805)` | `oklch(0.442 0.017 285.786)` |
| `--chart-4` | `oklch(0.274 0.006 286.033)` | `oklch(0.37 0.013 285.805)` |
| `--chart-5` | `oklch(0.21 0.006 285.885)` | `oklch(0.92 0.004 286.32)` |

当前图表色板是低饱和灰阶/蓝灰阶，更适合中性后台界面。如果需要多系列数据强区分，建议扩展一组业务图表 token，而不是直接改动基础 `chart-*`。

### 4.5 Sidebar 变量

| 变量 | 浅色值 | 暗色值 | 含义 |
| --- | --- | --- | --- |
| `--sidebar` | `oklch(0.985 0 0)` | `oklch(0.21 0.006 285.885)` | 侧边栏背景 |
| `--sidebar-foreground` | `oklch(0.141 0.005 285.823)` | `oklch(0.985 0 0)` | 侧边栏文字/图标 |
| `--sidebar-primary` | `oklch(0.21 0.006 285.885)` | `oklch(0.92 0.004 286.32)` | 侧边栏主强调 |
| `--sidebar-primary-foreground` | `oklch(0.985 0 0)` | `oklch(0.21 0.006 285.885)` | 侧边栏主强调前景 |
| `--sidebar-accent` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | 侧边栏 hover/active 背景 |
| `--sidebar-accent-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | 侧边栏 hover/active 前景 |
| `--sidebar-border` | `oklch(0.92 0.004 286.32)` | `oklch(1 0 0 / 10%)` | 侧边栏边框 |
| `--sidebar-ring` | `oklch(0.705 0.015 286.067)` | `oklch(0.552 0.016 285.938)` | 侧边栏内聚焦描边 |

## 5. 自定义状态 variant

`styles.css` 定义了多个 Tailwind 自定义 variant，用来统一组件状态选择器。

| Variant | 匹配条件 | 用途 |
| --- | --- | --- |
| `dark` | `&:is(.dark *)` | 暗色模式 |
| `data-open` | `[data-state="open"]` 或有效的 `[data-open]` | 打开态，如 Popover、Dialog、Dropdown |
| `data-closed` | `[data-state="closed"]` 或有效的 `[data-closed]` | 关闭态 |
| `data-checked` | `[data-state="checked"]` 或有效的 `[data-checked]` | 选中态，如 Checkbox、Switch、Radio |
| `data-disabled` | `[data-disabled="true"]` 或有效的 `[data-disabled]` | 禁用态 |
| `data-active` | `[data-state="active"]` 或有效的 `[data-active]` | 激活态，如 Tabs、导航项 |

示例：

```tsx
<button className="data-active:bg-accent data-disabled:opacity-50" />
```

维护建议：

- Radix 类组件优先使用 `data-state`。
- 自定义组件可以使用布尔属性形式，如 `data-active`、`data-disabled`。
- 避免每个组件重复写复杂 attribute selector，统一走这些 variant。

## 6. 动画 token

`@theme inline` 中定义了两个 accordion keyframes：

| Keyframes | 展开/收起 | 高度来源 |
| --- | --- | --- |
| `accordion-down` | 展开 | `--radix-accordion-content-height`，fallback 为 `--accordion-panel-height` |
| `accordion-up` | 收起 | `--radix-accordion-content-height`，fallback 为 `--accordion-panel-height` |

这组动画兼容 Radix Accordion，也允许非 Radix 组件通过 `--accordion-panel-height` 接入。

## 7. Utility

### 7.1 `no-scrollbar`

`styles.css` 定义了 `@utility no-scrollbar`：

```css
@utility no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
```

用途：

- 隐藏滚动条。
- 保留元素滚动能力。
- 适合横向 tabs、chip list、移动端横向导航。

## 8. 文档站专用变量

`apps/docs/app/global.css` 在 `:root` 中定义了一组文档站布局和 Fumadocs 桥接变量。

### 8.1 布局变量

| 变量 | 值 | 含义 |
| --- | --- | --- |
| `--nav-height` | `61px` | 自定义导航高度 |
| `--fd-nav-height` | `calc(var(--spacing) * 14)` | Fumadocs 导航高度 |
| `--fd-layout-width` | `100%` | 文档布局宽度 |
| `--fd-sidebar-width` | `240px` | 文档侧边栏宽度 |
| `--fd-toc-width` | `240px` | 文档目录宽度 |
| `--fd-banner-height` | `var(--nav-height)` | banner 高度 |

页面级覆盖：

- `.landing-page` 把 `--fd-sidebar-width` 设为 `0px` 并隐藏 sidebar。
- `.patterns-page` 和 `.blocks-page` 同样隐藏 sidebar，并把布局改为单列主内容。
- `#nd-page` 使用 `margin-top: calc(var(--nav-height) - 19px)` 修正文档页顶部间距。

### 8.2 Fumadocs 颜色桥接

`global.css` 把 Fumadocs 的 `--color-fd-*` 变量映射到 zeron-ui 的语义变量：

| Fumadocs 变量 | zeron-ui 变量 |
| --- | --- |
| `--color-fd-background` | `--background` |
| `--color-fd-primary` | `--primary` |
| `--color-fd-border` | `--border` |
| `--color-fd-accent` | `--accent` |
| `--color-fd-accent-foreground` | `--accent-foreground` |
| `--color-fd-muted` | `--muted` |
| `--color-fd-muted-foreground` | `--muted-foreground` |
| `--color-fd-foreground` | `--foreground` |
| `--color-fd-secondary` | `--secondary` |
| `--color-fd-secondary-foreground` | `--secondary-foreground` |
| `--color-fd-card` | `--card` |
| `--color-fd-card-foreground` | `--card-foreground` |
| `--color-fd-popover` | `--popover` |
| `--color-fd-popover-foreground` | `--popover-foreground` |
| `--color-fd-primary-foreground` | `--primary-foreground` |
| `--color-fd-ring` | `--ring` |

这样 docs app 的外壳、侧栏、目录、代码区等 Fumadocs UI 可以跟 zeron-ui 主题保持一致。

## 9. 全局基础样式

`global.css` 的 `@layer base` 做了三件事：

```css
* {
  @apply border-border outline-ring/50;
}

body {
  @apply bg-background text-foreground;
}

html {
  scrollbar-gutter: stable;
}
```

含义：

- 所有元素默认继承 `border-border`，避免边框色分散定义。
- 所有元素的 outline 使用 `ring` 的 50% 透明度。
- `body` 使用主题背景和前景。
- `scrollbar-gutter: stable` 减少滚动条出现/消失造成的布局抖动。
- `html, body { overflow-x: clip; }` 防止横向溢出滚动。

## 10. 维护建议

- 新增组件颜色时，优先复用现有语义变量，不要在组件内写死 `oklch()`。
- 只有当现有变量无法表达业务语义时，才新增 token。
- 新增 token 时，需要同时补齐 `:root` 和 `.dark`，并在 `@theme inline` 中暴露为 Tailwind token。
- 文档站专用变量应留在 `apps/docs/app/global.css`，组件库通用变量应留在 `packages/ui/src/styles.css`。
- Fumadocs 的 `--color-fd-*` 应继续通过桥接变量继承组件库主题，避免 docs app 出现第二套颜色系统。
- 如果补充危险按钮实底样式，建议新增 `--destructive-foreground`，并同步 `@theme inline` 映射。
- 当前 `--muted` 行存在重复分号：`;;`。不影响浏览器解析，但建议后续顺手清理。
