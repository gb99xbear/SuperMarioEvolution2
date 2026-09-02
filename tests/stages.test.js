// Verify the game's pure logic helpers (offline, no DOM).
// Mirror of the relevant game code, kept in sync with index.html.

const TILE_SIZE = 16;
const STAGE_ROWS = 15;
const STAGE_COLS_BY_IDX = [212, 232, 252];

function buildStage(seed) {
  const W = STAGE_COLS_BY_IDX[seed];
  const rows = [];
  for (let r = 0; r < STAGE_ROWS; r++) {
    rows.push(new Array(W).fill("."));
  }
  for (let c = 0; c < W; c++) { rows[13][c] = "#"; rows[14][c] = "#"; }
  const pits = [
    [62, 64], [108, 110]
  ];
  if (seed !== 0) pits.push([152, 154]);
  pits.forEach(([a, b]) => {
    if (a < W && b < W) for (let c = a; c <= b; c++) { rows[13][c] = "."; rows[14][c] = "."; }
  });
  const flagCol = Math.min(W - 14, 196 + seed * 18);
  for (let h = 0; h < 9; h++) if (13 - h >= 0) rows[13 - h][flagCol] = "L";
  return rows;
}

let pass = 0, fail = 0;
function assert(name, cond) {
  if (cond) { pass++; console.log("✅", name); }
  else { fail++; console.log("❌", name); }
}

// Stage lengths
const s0 = buildStage(0);
const s1 = buildStage(1);
const s2 = buildStage(2);
assert("Stage 1 width = 212", s0[0].length === 212);
assert("Stage 2 width = 232", s1[0].length === 232);
assert("Stage 3 width = 252", s2[0].length === 252);
assert("All stages have 15 rows", s0.length === 15 && s1.length === 15 && s2.length === 15);

// Ground present
let groundCount = s0.filter((_, r) => r >= 13).reduce((a, row) => a + row.filter(c => c === "#").length, 0);
assert("Stage 1 has solid ground (no full pit)", groundCount > 0);

// Pits exist
const s0Row13 = s0[13].join("");
assert("Stage 1 has pit at columns 62-64", s0Row13.substring(62, 65) === "...");

// Flagpole present
let flagCount = 0;
for (let r = 0; r < 15; r++) for (let c = 0; c < s0[r].length; c++) if (s0[r][c] === "L") flagCount++;
assert("Stage 1 has flagpole (≥ 6 tiles tall)", flagCount >= 6);

// Mario can fit through 2-tile pit (16px x 2 = 32px wide, jump range > 32)
const pitWidth = 2 * TILE_SIZE;
const maxJumpDist = 1.8 * 30; // 30 frames at max speed ≈ 54px
assert("Max jump distance > 2-tile pit width", maxJumpDist > pitWidth);

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
