'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const root = join(__dirname, '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
function readData(name, next) {
  const start = 'var ' + name + ' = ';
  const end = next ? ';\nvar ' + next + ' = ' : ';</script>';
  const source = html.split(start)[1];
  assert.ok(source, 'Missing ' + name);
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
  const readme = readFileSync(join(root, 'README.md'), 'utf8');
  const documented = new Map([...readme.matchAll(/\| (\d+) \| \[Open collection\]\(([^)]+)\) \|/g)]
    .map(([, count, url]) => [url, Number(count)]));
  assert.equal(documented.size, collections.length);
  for (const c of collections) {
    assert.match(html, new RegExp('id="card-' + c.id + '"'));
    assert.match(html, new RegExp('id="img-' + c.id + '"'));
    assert.ok(html.includes('href="' + c.url + '"'), 'Missing gateway: ' + c.repo);
    assert.equal(documented.get(c.url), c.count, 'Documented count: ' + c.repo);
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
    assert.match(translations[locale].templateCount, /\{count\}/, 'Template count: ' + locale);
    assert.ok(translations[locale].templateCountOne, 'Single template count: ' + locale);
    assert.deepEqual(translations[locale].filterResult.match(/\{\w+\}/g).sort(), ['{total}', '{visible}']);
    assert.deepEqual(translations[locale].previewPosition.match(/\{\w+\}/g).sort(), ['{current}', '{total}']);
    assert.equal(groupTranslations[locale].pipeline.names.length, 4);
    for (const collection of collections) {
      const text = groupTranslations[locale][collection.sector];
      for (const prop of ['k', 't', 'd']) assert.ok(text[prop], locale + ' ' + collection.sector + '.' + prop);
    }
  }
  const markupKeys = [...html.matchAll(/data-i18n(?:-aria|-alt)?="([^"]+)"/g)].map(m => m[1]);
  for (const key of markupKeys) assert.ok(keys.includes(key), 'Missing translation for ' + key);
  assert.equal(translations.de.templateCount, '{count} aktuelle Vorlagen');
  assert.equal(translations.zh.templateCount, '{count} 个当前模板');
});

test('custom-domain metadata and indexing files', () => {
  assert.match(html, /rel="canonical" href="https:\/\/senthan\.work\/"/);
  assert.match(html, /property="og:url" content="https:\/\/senthan\.work\/"/);
  assert.match(html, /name="twitter:image" content="https:\/\/senthan\.work\/assets\//);
  const ld = JSON.parse(html.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
  assert.equal(ld['@type'], 'WebSite');
  assert.equal(ld.url, 'https://senthan.work/');
  assert.deepEqual([...ld.inLanguage].sort(), [...locales].sort());
  const socialImage = new URL(html.match(/property="og:image" content="([^"]+)"/)[1]);
  assert.equal(socialImage.origin, 'https://senthan.work');
  assert.equal(readFileSync(join(root, socialImage.pathname)).subarray(8, 12).toString(), 'WEBP');
  const updatedDate = html.match(/<time datetime="([\d-]+)" id="updated-date"/)[1];
  const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
  const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
  assert.ok(robots.includes('Sitemap: https://senthan.work/sitemap.xml'));
  assert.ok(sitemap.includes('<loc>https://senthan.work/</loc>'));
  assert.ok(sitemap.includes('<lastmod>' + updatedDate + '</lastmod>'));
});

test('static collection access, keyboard targets and preview landmarks', () => {
  const fragments = new Set([...html.matchAll(/href="#([\w-]+)"/g)].map(([, fragment]) => fragment));
  for (const fragment of fragments) {
    assert.match(html, new RegExp('id="' + fragment + '"[^>]*tabindex="-1"'), 'Keyboard target: ' + fragment);
  }
  assert.match(html, /<span class="footer-origin" translate="no">UG<\/span>/);
  assert.match(html, /<dialog[^>]+aria-labelledby="preview-title"[^>]+aria-describedby="preview-description"/);
  assert.match(html, /id="preview-stage" tabindex="0" role="region"/);
  assert.match(html, /id="preview-status" role="status"/);
  assert.match(html, /<noscript>/);
  assert.equal((html.match(/<article class="collection-card reveal"/g) || []).length, 10);
});
