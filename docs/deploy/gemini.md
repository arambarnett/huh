# Deploy on Gemini

**A Gem.** Paste [`prompts/system.md`](../../prompts/system.md) into the Gem's instructions.

**Through the API, as function declarations.** [`tools/gemini.json`](../../tools/gemini.json) is one entry for
the request's `tools` array. Use [`prompts/system.md`](../../prompts/system.md) as the system instruction. When
the model returns a function call, answer with that tool's `line` from
[`tools/tools.json`](../../tools/tools.json) as the function response.
