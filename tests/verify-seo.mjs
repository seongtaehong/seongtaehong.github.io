// Run after npm run build; checks the actual static files deployed to GitHub Pages.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const base = 'https://seongtaehong.github.io';
const home = fs.readFileSync('out/index.html', 'utf8');
assert.match(home, /<html[^>]*class="[^"]*light[^>]*data-theme="light"/);
assert.doesNotMatch(home, /theme-storage|visibility:hidden/);
assert.match(home, /<p lang="ko"[^>]*>홍성태<\/p>/);
assert.match(home, /name="description" content="Seongtae Hong \(홍성태\)/);
assert.match(home, /<title>Seongtae Hong \(홍성태\)<\/title>/);
assert.match(home, /<link rel="canonical" href="https:\/\/seongtaehong.github.io\/"/);
assert.doesNotMatch(home, /name="robots" content="[^"]*noindex/);
const robots = fs.readFileSync('out/robots.txt', 'utf8');
assert.match(robots, /Allow: \//);
assert.ok(robots.includes(`Sitemap: ${base}/sitemap.xml`));
const sitemap = fs.readFileSync('out/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const papers = fs.readdirSync('out/publications', { withFileTypes: true }).filter(entry => entry.isDirectory());
assert.equal(urls.length, papers.length + 1);
assert.equal(new Set(urls).size, urls.length);
for (const url of urls) {
  assert.ok(url.startsWith(`${base}/`));
  const html = fs.readFileSync(`out${new URL(url).pathname}index.html`, 'utf8');
  assert.ok(html.includes(`<link rel="canonical" href="${url}"`), `Canonical: ${url}`);
}
console.log(`SEO/light checks passed: ${urls.length} canonical URLs, robots.txt, visible static content, light root.`);

const mixlid = fs.readFileSync('out/publications/2026-mixlid-token-level-language-identification-mixed-language-text/index.html', 'utf8');
assert.ok(mixlid.includes('https://arxiv.org/abs/2610.16601'));
assert.ok(mixlid.includes('https://huggingface.co/nlpai-lab/MixLID'));
for (const file of fs.readdirSync('public').filter(name => /^google.*\.html$/.test(name))) {
  assert.equal(fs.readFileSync(`out/${file}`, 'utf8'), fs.readFileSync(`public/${file}`, 'utf8'));
}
