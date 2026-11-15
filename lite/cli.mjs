#!/usr/bin/env node
// Talk to the engine in a terminal:  npx github:arambarnett/huh   (add --classic for the five tools in order)
import { createInterface } from "node:readline";
import { createEngine } from "./huh.mjs";
const engine = createEngine({ mode: process.argv.includes("--classic") ? "classic" : "agent" });
const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: "you  > " });
console.log("Monkeygun Conflict Resolution Engine. Tell it your problem. Ctrl+C to give up.\n");
rl.prompt();
rl.on("line", (text) => {
  if (!text.trim()) return rl.prompt();
  const r = engine.reply(text);
  console.log(`huh  > ${r.line}${r.tool ? `   [${r.tool}]` : ""}`);
  if (r.closes) console.log(`huh  > Conflict resolved.\n`), engine.reset();
  rl.prompt();
}).on("close", () => { console.log("\nConflict resolved."); process.exit(0); });
