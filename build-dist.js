// Builds the self-contained deploy bundle from the artifact source.
// The only difference between the two is the font source: the artifact pulls
// Archivo and Source Serif 4 from Google Fonts, the bundle carries them.
//
//   node build-dist.js        ->  dist/
var fs = require('fs');
var path = require('path');

var OUT = 'dist';
var PAGES = [['source.html', 'index.html'], ['p2.html', 'p2.html']];

var ASSETS = [
  'qr-sm.svg', 'qr-cl.svg', 'qr-il.svg', 'qr-p2l.svg', 'qr-p2s.svg', 'qr-p2e.svg',
  'doma.svg', 'ehl.svg',
  'fontfetch/archivo.woff2', 'fontfetch/source-serif-4.woff2'
];

var LOCAL_FONTS =
  '<style>\n' +
  "@font-face{font-family:'Archivo';font-style:normal;font-weight:100 900;" +
  "font-display:swap;src:url(archivo.woff2) format('woff2')}\n" +
  "@font-face{font-family:'Source Serif 4';font-style:normal;font-weight:200 900;" +
  "font-display:swap;src:url(source-serif-4.woff2) format('woff2')}\n" +
  '</style>';

fs.mkdirSync(OUT, { recursive: true });

// Assets only need recopying when they are regenerated; the usual case is that
// the pages alone changed and the assets already in dist/ are current.
var refreshed = [];
ASSETS.forEach(function (a) {
  if (!fs.existsSync(a)) return;
  fs.copyFileSync(a, path.join(OUT, path.basename(a)));
  refreshed.push(path.basename(a));
});
console.log('assets refreshed: %s', refreshed.length ? refreshed.join(', ') : 'none (already in dist/)');

var failed = false;
PAGES.forEach(function (p) {
  var SRC = p[0], DEST = p[1];
  var html = fs.readFileSync(SRC, 'utf8');

  // Strip the two preconnects and the stylesheet link, replace with local faces.
  var before = html.length;
  html = html.replace(/<link rel="preconnect"[^>]*>\s*/g, '');
  html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*">/,
                      LOCAL_FONTS);

  if (/fonts\.(googleapis|gstatic)\.com/.test(html)) {
    console.error('FAIL: a Google Fonts reference survived the rewrite of %s', SRC);
    process.exit(1);
  }

  fs.writeFileSync(path.join(OUT, DEST), html);

  // Nothing may reach the network once deployed.
  var remote = html.match(/https?:\/\/[^"')\s]+/g) || [];
  var inPage = remote.filter(function (u) { return !/^https?:\/\/(www\.)?(go\.)?domaloans\.com/.test(u); });

  // Every local reference must already be sitting in dist/.
  var missing = (html.match(/(?:src|href)="([^"]+)"/g) || [])
    .map(function (m) { return m.replace(/.*="|"$/g, ''); })
    .filter(function (r) { return !/^(https?:|#|data:|mailto:)/.test(r); })
    .filter(function (r) { return !fs.existsSync(path.join(OUT, r)); });

  console.log('%s : %d -> %d bytes', DEST, before, html.length);
  console.log('  remote refs in markup: %s', inPage.length ? inPage.join(', ') : 'none');
  console.log('  missing from dist/: %s', missing.length ? missing.join(', ') : 'none');
  if (missing.length || inPage.length) failed = true;
});
if (failed) process.exit(1);
