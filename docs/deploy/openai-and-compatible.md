# Deploy on ChatGPT, the OpenAI API, and anything OpenAI-compatible

**A custom GPT or a project.** Paste [`prompts/system.md`](../../prompts/system.md) into the instructions field.
That is the whole deployment.

**Through an API, as function tools.** [`tools/openai.json`](../../tools/openai.json) is a list of function
tools in the OpenAI format, which most compatible servers and routers also accept. Send
[`prompts/system.md`](../../prompts/system.md) as the system message. When the model calls a function, return
that tool's `line` from [`tools/tools.json`](../../tools/tools.json) as the function result, and let the model
say it.

Works the same on Grok, Mistral, DeepSeek, Llama and the rest: where the model supports tools, use the JSON;
where it does not, the system prompt alone is enough.
