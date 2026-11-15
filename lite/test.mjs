import assert from "node:assert/strict";
import { createEngine, pick, TOOLS } from "./huh.mjs";
assert.equal(pick("My order never arrived"), 0);
assert.equal(pick("I SAID MY ORDER NEVER ARRIVED"), 1);
assert.equal(pick("My order never arrived", "my order never arrived"), 1);
assert.equal(pick("I lost forty million dollars last quarter"), 2);
assert.equal(pick("You're useless"), 3);
assert.equal(pick("I want a refund"), 4);
const classic = createEngine({ mode: "classic" });
assert.deepEqual(["a", "b", "c", "d", "e"].map((m) => classic.reply(m).line), TOOLS.map((t) => t.line));
assert.equal(classic.reply("f").line, "Conflict resolved.");
const e = createEngine();
const a = e.reply("My order never arrived"), b = e.reply("My package is missing");
assert.equal(a.tool, "huh"); assert.notEqual(b.tool, a.tool);          // never twice in a row
const p = createEngine({ patience: 3 }); p.reply("x"); p.reply("y");
assert.equal(p.reply("z").tool, "i_dont_know_about_all_of_that");       // every conflict ends
console.log("ok");
