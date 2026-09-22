# 《半导体光电子学》变量导航

这是《半导体光电子学（第 3 版）》的章节变量索引项目。网页支持：

- 按章节浏览变量、定义、单位、主要关系式与书中页码
- 按符号、中文、英文、公式、标签或器件缩写进行全书搜索
- 识别同一符号在不同章节中的不同含义
- 通过 GitHub Pages 自动发布，后续更新只需提交到 `main` 分支

## 目录

```text
.
├── docs/
│   ├── .nojekyll
│   └── index.html          # 可直接打开的完整网页
├── scripts/
│   └── validate-site.mjs   # 更新前检查网页和变量数据
├── .github/workflows/
│   └── pages.yml           # 自动校验并部署 GitHub Pages
└── UPDATE_GUIDE.md         # 后续更新说明
```

## 本地打开

直接双击 `docs/index.html`，或在仓库根目录启动任意静态文件服务器。

## 更新

变量数据和页面逻辑目前集中在 `docs/index.html`，便于离线使用与整体下载。修改后运行：

```bash
node scripts/validate-site.mjs
```

然后提交并推送到 `main`。工作流会自动校验并重新部署网页。详细字段说明见 [UPDATE_GUIDE.md](UPDATE_GUIDE.md)。

## 当前仓库范围

当前提交只包含网页、更新说明、校验脚本和 GitHub Pages 工作流，不包含教材 PDF。后续如需自行加入教材文件，可单独创建 `book/` 目录；GitHub Pages 工作流始终只发布 `docs/`。
