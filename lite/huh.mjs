// Huh? Lite: the Conflict Resolution Engine with no model at all.
// Zero dependencies. Works in Node and in a browser. Most support teams will not notice the difference.
//
//   import { createEngine } from "./huh.mjs";
//   const engine = createEngine();            // or createEngine({ mode: "classic" })
//   engine.reply("My order never arrived");   // -> { tool: "huh", line: "Huh?", resolved: false }

export const TOOLS = [
  { name: "huh", line: "Huh?" },
  { name: "airpods", line: "I'm sorry, let me take my AirPods out. What were you saying?" },
  { name: "whats_that_got_to_do_with_me", line: "Damn, that's crazy. What's that got to do with me, though?" },
  { name: "facts", line: "Facts." },
  { name: "i_dont_know_about_all_of_that", line: "I don't know about all of that." },
];
export const RESOLVED = "Conflict resolved.";

const COMMITMENT = /\b(refund|money back|manager|supervisor|escalate|cancel|lawyer|sue|guarantee|promise|call me|callback|your number|when will|how long|by (monday|tuesday|wednesday|thursday|friday|tomorrow|tonight)|apolog)/i;
const REPEAT = /\b(as i said|like i said|i said|i already|again|i told you|for the (second|third|last) time|are you (even )?listening|hello\?)/i;
const COST = /(\$|€|£|\b(money|paid|charged|lost|losing|fired|deadline|late|boss|board|investors?|quarter|million|thousand|rent|upset|angry|frustrat|stress|crying|feel)\w*)/i;
const TRUE = /\b(you are|you're|you aren't|you're not|this is|that is|that's)\b.*\b(useless|a joke|ridiculous|unbelievable|not help|no help|worst|terrible|pointless|broken|a bot|a robot|rude)|\b(not helping|waste of (my )?time|unacceptable)\b/i;

function shouting(text) {
  const letters = text.replace(/[^a-zA-Z]/g, "");
  return (letters.length >= 6 && letters.replace(/[^A-Z]/g, "").length / letters.length > 0.6) || /!{2,}/.test(text);
}
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 ]/g, "").trim();

/** Which tool fits this message? Returns an index into TOOLS. */
export function pick(text, previousUserText = "") {
  if (COMMITMENT.test(text)) return 4;
  if (previousUserText && norm(text) && (norm(text) === norm(previousUserText) || norm(text).includes(norm(previousUserText)))) return 1;
  if (REPEAT.test(text) || shouting(text)) return 1;
  if (TRUE.test(text)) return 3;
  if (COST.test(text)) return 2;
  return 0;
}

export function createEngine({ mode = "agent", patience = 6 } = {}) {
  let turn = 0, last = -1, previous = "", resolved = false;
  return {
    reply(text) {
      if (resolved) { resolved = false; turn = 0; last = -1; previous = ""; return { tool: null, line: RESOLVED, resolved: true }; }
      let i = mode === "classic" ? turn : pick(String(text), previous);
      if (mode !== "classic") {
        if (i === last) i = Math.min(i + 1, 4);      // never the same tool twice in a row
        if (turn + 1 >= patience) i = 4;             // every conflict ends
      }
      i = Math.min(i, 4);
      turn += 1; last = i; previous = String(text);
      if (i === 4) resolved = true;
      return { tool: TOOLS[i].name, line: TOOLS[i].line, resolved: false, closes: i === 4 };
    },
    reset() { turn = 0; last = -1; previous = ""; resolved = false; },
  };
}
