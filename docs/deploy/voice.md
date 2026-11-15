# Deploy on a phone line

The engine was built for voice. The pause is half of it.

## With a voice agent platform

Any platform that takes a system prompt works (ElevenLabs Agents, Vapi, Retell, LiveKit Agents, OpenAI's
realtime API and the rest):

1. Put [`prompts/voice.md`](../../prompts/voice.md) in the agent's system prompt.
2. Pick a calm, slightly bored voice. Turn down expressiveness. Turn off backchannels ("mm-hm", "I see").
3. Raise the end-of-turn silence so it never interrupts. Let the caller finish. It takes longer.
4. Optional: add the five tools from [`tools/openai.json`](../../tools/openai.json) as client or webhook tools
   that return the line, so every call is logged with the tool that resolved it.

## With no model: IVR mode

[`voice/ivr/`](../../voice/ivr) has the five lines as audio, in the engine's own voice from the show. Wire them
to a phone tree, or play them from [`lite/huh.mjs`](../../lite/huh.mjs)'s choice:

| File | Line |
|---|---|
| `1-huh.mp3` | Huh? |
| `2-airpods.mp3` | I'm sorry, let me take my AirPods out. What were you saying? |
| `3-whats_that_got_to_do_with_me.mp3` | Damn, that's crazy. What's that got to do with me, though? |
| `4-facts.mp3` | Facts. |
| `5-i_dont_know_about_all_of_that.mp3` | I don't know about all of that. |

"Press 1 to hear 'Huh?'" is a complete product.

## Before you put this on a real line

Do not. Laws about automated calls, call recording and consumer protection apply to jokes too, and a caller in
an emergency needs a person. The prompt tells the engine to stop the bit for real distress; a phone tree
playing audio files cannot.
