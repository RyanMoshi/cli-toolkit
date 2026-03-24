'use strict';
// CLI utility helpers — parse args, validate flags, format output

function parseArgs(argv) {
  const args = argv.slice(2);
  const parsed = { _: [], flags: {}, options: {} };
  let i = 0;
  while (i < args.length) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('-')) {
        parsed.options[key] = next;
        i += 2;
      } else {
        parsed.flags[key] = true;
        i++;
      }
    } else if (arg.startsWith('-')) {
      arg.slice(1).split('').forEach((c) => { parsed.flags[c] = true; });
      i++;
    } else {
      parsed._.push(arg);
      i++;
    }
  }
  return parsed;
}

function requireOption(parsed, key) {
  if (parsed.options[key] === undefined) {
    console.error('Missing required option: --' + key);
    process.exit(1);
  }
  return parsed.options[key];
}

function table(rows, headers) {
  const widths = headers.map((h, i) => Math.max(h.length, ...rows.map((r) => String(r[i] || '').length)));
  const fmt = (cells) => cells.map((c, i) => String(c || '').padEnd(widths[i])).join('  ');
  const sep = widths.map((w) => '-'.repeat(w)).join('  ');
  return [fmt(headers), sep, ...rows.map(fmt)].join('
');
}

function spinner(text) {
  const frames = ['|', '/', '-', '\'];
  let i = 0;
  const id = setInterval(() => {
    process.stdout.write('' + frames[i++ % frames.length] + ' ' + text);
  }, 100);
  return { stop: () => { clearInterval(id); process.stdout.write(''); } };
}

module.exports = { parseArgs, requireOption, table, spinner };
