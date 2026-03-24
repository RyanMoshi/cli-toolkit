'use strict';
const readline = require('readline');

function prompt(question) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => { rl.close(); resolve(answer.trim()); });
  });
}

async function confirm(question) {
  const answer = await prompt(question + ' [y/N] ');
  return answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes';
}

async function select(question, choices) {
  choices.forEach((c, i) => console.log('  ' + (i + 1) + ') ' + c));
  const answer = await prompt(question + ' (1-' + choices.length + '): ');
  const idx = parseInt(answer, 10) - 1;
  return choices[idx] || null;
}

module.exports = { prompt, confirm, select };
