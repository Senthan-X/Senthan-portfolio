'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const html = readFileSync(join(__dirname, '..', 'index.html'), 'utf8');
function readData(name, next) {
  const start = 'var ' + name + ' = ';
  const end = next ? ';\nvar ' + next + ' = ' : '];</script>';
  const source = html.split(start)[1];
  assert.ok(source, 'Missing ' + name);
  if (name === 'COLLECTIONS') return JSON.parse(source.split(';</script>')[0]);
  return JSON.parse(source.split(end)[0]);
}
const translations = readData('I18N', 'GROUP_I18N');
const groupTranslations = readData('GROUP_I18N', 'COLLECTIONS');
const collections = readData('COLLECTIONS');
const locales = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'sw'];

test('ten published collection gateways and 93 listed templates', () => {
  assert.equal(collections.length, 10);
  assert.equal(collections.reduce((sum, c) => sum + c.count, 0), 93);
  assert.equal(new Set(collections.map(c => c.id)).size, collections.length);
  for (const c of collections) {
    assert.match(html, new RegExp('id="card-' + c.id + '"'));
    assert.match(html, new RegExp('id="img-' + c.id + '"'));
    assert.ok(html.includes('href="' + c.url + '"'), 'Missing gateway: ' + c.repo);
    assert.ok(c.mobile.startsWith('data:image/webp;base64,'), 'Missing mobile screenshot: ' + c.id);
  }
});

test('eight complete localized UI dictionaries and collection summaries', () => {
  assert.deepEqual(Object.keys(translations).sort(), [...locales].sort());
  const keys = Object.keys(translations.en).sort();
  const sectors = Object.keys(groupTranslations.en).sort();
  for (const locale of locales) {
    assert.deepEqual(Object.keys(translations[locale]).sort(), keys, 'UI locale: ' + locale);
    assert.deepEqual(Object.keys(groupTranslations[locale]).sort(), sectors, 'Groups locale: ' + locale);
    assert.equal(groupTranslations[locale].pipeline.names.length, 4);
    for (const collection of collections) {
      const text = groupTranslations[locale][collection.sector];
      for (const prop of ['k', 't', 'd']) assert.ok(text[prop], locale + ' ' + collection.sector + '.' + prop);
    }
  }
  const markupKeys = [...html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map(m => m[1]);
  for (const key of markupKeys) assert.ok(keys.includes(key), 'Missing translation for ' + key);
  assert.match(html, /currentLang==='ar'\?'rtl':'ltr'/);
});

test('custom-domain metadata and indexing files', () => {
  assert.match(html, /rel="canonical" href="https:\/\/senthan\.work\/"/);
  assert.match(html, /property="og:url" content="https:\/\/senthan\.work\/"/);
  assert.match(html, /name="twitter:image" content="https:\/\/senthan\.work\/assets\//);
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
  assert.equal(ld['@type'], 'WebSite');
  assert.equal(ld.url, 'https://senthan.work/');
  assert.deepEqual([...ld.inLanguage].sort(), [...locales].sort());
});

test('responsive interaction and minimal footer identity', () => {
  assert.match(html, /<span class="footer-origin" aria-label="UG">UG<\/span>/);
  assert.match(html, /\.preview-details #preview-description\{display:block;/);
  assert.match(html, /behavior:reduce\?'auto':'smooth'/);
  assert.match(html, /<dialog class="preview-dialog"/);
  assert.match(html, /<noscript>/);
  assert.equal((html.match(/<article class="collection-card reveal"/g) || []).length, 10);
});
