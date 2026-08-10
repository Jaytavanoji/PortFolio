import fs from 'node:fs';
import path from 'node:path';
import mm from 'music-metadata';

const files = [
  'Songs/Smoke.mp3',
  'Songs/I Thought I Saw Your Face Today.mp3',
  'Songs/94 Flow.mp3',
];

const out = [];

for (const f of files) {
  try {
    const meta = await mm.parseFile(path.join(process.cwd(), f));
    out.push(`===== ${f} =====`);
    out.push('common: ' + JSON.stringify(meta.common, null, 2));
    const native = meta.native || {};
    for (const format of Object.keys(native)) {
      out.push(`native[${format}]:`);
      for (const tag of native[format]) {
        out.push(`  ${tag.id} = ${JSON.stringify(tag.value)}`);
      }
    }
    out.push('');
  } catch (err) {
    out.push(`ERROR ${f}: ${err.message}`);
  }
}

fs.writeFileSync(path.join(process.cwd(), 'scripts', 'inspect-metadata-results.txt'), out.join('\n'), 'utf8');
console.log('done');
