// Generates a static QR SVG with the Doma mark knocked into the middle, so the
// deck carries no runtime dependency.   usage: node gen-qr.js <url> > out.svg
var qrcode = require('./qrlib/qrcode.min.js');

var CARD_URL = process.argv[2];
if (!CARD_URL) { console.error('usage: node gen-qr.js <url> > out.svg'); process.exit(1); }

var INK = '#0B1F1A';
var BRAND = '#00c694';

// Traced from Doma_Icon1.svg in its original 768 unit box: the reversed cut,
// house knocked out of a solid green field. One path, evenodd, so the doorway
// is a real hole and the green disc shows through it.
var HOUSE = 'M384 189.6 L613.4 339.1 L568.1 339.1 L568.1 569.5 L200.2 569.5 ' +
            'L200.2 339.1 L154.6 339.1 Z ' +
            'M323.8 425.1 L444.2 425.1 L444.2 569.5 L323.8 569.5 Z';

// Level H recovers ~30% of the symbol, which is what pays for the center knockout.
var qr = qrcode(0, 'H');
qr.addData(CARD_URL);
qr.make();

var n = qr.getModuleCount();
var quiet = 2;
var size = n + quiet * 2;
var mid = size / 2;

function isFinder(r, c) {
  return (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
}

var hole = size * 0.152;
var cleared = 0;
var d = '';

for (var r = 0; r < n; r++) {
  for (var c = 0; c < n; c++) {
    if (!qr.isDark(r, c) || isFinder(r, c)) continue;
    var dx = (c + quiet + 0.5) - mid;
    var dy = (r + quiet + 0.5) - mid;
    if (Math.sqrt(dx * dx + dy * dy) < hole + 0.7) { cleared++; continue; }
    d += 'M' + (c + quiet) + ' ' + (r + quiet) + 'h1v1h-1z';
  }
}

function finder(x, y) {
  return '<rect x="' + (x + 0.5) + '" y="' + (y + 0.5) + '" width="6" height="6" rx="1.7" ' +
         'fill="none" stroke="' + INK + '" stroke-width="1"/>' +
         '<rect x="' + (x + 2) + '" y="' + (y + 2) + '" width="3" height="3" rx="0.85" fill="' + INK + '"/>';
}

var finders = finder(quiet, quiet) +
              finder(quiet + n - 7, quiet) +
              finder(quiet, quiet + n - 7);

// White ring first so the decoder sees a clean break from the modules, then the
// green disc - that disc is the O - then the house cut out of it in white.
// House bbox is 458.8 wide and 379.9 tall, centered at (384, 379.55).
var disc = hole - 0.6;
var houseScale = (disc * 1.35) / 458.8;
var logo =
  '<circle cx="' + mid + '" cy="' + mid + '" r="' + hole.toFixed(3) + '" fill="#ffffff"/>' +
  '<circle cx="' + mid + '" cy="' + mid + '" r="' + disc.toFixed(3) + '" fill="' + BRAND + '"/>' +
  '<g transform="translate(' + mid + ',' + mid + ') scale(' + houseScale.toFixed(6) +
    ') translate(-384,-379.55)">' +
    '<path d="' + HOUSE + '" fill="#ffffff" fill-rule="evenodd"/>' +
  '</g>';

var svg =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + size + ' ' + size + '" ' +
  'shape-rendering="crispEdges" role="img" ' +
  'aria-label="QR code linking to the Doma Loans contact card">' +
  '<rect width="' + size + '" height="' + size + '" fill="#ffffff"/>' +
  '<path fill="' + INK + '" d="' + d + '"/>' +
  '<g shape-rendering="auto">' + finders + logo + '</g>' +
  '</svg>';

console.error('%s  ->  %d x %d modules, %d knocked out, %d bytes',
              CARD_URL, n, n, cleared, svg.length);
console.log(svg);
