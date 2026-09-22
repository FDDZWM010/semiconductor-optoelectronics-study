import { readFileSync, statSync } from "node:fs";
import vm from "node:vm";

const file = new URL("../docs/index.html", import.meta.url);
const html = readFileSync(file, "utf8");
const errors = [];

for (const marker of [
  "<!doctype html>",
  "const CHAPTERS = [",
  "const VARIABLES = [",
  'id="searchInput"',
  'id="chapterNav"',
]) {
  if (!html.includes(marker)) errors.push(`缺少必要标记：${marker}`);
}

const chapterSource = html.match(/const CHAPTERS = (\[[\s\S]*?\n\s*\]);/);
const variableSource = html.match(/const V = ([\s\S]*?);\n\s*const VARIABLES = (\[[\s\S]*?\n\s*\]);/);

let chapters = [];
let variables = [];

try {
  if (!chapterSource) throw new Error("无法读取 CHAPTERS 数据块");
  const sandbox = {};
  vm.runInNewContext(`result = ${chapterSource[1]}`, sandbox);
  chapters = sandbox.result;
} catch (error) {
  errors.push(`章节数据解析失败：${error.message}`);
}

try {
  if (!variableSource) throw new Error("无法读取 VARIABLES 数据块");
  const sandbox = {};
  vm.runInNewContext(`const V = ${variableSource[1]}; result = ${variableSource[2]}`, sandbox);
  variables = sandbox.result;
} catch (error) {
  errors.push(`变量数据解析失败：${error.message}`);
}

if (chapters.length < 13) errors.push(`章节数量异常：${chapters.length}`);
if (variables.length < 250) errors.push(`变量数量异常：${variables.length}`);

const chapterIds = new Set(chapters.map((chapter) => chapter.id));
for (const [index, variable] of variables.entries()) {
  if (!chapterIds.has(variable.chapter)) errors.push(`变量 #${index + 1} 使用未知章节：${variable.chapter}`);
  for (const field of ["symbol", "name", "definition"]) {
    if (!String(variable[field] ?? "").trim()) errors.push(`变量 #${index + 1} 缺少 ${field}`);
  }
}

if (statSync(file).size > 1_000_000) errors.push("index.html 超过 1 MB，请检查是否误嵌入了大文件");

if (errors.length) {
  console.error(errors.map((message) => `✗ ${message}`).join("\n"));
  process.exit(1);
}

console.log(`✓ 网页校验通过：${chapters.length} 个导航项，${variables.length} 个变量条目`);

