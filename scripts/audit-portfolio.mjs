/**
 * Dependency-free static audit for the single-file Senthan Portfolio.
 * Run: node scripts/audit-portfolio.mjs
 */
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { Script } from 'node:vm';

const root = new URL('../', import.meta.url);
const html = readFileSync(new URL('index.html', root), 'utf8');
const report = [];
function check(name, fn) {
  fn();
  report.push('PASS ' + name);
}
function table(name) {
  const source = html.split('var ' + name + ' = ', 2)[1];
  assert.ok(source, name + ' table is present');
  return JSON.parse(source.split(/;\s*(?:var \w+ = |<\/script>)/, 1)[0]);
}
const translations = table('I18N');
const groups = table('GROUP_I18N');
const collections = table('COLLECTIONS');
const supported = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'sw'];

check('All eight translation dictionaries exist and share English keys', () => {
  assert.deepEqual(Object.keys(translations).sort(), supported.slice().sort());
  const keys = Object.keys(translations.en).sort();
  for (const lang of supported) {
    assert.deepEqual(Object.keys(translations[lang]).sort(), keys, lang + ' keys differ');
    for (const key of keys) {
      assert.equal(typeof translations[lang][key], 'string', lang + ':' + key);
      assert.ok(translations[lang][key].trim(), lang + ':' + key + ' is empty');
    }
  }
});

check('Every translated HTML label exists in all languages', () => {
  const used = [...html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map((m) => m[1]);
  assert.ok(used.length > 70);
  for (const lang of supported) {
    for (const key of used) assert.ok(translations[lang][key], lang + ' missing ' + key);
  }
});

check('All collection sectors and roadmap names have translations', () => {
  const sectorKeys = Object.keys(groups.en).sort();
  for (const lang of supported) {
    assert.deepEqual(Object.keys(groups[lang]).sort(), sectorKeys);
    for (const item of collections) {
      const translation = groups[lang][item.sector];
      assert.ok(translation, lang + ': missing sector ' + item.sector);
      for (const field of ['k', 't', 'd']) assert.ok(translation[field], lang + ':' + item.sector + ':' + field);
    }
    assert.equal(groups[lang].pipeline.names.length, 4, lang + ': roadmap count');
  }
});

check('Ten unique collection gateways, 93 templates, and matching source markup', () => {
  assert.equal(collections.length, 10);
  assert.equal(collections.reduce((sum, c) => sum + c.count, 0), 93);
  assert.equal(new Set(collections.map((c) => c.id)).size, collections.length);
  for (const [i, item] of collections.entries()) {
    assert.ok(html.includes('id="card-' + item.id + '"'), item.id + ': missing card');
    assert.ok(html.includes('id="img-' + item.id + '"'), item.id + ': missing image');
    assert.ok(html.includes('data-preview="' + i + '"'), item.id + ': missing preview');
    assert.ok(html.includes('href="' + item.url + '"'), item.id + ': missing gateway');
    assert.ok(item.url.startsWith('https://senthan-x.github.io/'), item.id + ': unexpected gateway host');
    assert.ok(html.includes('data-filter="' + item.sector + '"'), item.id + ': sector not filterable');
    assert.ok(item.mobile.startsWith('data:image/webp;base64,'), item.id + ': missing mobile capture');
  }
});

check('Base64 WebP images have genuine RIFF/WEBP headers', () => {
  const matches = [...html.matchAll(/data:image\/webp;base64,([A-Za-z0-9+/=]+)/g)];
  assert.ok(matches.length >= 20, 'Expected embedded desktop and mobile captures');
  for (const [i, match] of matches.entries()) {
    const bytes = Buffer.from(match[1], 'base64');
    assert.ok(bytes.length > 100, 'Image ' + i + ' is too small');
    assert.equal(bytes.toString('ascii', 0, 4), 'RIFF', 'Image ' + i);
    assert.equal(bytes.toString('ascii', 8, 12), 'WEBP', 'Image ' + i);
  }
});

check('Inline JavaScript parses without third-party runtime dependencies', () => {
  const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  assert.ok(scripts.length >= 3);
  for (const [i, script] of scripts.entries()) {
    assert.ok(!/\bsrc\s*=/.test(script[1]), 'External script not allowed');
    if (/type="application\/ld\+json"/.test(script[1])) JSON.parse(script[2]);
    else new Script(script[2], { filename: 'inline-' + i + '.js' });
  }
  assert.ok(!/<link[^>]+rel="stylesheet"/i.test(html), 'External stylesheet not allowed');
  assert.ok(!/@import\s+url\(/i.test(html), 'External CSS import not allowed');
});

check('Navigation anchors, link security, and required accessible controls', () => {
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map((m) => m[1]));
  for (const [, anchor] of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.has(anchor), 'Missing anchor target #' + anchor);
  }
  for (const [tag] of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.ok(/\brel="[^"]*\bnoopener\b/.test(tag), 'External link missing noopener');
  }
  for (const id of ['language', 'theme', 'menu', 'navigation', 'filters', 'preview', 'preview-close', 'preview-next', 'preview-prev', 'back']) {
    assert.ok(ids.has(id), 'Missing required control: ' + id);
  }
  assert.ok(/<html lang="en" dir="ltr">/.test(html));
  assert.match(html, /\.dir\s*=\s*currentLang\s*===\s*'ar'\s*\?\s*'rtl'\s*:\s*'ltr'/, 'Arabic RTL handling missing');
  assert.ok(html.includes('class="skip"'), 'Skip navigation link missing');
});

check('Canonical, social preview asset, robots, and sitemap are aligned', () => {
  assert.ok(html.includes('<link rel="canonical" href="https://senthan.work/">'));
  const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/);
  assert.ok(ogImage, 'Social preview image missing');
  assert.ok(ogImage[1].startsWith('https://senthan.work/assets/'));
  const path = ogImage[1].replace('https://senthan.work/', '');
  assert.ok(existsSync(new URL(path, root)), 'Social preview file not found: ' + path);
  const robots = readFileSync(new URL('robots.txt', root), 'utf8');
  const sitemap = readFileSync(new URL('sitemap.xml', root), 'utf8');
  assert.ok(robots.includes('https://senthan.work/sitemap.xml'));
  assert.ok(sitemap.includes('<loc>https://senthan.work/</loc>'));
});

for (const line of report) console.log(line);
console.log('Portfolio static audit: ' + report.length + ' suites passed.');
