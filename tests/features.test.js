const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const expected = ['lives', 'stageIndex', 'drawStaticBackground', 'AudioContext', 'STAGES'];
for (const token of expected) {
  if (!html.includes(token)) throw new Error(`Missing planned feature: ${token}`);
}
console.log('feature smoke assertions passed');
