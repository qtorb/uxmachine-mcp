#!/usr/bin/env node
// G-REGLA-IGUAL-QUE-AGENTS
//
// The body of rules/uxmachine.mdc (everything after its YAML frontmatter) must be identical to the
// "## UXMachine" block of AGENTS.md (from that heading to the next "## " heading, or to the end of the file).
// Line endings are normalized to \n first, so the result is the same on any checkout.
//
//   node tests/regla-igual-que-agents.mjs          -> GREEN (exit 0) if identical, RED (exit 1) if not
//   node tests/regla-igual-que-agents.mjs --rojo   -> fabricated red: changes one character of the rule body in
//                                                     memory and checks that the comparison catches it (exit 0 if
//                                                     it does, exit 1 if it does not)
//
// No dependencies: Node 18 or later.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const G = "G-REGLA-IGUAL-QUE-AGENTS";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8").replace(/\r\n/g, "\n");

/** The "## UXMachine" block of AGENTS.md, or null if the heading is not there. */
export function agentsBlock(text) {
  const lines = text.split("\n");
  const start = lines.findIndex((l) => l.trimEnd() === "## UXMachine");
  if (start < 0) return null;
  let end = lines.findIndex((l, i) => i > start && /^## /.test(l));
  if (end < 0) end = lines.length;
  return lines.slice(start, end).join("\n").replace(/\n+$/, "");
}

/** The body of an .mdc rule: what follows the closing "---" of its frontmatter, or null if it has none. */
export function ruleBody(text) {
  const m = /^---\n[\s\S]*?\n---\n/.exec(text);
  return m ? text.slice(m[0].length).replace(/\n+$/, "") : null;
}

/** [] if identical; otherwise, the reasons. */
export function differences(agents, rule) {
  const block = agentsBlock(agents);
  const body = ruleBody(rule);
  if (block === null) return ["AGENTS.md has no \"## UXMachine\" block"];
  if (body === null) return ["rules/uxmachine.mdc has no frontmatter"];
  if (block === body) return [];
  const a = block.split("\n"), b = body.split("\n");
  const line = a.findIndex((l, i) => l !== b[i]);
  const n = line < 0 ? Math.min(a.length, b.length) : line;
  return [`first difference at line ${n + 1} of the block`,
    `  AGENTS.md:           ${JSON.stringify(a[n] ?? "(no line)")}`,
    `  rules/uxmachine.mdc: ${JSON.stringify(b[n] ?? "(no line)")}`];
}

const agents = read("AGENTS.md");
const rule = read("rules/uxmachine.mdc");

if (process.argv.includes("--rojo")) {
  /** One character changed in the rule body: the first "memoria" becomes "memorie". */
  const broken = rule.replace("`memoria`", "`memorie`");
  if (broken === rule) { console.log(`${G} · FABRICATED RED · anchor not found`); process.exit(1); }
  const d = differences(agents, broken);
  console.log(`${G} · FABRICATED RED · one character changed in rules/uxmachine.mdc (in memory)`);
  for (const l of d) console.log(`  ${l}`);
  console.log(d.length ? `${G} · FABRICATED RED · caught: RED` : `${G} · FABRICATED RED · NOT caught`);
  process.exit(d.length ? 0 : 1);
}

const d = differences(agents, rule);
if (d.length) {
  console.log(`${G} · RED`);
  for (const l of d) console.log(`  ${l}`);
  process.exit(1);
}
console.log(`${G} · GREEN · the body of rules/uxmachine.mdc is identical to the "## UXMachine" block of AGENTS.md (${agentsBlock(agents).split("\n").length} lines)`);
