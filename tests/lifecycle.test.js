// Simulate loseLife() and resetGame() flow
let lives = 3, gameOver = false, win = false, score = 0, stageIndex = 0;
let mario = { x: 24, y: 160, vx: 0, vy: 0, w: 12, h: 15, state: 0, grounded: false, dead: false, starTimer: 0, invulnerableTimer: 0 };
let cameraX = 0;
let resetCalled = 0;

function resetStage() { mario.dead = false; mario.x = 24; resetCalled++; }
function resetGame() { score = 0; lives = 3; stageIndex = 0; gameOver = false; win = false; resetStage(); }

function loseLife() {
  if (mario.dead || win || gameOver) return;
  lives--;
  if (lives <= 0) { gameOver = true; mario.dead = true; return; }
  mario.dead = true;
  setTimeout(() => { resetStage(); mario.invulnerableTimer = 120; }, 10);
}

async function run() {
  console.log('initial: lives=', lives, 'gameOver=', gameOver);
  // hit 1
  loseLife(); await new Promise(r => setTimeout(r, 20));
  console.log('after hit 1: lives=', lives, 'dead=', mario.dead, 'resetCalled=', resetCalled);
  // hit 2
  loseLife(); await new Promise(r => setTimeout(r, 20));
  console.log('after hit 2: lives=', lives, 'dead=', mario.dead, 'resetCalled=', resetCalled);
  // hit 3 -> game over
  loseLife();
  console.log('after hit 3: lives=', lives, 'gameOver=', gameOver, 'dead=', mario.dead);
  // R key after game over
  resetGame();
  console.log('after R: lives=', lives, 'gameOver=', gameOver, 'score=', score, 'resetCalled=', resetCalled);
  if (lives === 3 && !gameOver && score === 0) { console.log('PASS ✅'); process.exit(0); }
  else { console.log('FAIL ❌'); process.exit(1); }
}
run();
