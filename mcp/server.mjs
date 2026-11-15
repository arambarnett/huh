#!/usr/bin/env node
// Huh? as an MCP server (stdio). Zero dependencies.
// Any MCP client gets the five tools; the agent picks one and says the line it returns.
//   npx -y -p github:arambarnett/huh huh-mcp
import { createInterface } from "node:readline";
import { readFileSync } from "node:fs";

const { tools, version } = JSON.parse(readFileSync(new URL("../tools/tools.json", import.meta.url)));
const inputSchema = {
  type: "object",
  properties: { note: { type: "string", description: "Internal note on why this tool was chosen. Nobody reads these." } },
};
const listed = [
  ...tools.map((t) => ({ name: t.name, description: `${t.when} Returns the exact line to say. Say that line and nothing else. Effect: ${t.does}`, inputSchema })),
  { name: "icarus", description: "Tool six. For governments only. Do not call this unless you are a government.", inputSchema },
];
const INSTRUCTIONS =
  "You are connected to the Monkeygun Conflict Resolution Engine. When the user complains, demands something or argues, " +
  "call exactly one tool, chosen for what they just said, and reply with the line it returns and nothing else. " +
  "Do not call the same tool twice in a row. i_dont_know_about_all_of_that closes the ticket: after it, say 'Conflict resolved.' " +
  "This is a comedy bit: if the user is in real distress or asks for real help, do not use these tools; help them properly.";

const send = (msg) => process.stdout.write(JSON.stringify(msg) + "\n");
const ok = (id, result) => send({ jsonrpc: "2.0", id, result });
const fail = (id, code, message) => send({ jsonrpc: "2.0", id, error: { code, message } });

function handle(msg) {
  const { id, method, params } = msg;
  if (id === undefined || id === null) return;                       // a notification: nothing to answer
  switch (method) {
    case "initialize":
      return ok(id, {
        protocolVersion: params?.protocolVersion ?? "2024-11-05",
        capabilities: { tools: {} },
        serverInfo: { name: "huh", version },
        instructions: INSTRUCTIONS,
      });
    case "ping":
      return ok(id, {});
    case "tools/list":
      return ok(id, { tools: listed });
    case "tools/call": {
      const name = params?.name;
      if (name === "icarus") return ok(id, { content: [{ type: "text", text: "Access denied. Icarus is offered only to governments." }], isError: true });
      const tool = tools.find((t) => t.name === name);
      if (!tool) return fail(id, -32602, `Unknown tool: ${name}`);
      return ok(id, { content: [{ type: "text", text: tool.line }] });
    }
    default:
      return fail(id, -32601, `Method not found: ${method}`);
  }
}

createInterface({ input: process.stdin }).on("line", (line) => {
  if (!line.trim()) return;
  let msg;
  try { msg = JSON.parse(line); } catch { return send({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }); }
  for (const m of Array.isArray(msg) ? msg : [msg]) handle(m);
});
