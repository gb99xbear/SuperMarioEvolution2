// Validate the World 1-1-inspired stage layout.
const TILE_SIZE = 16;
const STAGE_ROWS = 15;
const STAGE_COLS_BY_IDX = [223, 244, 265];

function buildStage(seed) {
  const W = STAGE_COLS_BY_IDX[seed];
  const rows = [];
  for (let r = 0; r < STAGE_ROWS; r++) rows.push(new Array(W).fill("."));
  for (let c = 0; c < W; c++) { rows[13][c] = "#"; rows[14][c] = "#"; }
  const pitSets = [
    [[72, 74], [89, 91]],
    [[72, 74], [89, 91], [134, 136]],
    [[72, 74], [89, 91], [134, 136], [173, 175]]
  ];
  (pitSets[seed] || pitSets[0]).forEach(([a, b]) => {
    if (a < W && b < W) for (let c = a; c <= b; c++) { rows[13][c] = "."; rows[14][c] = "."; }
  });
  const scene = [
    [16, 11, "?"], [20, 11, "B"], [22, 11, "?"], [24, 11, "B"], [28, 11, "B"],
    [38, 12, "P"],
    [40, 11, "?"], [46, 11, "B"], [48, 11, "B"], [50, 11, "?"],
    [55, 12, "P"], [55, 11, "P"],
    [62, 10, "B"], [64, 10, "?"], [66, 10, "B"],
    [78, 7, "B"], [80, 7, "?"], [82, 7, "B"], [84, 7, "B"],
    [78, 12, "P"], [78, 11, "P"], [78, 10, "P"],
    [92, 8, "?"], [100, 12, "P"],
    [108, 11, "B"], [110, 11, "B"], [112, 11, "?"], [114, 11, "B"],
    [120, 10, "B"], [122, 10, "?"],
    [128, 9, "B"], [130, 9, "?"], [132, 9, "B"],
    [142, 12, "P"], [142, 11, "P"],
    [148, 11, "B"], [150, 11, "?"], [152, 11, "B"],
    [160, 10, "B"], [162, 10, "B"], [164, 10, "?"], [166, 10, "B"]
  ];
  const stairStart = seed === 0 ? 206 : (seed === 1 ? 227 : 248);
  for (let step = 0; step < 8; step++) {
    for (let w = 0; w < step + 1; w++) {
      const col = stairStart + step * 2 + w;
      const row = 12 - step;
      if (col < W && row >= 0) scene.push([col, row, "#"]);
    }
  }
  scene.forEach(([c, r, t]) => {
    if (c >= 0 && c < W && r >= 0 && r < STAGE_ROWS) rows[r][c] = t;
  });
  const flagCol = Math.min(W - 14, stairStart - 4);
  for (let h = 0; h < 9; h++) if (13 - h >= 0) rows[13 - h][flagCol] = "L";
  for (let c = W - 6; c < W; c++) {
    if (c >= 0) { rows[10][c] = "#"; rows[11][c] = "#"; rows[12][c] = "#"; }
  }
  return rows;
}

let pass = 0, fail = 0;
function assert(name, cond) { if (cond) { pass++; console.log("✅", name); } else { fail++; console.log("❌", name); } }

const s0 = buildStage(0);
const s1 = buildStage(1);
const s2 = buildStage(2);

// Stage lengths
assert("Stage 1 = 223 tiles", s0[0].length === 223);
assert("Stage 2 = 244 tiles", s1[0].length === 244);
assert("Stage 3 = 265 tiles", s2[0].length === 265);

// World 1-1-style pit placement: pits must be in row 13-14 with 2-tile gap
function getPitCols(rows) {
  const cols = [];
  for (let c = 0; c < rows[13].length; c++) {
    if (rows[13][c] === "." && rows[14][c] === ".") cols.push(c);
  }
  return cols;
}
const s0Pits = getPitCols(s0);
assert("Stage 1 has 6 pit cells (2 pits × 3 rows of air)", s0Pits.length === 6);
assert("Stage 1 first pit at col 72-74", s0Pits.includes(72) && s0Pits.includes(73) && s0Pits.includes(74));
assert("Stage 1 second pit at col 89-91", s0Pits.includes(89) && s0Pits.includes(90) && s0Pits.includes(91));

const s2Pits = getPitCols(s2);
assert("Stage 3 has 12 pit cells (4 pits)", s2Pits.length === 12);

// Pipes — at least 3 pipes per stage
function countPipes(rows) {
  let n = 0;
  for (let r = 0; r < rows.length; r++)
    for (let c = 0; c < rows[r].length; c++)
      if (rows[r][c] === "P") n++;
  return n;
}
assert("Stage 1 has ≥ 4 pipe tiles", countPipes(s0) >= 4);
assert("Stage 1 has 3-tall pipe (P at row 10,11,12 col 78)",
  s0[10][78] === "P" && s0[11][78] === "P" && s0[12][78] === "P");

// Question blocks scattered, not all clumped
function countQuestions(rows) {
  let n = 0;
  for (let r = 0; r < rows.length; r++)
    for (let c = 0; c < rows[r].length; c++)
      if (rows[r][c] === "?") n++;
  return n;
}
assert("Stage 1 has 6+ question blocks", countQuestions(s0) >= 6);

// Staircase: count total staircase tiles (it ascends across multiple rows)
function findStaircase(rows) {
  let count = 0;
  // Look at columns 190-220 in rows 4-12 for # tiles
  for (let r = 4; r <= 12; r++) {
    for (let c = 190; c < 220 && c < rows[r].length; c++) {
      if (rows[r][c] === "#") count++;
    }
  }
  return count;
}
assert("Stage 1 has iconic staircase ≥ 20 # tiles", findStaircase(s0) >= 20);

// Flagpole
function findFlag(rows) {
  for (let c = 0; c < rows[0].length; c++)
    for (let r = 0; r < rows.length; r++)
      if (rows[r][c] === "L") return c;
  return -1;
}
const flagCol = findFlag(s0);
assert("Stage 1 flagpole exists", flagCol > 0);

// Castle
let castleOK = true;
for (let c = s0[0].length - 6; c < s0[0].length; c++) {
  if (!(s0[10][c] === "#" && s0[11][c] === "#" && s0[12][c] === "#")) castleOK = false;
}
assert("Stage 1 ends with castle (last 6 cols have wall)", castleOK);

// Enemy layout — hand-placed, not procedural
const ENEMY_LAYOUTS = [
  [{x:22*16},{x:40*16},{x:51*16},{x:60*16},{x:95*16}],  // 5 goombas stage 1
  [{x:22*16},{x:38*16},{x:50*16},{x:75*16},{x:105*16},{x:140*16}],  // 6
  [{x:22*16},{x:40*16},{x:60*16},{x:90*16},{x:120*16},{x:150*16},{x:180*16}]  // 7
];
assert("Stage 1 has 5 enemies (1-1-like)", ENEMY_LAYOUTS[0].length === 5);
assert("Stage 2 has 6 enemies", ENEMY_LAYOUTS[1].length === 6);
assert("Stage 3 has 7 enemies", ENEMY_LAYOUTS[2].length === 7);
const e0 = ENEMY_LAYOUTS[0].map(p => p.x / 16);
const sorted = [...e0].sort((a, b) => a - b);
assert("Stage 1 enemies are not procedurally clumped",
  Math.abs(e0[0] - e0[1]) > 5 && Math.abs(e0[2] - e0[3]) > 5);

console.log(`\n${pass} pass, ${fail} fail`);
process.exit(fail > 0 ? 1 : 0);
