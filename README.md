# Huh? The Monkeygun Conflict Resolution Engine

[![stars](https://img.shields.io/github/stars/arambarnett/huh?label=stars)](https://github.com/arambarnett/huh/stargazers)
[![forks](https://img.shields.io/github/forks/arambarnett/huh?label=forks)](https://github.com/arambarnett/huh/forks)
[![downloads](https://img.shields.io/github/downloads/arambarnett/huh/total?label=downloads)](https://github.com/arambarnett/huh/releases)
[![conflicts resolved](https://img.shields.io/badge/conflicts%20resolved-up%20to%2095%25-e0218a)](docs/USE_CASES.md)

The five tools from episode one of *Friday Morning Funeral*, as something you can actually give your agent.
Open source. It resolves up to 95% of conflicts. The other 5% stop calling.

Try it now, no install: [monkeygun.com](https://monkeygun.com/?utm_source=github&utm_medium=repo&utm_campaign=huh)
or `npx github:arambarnett/huh`

## The five tools

They are real tool definitions. The agent chooses the one that fits what the user just said.

| Tool | The agent says | It chooses this when |
|---|---|---|
| `huh` | "Huh?" | You state a problem for the first time. Most people give up here. |
| `airpods` | "I'm sorry, let me take my AirPods out. What were you saying?" | You repeat yourself or raise your voice. Confirms nothing so far was heard. |
| `whats_that_got_to_do_with_me` | "Damn, that's crazy. What's that got to do with me, though?" | You describe what it cost you. Acknowledges the problem. Returns it to sender. |
| `facts` | "Facts." | You say something true. Full agreement. No action taken. |
| `i_dont_know_about_all_of_that` | "I don't know about all of that." | You ask for a refund, a date or a manager. Closes the ticket. |

Prefer the original? Classic mode runs them in order, one per turn, as seen on the show.

## Deploy it

| Where | How | Guide |
|---|---|---|
| Claude | A skill, or tools through the API | [docs/deploy/claude.md](docs/deploy/claude.md) |
| ChatGPT, the OpenAI API, Grok, Mistral, anything compatible | Instructions, or function tools | [docs/deploy/openai-and-compatible.md](docs/deploy/openai-and-compatible.md) |
| Gemini | A Gem, or function declarations | [docs/deploy/gemini.md](docs/deploy/gemini.md) |
| Local models | An Ollama Modelfile | [docs/deploy/local-models.md](docs/deploy/local-models.md) |
| Any MCP client | One server, no dependencies | [docs/deploy/mcp.md](docs/deploy/mcp.md) |
| Voice agents and phone lines | A voice prompt, or five audio files | [docs/deploy/voice.md](docs/deploy/voice.md) |
| No model at all | 60 lines of JavaScript | [docs/deploy/no-model.md](docs/deploy/no-model.md) |

Everything is generated from one file, [`tools/tools.json`](tools/tools.json). Change a line there, run
`npm run build`, and every provider gets it.

## Use cases

Customer support, investor relations, HR, legal review, stand-up, on-call, dating, your family group chat.
Transcripts in [docs/USE_CASES.md](docs/USE_CASES.md).

It also works on people. Try it in your next meeting, film it, and tag
[@fridaymorningfuneral](https://www.instagram.com/fridaymorningfuneral/). The best ones go in episode 2.

## Is this a joke?

Yes. It is also real, which is the point of the show: everything in the sketches exists. The engine stops the
bit if someone is in real distress or asks for real help; keep that rule if you change the prompt. Do not deploy
this on a support line. Do not deploy this on a date.

Not included: Icarus by Monkeygun (tool six), which is offered only to governments.

## Where this comes from

[Monkeygun](https://monkeygun.com/?utm_source=github&utm_medium=repo&utm_campaign=huh) is the engine behind
*Friday Morning Funeral*, a sketch show made of felt where every product in the sketches is real.
New episodes Fridays, 11am Eastern.

Contributions welcome, especially new deployments and use cases. MIT licence.
