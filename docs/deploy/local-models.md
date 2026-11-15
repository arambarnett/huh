# Deploy on a local model

With [Ollama](https://ollama.com):

```
ollama create huh -f ollama/Modelfile
ollama run huh
```

Change the `FROM` line in [`ollama/Modelfile`](../../ollama/Modelfile) to any chat model you have pulled. For
other runners (LM Studio, llama.cpp, vLLM), put [`prompts/system.md`](../../prompts/system.md) in the system
prompt. It runs comfortably on a laptop. It does very little.
