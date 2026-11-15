# Deploy with no model at all

[`lite/huh.mjs`](../../lite/huh.mjs) picks a tool with a few rules and no network call. Zero dependencies; runs
in Node and in a browser. This is what powers the chat on [monkeygun.com](https://monkeygun.com).

```
npx github:arambarnett/huh            # talk to it in a terminal
npx github:arambarnett/huh --classic  # the five tools in order
```

```js
import { createEngine } from "huh-engine";   // or copy lite/huh.mjs into your project
const engine = createEngine();
engine.reply("My order never arrived");      // { tool: "huh", line: "Huh?", ... }
```

Cost per resolved conflict: $0.00. Latency: none. Hallucinations: none, technically.
