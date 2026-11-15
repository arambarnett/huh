# Deploy as an MCP server

One server, five tools, any agent that speaks MCP. No dependencies and no API key.

```json
{
  "mcpServers": {
    "huh": { "command": "npx", "args": ["-y", "-p", "github:arambarnett/huh", "huh-mcp"] }
  }
}
```

Add that to your client's MCP configuration (the file and its location depend on the client). The agent then
sees `huh`, `airpods`, `whats_that_got_to_do_with_me`, `facts` and `i_dont_know_about_all_of_that`, picks one,
and says the line it returns.

A sixth tool, `icarus`, is listed. It is for governments only and returns an error to everyone else.
