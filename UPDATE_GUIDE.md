# 后续更新指南

## 1. 更新变量

打开 `docs/index.html`，搜索：

```js
const VARIABLES = [
```

每一条变量使用下面的结构：

```js
V(chapter, section, page, symbol, name, english, definition, unit, relation, aliases, tags, conflict, note)
```

字段含义：

| 字段 | 含义 | 示例 |
| --- | --- | --- |
| `chapter` | 章节编号 | `"3"`、`"A"`、`"common"` |
| `section` | 小节编号 | `"3.2"` |
| `page` | 书的印刷页码 | `83` |
| `symbol` | 可包含 HTML 下标或上标的符号 | `"n<sub>eff</sub>"` |
| `name` | 中文名称 | `"有效折射率"` |
| `english` | 英文名称 | `"Effective refractive index"` |
| `definition` | 在本书语境中的定义 | 一句完整定义 |
| `unit` | 单位；无量纲写 `"1"` | `"m⁻¹"` |
| `relation` | 主要关系式，可留空 | `"β = k<sub>0</sub>n<sub>eff</sub>"` |
| `aliases` | 可搜索的别名 | `["neff", "有效折射率"]` |
| `tags` | 筛选标签 | `["波导", "模式"]` |
| `conflict` | 一符多义分组，可留空 | `"n"` |
| `note` | 补充说明，可留空 | `"不要与载流子浓度混淆。"` |

新增条目时放在对应章节的相邻条目中，保留行末逗号。

## 2. 更新章节

搜索：

```js
const CHAPTERS = [
```

章节对象包含 `id`、`short`、`title`、`range`、`pdf` 和 `summary`。如果扫描 PDF 的前置页数改变，需同步更新 `pdf` 页码范围及侧栏的页码说明。

## 3. 校验与提交

```bash
node scripts/validate-site.mjs
git add .
git commit -m "更新变量索引"
git push
```

推送到 `main` 后，`.github/workflows/pages.yml` 会自动检查网页结构、章节数量和变量数量。仓库当前保持私有且不包含教材 PDF，因此不会进行 GitHub Pages 公开部署；以后如将仓库改为公开，可再启用 Pages。
