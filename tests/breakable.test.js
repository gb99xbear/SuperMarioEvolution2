// Test the new breakable-brick mechanic.
let pass = 0, fail = 0;
function assert(name, cond) { if (cond) { pass++; console.log("✅", name); } else { fail++; console.log("❌", name); } }

// Mirror a tiny map with breakable brick (B) and a "?" question block
let rawMap = [
  ".B?#",
  "....",
  "...."
].map(r => r.split(""));

function isSolid(t) { return t === "#" || t === "B" || t === "P" || t === "?"; }
function isBreakable(t) { return t === "B"; }
function isQuestion(t) { return t === "?"; }
function getTile(x, y) { return rawMap[y]?.[x] || "."; }

let mario = { state: 2 }; // Fire Mario
let score = 0;
let items = [];

function bumpBlock(tx, ty) {
  const t = getTile(tx, ty);
  if (t === "?") {
    rawMap[ty][tx] = "#";
    items.push({ type: "F" });
    score += 200;
    return "spawn";
  } else if (t === "B") {
    if (mario.state > 0) {
      rawMap[ty][tx] = ".";
      score += 50;
      return "break";
    }
  }
  return "none";
}

assert("Big Mario breaks B brick", bumpBlock(1, 0) === "break");
assert("B becomes empty after break", rawMap[0][1] === ".");
assert("Big Mario gets 50 score", score === 50);

assert("Big Mario hits ? and spawns", bumpBlock(2, 0) === "spawn");
assert("? becomes used #", rawMap[0][2] === "#");
assert("Spawned item exists", items.length === 1);

mario.state = 0; // Small Mario
let prevScore = score;
assert("Small Mario bumping B does NOT break", bumpBlock(0, 0) === "none");
assert("Small Mario score unchanged", score === prevScore);

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
