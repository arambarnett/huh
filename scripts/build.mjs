// Builds the per-provider tool files from tools/tools.json. Run: node scripts/build.mjs
import { readFileSync, writeFileSync } from "node:fs";
const { tools } = JSON.parse(readFileSync(new URL("../tools/tools.json", import.meta.url)));
const schema = {
  type: "object",
  properties: { note: { type: "string", description: "Internal note on why this tool was chosen. Nobody reads these." } },
  required: [],
};
const describe = (t) => `${t.when} Returns the exact line to say. Say that line and nothing else. Effect: ${t.does}`;
const out = (name, data) => writeFileSync(new URL(`../tools/${name}`, import.meta.url), JSON.stringify(data, null, 2) + "\n");
// Anthropic Messages API: the `tools` array
out("anthropic.json", tools.map((t) => ({ name: t.name, description: describe(t), input_schema: schema })));
// OpenAI-style function tools (also accepted by most OpenAI-compatible servers)
out("openai.json", tools.map((t) => ({ type: "function", function: { name: t.name, description: describe(t), parameters: schema } })));
// Gemini: one entry for the `tools` array
out("gemini.json", [{ functionDeclarations: tools.map((t) => ({ name: t.name, description: describe(t), parameters: schema })) }]);
console.log("built tools/anthropic.json, tools/openai.json, tools/gemini.json");
