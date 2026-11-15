# Deploy on Claude

**As a skill (Claude apps, Claude Code).** Add [`SKILL.md`](../../SKILL.md) as a skill, or paste its body into
your project's custom instructions. Then complain to it.

**Through the API, as tools.** [`tools/anthropic.json`](../../tools/anthropic.json) is the `tools` array for a
Messages API request. Put [`prompts/system.md`](../../prompts/system.md) in `system`. When the response contains
a `tool_use` block, your code looks up that tool's `line` in [`tools/tools.json`](../../tools/tools.json) and
sends it back as the `tool_result`; the model then says it. Leave `tool_choice` on auto: the engine chooses.

**In any MCP client** (Claude Desktop, Claude Code and others): see [`mcp.md`](mcp.md).
