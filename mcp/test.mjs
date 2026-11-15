// Drives the MCP server over stdio the way a client would.
import { spawn } from "node:child_process";
import assert from "node:assert/strict";
const child = spawn(process.execPath, [new URL("./server.mjs", import.meta.url).pathname]);
let buf = ""; const got = [];
child.stdout.on("data", (d) => { buf += d; let i; while ((i = buf.indexOf("\n")) >= 0) { got.push(JSON.parse(buf.slice(0, i))); buf = buf.slice(i + 1); } });
const say = (m) => child.stdin.write(JSON.stringify(m) + "\n");
say({ jsonrpc: "2.0", id: 1, method: "initialize", params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "test", version: "0" } } });
say({ jsonrpc: "2.0", method: "notifications/initialized" });
say({ jsonrpc: "2.0", id: 2, method: "tools/list" });
say({ jsonrpc: "2.0", id: 3, method: "tools/call", params: { name: "facts", arguments: {} } });
say({ jsonrpc: "2.0", id: 4, method: "tools/call", params: { name: "icarus", arguments: {} } });
say({ jsonrpc: "2.0", id: 5, method: "nope" });
setTimeout(() => {
  child.kill();
  const by = Object.fromEntries(got.map((m) => [m.id, m]));
  assert.equal(got.length, 5);                                           // the notification got no reply
  assert.equal(by[1].result.protocolVersion, "2025-06-18");
  assert.equal(by[1].result.serverInfo.name, "huh");
  assert.equal(by[2].result.tools.length, 6);
  assert.equal(by[3].result.content[0].text, "Facts.");
  assert.equal(by[4].result.isError, true);
  assert.equal(by[5].error.code, -32601);
  console.log("ok");
}, 800);
