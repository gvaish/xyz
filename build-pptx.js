// Fallback deck: one slide per camera stop of the zooming-canvas presentation,
// so speech.md timings still line up if the web version cannot be shown.
//   node build-pptx.js
const pptxgen = require('pptxgenjs');

const INK   = '0B1F1A';
const INK2  = '4A5C54';
const INK3  = '7E8F88';
const GREEN = '008D69';
const DEEP  = '00644A';
const WASH  = 'E8F5F0';
const FLAG  = 'C2340A';
const FWASH = 'FDEDE7';
const RULE  = 'D3DCD8';
const PANEL = 'F1F4F3';

const M = 0.65;              // page margin
const W = 13.333 - M * 2;    // usable width
const PNG = 'png/';

const pres = new pptxgen();
pres.layout = 'LAYOUT_WIDE';
pres.author = 'Gaurav Vaish';
pres.title = 'Many paths, one front door';
pres.subject = 'Wealth Summit 2026';

const FOOTER = 'Doma Loans Inc  ·  NMLS #2122782  ·  Company NMLS #2649550  ·  ' +
               'Illustrative. Not a commitment to lend.  ·  Equal Housing Lender';

pres.defineSlideMaster({
  title: 'BASE',
  background: { color: 'FFFFFF' },
  objects: [
    { text: { text: FOOTER, options: {
        x: M, y: 6.92, w: W - 0.6, h: 0.3, fontSize: 9, color: INK3,
        fontFace: 'Arial', align: 'left', valign: 'middle', margin: 0, isTextBox: true } } },
    { text: { text: '', options: {
        x: 12.2, y: 6.92, w: 0.5, h: 0.3, fontSize: 9, color: INK3,
        fontFace: 'Arial', align: 'right', valign: 'middle', margin: 0 } } }
  ],
  slideNumber: { x: 12.3, y: 6.92, w: 0.4, h: 0.3, fontSize: 9, color: INK3,
                 fontFace: 'Arial', align: 'right' }
});

function slide(notes) {
  const s = pres.addSlide({ masterName: 'BASE' });
  if (notes) s.addNotes(notes);
  return s;
}

function eyebrow(s, t) {
  s.addText(t.toUpperCase(), { x: M, y: 0.45, w: W, h: 0.3, fontSize: 12, bold: true,
    color: DEEP, fontFace: 'Arial', charSpacing: 2, margin: 0, isTextBox: true });
}

function title(s, t, size) {
  s.addText(t, { x: M, y: 0.8, w: W, h: 1.0, fontSize: size || 36, bold: true,
    color: INK, fontFace: 'Arial', margin: 0, valign: 'top', isTextBox: true });
}

function kicker(s, t, y) {
  s.addText(t, { x: M, y: y, w: W, h: 0.9, fontSize: 19, bold: true, color: DEEP,
    fontFace: 'Arial', margin: 0, valign: 'top', isTextBox: true });
}

function vignette(s, t, x, y, w, h) {
  s.addShape(pres.ShapeType.roundRect, { x: x, y: y, w: w, h: h, fill: { color: PANEL },
    rectRadius: 0.06, line: { color: RULE, width: 0.75 } });
  s.addText(t, { x: x + 0.28, y: y + 0.22, w: w - 0.56, h: h - 0.44, fontSize: 14,
    color: INK, fontFace: 'Arial', italic: true, margin: 0, valign: 'top', isTextBox: true });
}

function panel(s, o) {
  s.addShape(pres.ShapeType.roundRect, { x: o.x, y: o.y, w: o.w, h: o.h,
    fill: { color: o.fill }, rectRadius: 0.06,
    line: { color: o.line || RULE, width: 0.75 } });
  if (o.cap) s.addText(o.cap.toUpperCase(), { x: o.x + 0.26, y: o.y + 0.18, w: o.w - 0.52,
    h: 0.26, fontSize: 10.5, bold: true, color: o.capColor || DEEP, fontFace: 'Arial',
    charSpacing: 1.5, margin: 0, isTextBox: true });
  if (o.big) s.addText(o.big, { x: o.x + 0.26, y: o.y + 0.5, w: o.w - 0.52, h: 0.6,
    fontSize: o.bigSize || 30, bold: true, color: o.bigColor || INK, fontFace: 'Arial',
    margin: 0, valign: 'top', isTextBox: true });
  if (o.sub) s.addText(o.sub, { x: o.x + 0.26, y: o.y + (o.big ? 1.12 : 0.5),
    w: o.w - 0.52, h: o.h - (o.big ? 1.3 : 0.7), fontSize: 13, color: INK2,
    fontFace: 'Arial', margin: 0, valign: 'top', isTextBox: true });
}

/* ───────────────────────── 1 · Title ───────────────────────── */
let s = slide('0:00 · 50s. Leverage opening. Name the speakers before you, then: all of it is leverage, and nobody has said how you get some.');
s.addImage({ path: PNG + 'doma.png', x: M, y: 0.4, w: 2.0, h: 0.64 });
s.addText('WEALTH SUMMIT 2026', { x: M, y: 1.2, w: W, h: 0.3, fontSize: 12, bold: true,
  color: DEEP, fontFace: 'Arial', charSpacing: 2, margin: 0, isTextBox: true });
s.addText('Many paths,\none front door', { x: M, y: 1.7, w: 8.4, h: 2.6, fontSize: 60,
  bold: true, color: INK, fontFace: 'Arial', lineSpacingMultiple: 0.92, margin: 0,
  valign: 'top', isTextBox: true });
s.addText('Gaurav Vaish   ·   Doma Loans   ·   510.513.9369   ·   gvaish@domaloans.com   ·   NMLS #2122782',
  { x: M, y: 4.6, w: 8.4, h: 0.4, fontSize: 13, color: INK2, fontFace: 'Arial',
    margin: 0, isTextBox: true });
s.addImage({ path: PNG + 'qr-sm.png', x: 9.6, y: 1.9, w: 2.5, h: 2.5 });
s.addText('SCAN TO SAVE MY DETAILS', { x: 9.3, y: 4.5, w: 3.1, h: 0.3, fontSize: 10,
  bold: true, color: INK3, fontFace: 'Arial', charSpacing: 1.5, align: 'center',
  margin: 0, isTextBox: true });

/* ───────────────────────── 2 · The box ───────────────────────── */
s = slide('0:50 · 1m55s. Hands first: who has been asked for two years of returns, keep it up if you were proud of them. Then the four criteria, then point at line 31.');
eyebrow(s, 'The instrument');
title(s, 'The box');
const CRIT = [
  ['01', 'W-2 income',     'Two years. Ideally one employer.'],
  ['02', 'Tax returns',    'Two years. And it reads one line.'],
  ['03', 'Debt-to-income', 'Your debts measured against that line.'],
  ['04', 'Loan size',      'Up to $1,249,125 in Alameda County.']
];
CRIT.forEach((c, i) => {
  const y = 1.95 + i * 0.62;
  s.addText(c[0], { x: M, y: y, w: 0.55, h: 0.35, fontSize: 15, bold: true, color: GREEN,
    fontFace: 'Arial', margin: 0, isTextBox: true });
  s.addText(c[1], { x: M + 0.6, y: y, w: 2.9, h: 0.35, fontSize: 16, bold: true,
    color: INK, fontFace: 'Arial', margin: 0, isTextBox: true });
  s.addText(c[2], { x: M + 3.6, y: y, w: 7.5, h: 0.35, fontSize: 15, color: INK2,
    fontFace: 'Arial', margin: 0, isTextBox: true });
});
s.addShape(pres.ShapeType.rect, { x: M, y: 4.6, w: W, h: 0.72,
  fill: { color: 'FFFFFF' }, line: { color: INK, width: 1.5 } });
s.addText('31    Net profit or (loss)', { x: M + 0.28, y: 4.78, w: 6.0, h: 0.36,
  fontSize: 16, bold: true, color: INK, fontFace: 'Arial', margin: 0, isTextBox: true });
s.addText('$148,000', { x: W - 1.9, y: 4.74, w: 2.2, h: 0.44, fontSize: 22, bold: true,
  color: GREEN, fontFace: 'Arial', align: 'right', margin: 0, isTextBox: true });
s.addText('Schedule C (Form 1040).  Of every page you file, it reads this one line.',
  { x: M, y: 5.45, w: W, h: 0.3, fontSize: 11, color: INK3, fontFace: 'Arial',
    margin: 0, isTextBox: true });

/* ───────────────────────── 3 · 16.5 million ───────────────────────── */
s = slide('2:45 · 45s. Let the number sit. Optional second show of hands, your call. Then: the box is not wrong, it is narrow. Let me show you four of them.');
eyebrow(s, 'Who the form was not built for');
s.addText('16,500,000', { x: M, y: 1.7, w: W, h: 1.8, fontSize: 96, bold: true,
  color: GREEN, fontFace: 'Arial', margin: 0, valign: 'middle', isTextBox: true });
s.addText('Americans are self-employed  ·  about one in ten workers',
  { x: M, y: 3.6, w: W, h: 0.5, fontSize: 22, color: INK, fontFace: 'Arial',
    margin: 0, isTextBox: true });
s.addText('The box is not wrong. It is narrow.', { x: M, y: 4.5, w: W, h: 0.5,
  fontSize: 22, bold: true, color: DEEP, fontFace: 'Arial', margin: 0, isTextBox: true });
s.addText('U.S. Bureau of Labor Statistics, Current Population Survey, June 2026. Incorporated and unincorporated combined.',
  { x: M, y: 5.3, w: W, h: 0.3, fontSize: 10.5, color: INK3, fontFace: 'Arial',
    margin: 0, isTextBox: true });

/* ───────────────────────── 4 · Who is outside ───────────────────────── */
s = slide('3:30 · 20s. The reveal. Name the four, do not explain them. Four seconds, then go.');
eyebrow(s, 'Four of them');
title(s, 'Who falls off the edge');
const TERR = [
  ['01', 'The business owner', 'Great accountant. Tiny line 31.'],
  ['02', 'The portfolio',      '$3.2M in the account. No W-2.'],
  ['03', 'The two houses',     'The down payment is in the walls.'],
  ['04', 'No income yet',      'The money is coming, not here.']
];
TERR.forEach((t, i) => {
  const x = M + i * (W / 4);
  panel(s, { x: x, y: 2.2, w: W / 4 - 0.25, h: 2.4, fill: WASH, line: WASH,
    cap: t[0], big: t[1], bigSize: 19, bigColor: INK, sub: t[2] });
});

/* ───────────────────────── 5 · 01 Business owner ───────────────────────── */
s = slide('3:50 · 40s. Tell it as a story. Land on: her CPA did a beautiful job, and line 31 says one hundred forty-eight thousand.');
eyebrow(s, 'Scenario 01  ·  Bank statement');
title(s, 'The business owner who did everything right');
vignette(s, 'She runs a fourteen-person practice in Fremont. $1.1 million in receipts. ' +
  'Her CPA structured the entity, maxed the retirement plan, took Section 179 and captured QBI.\n\n' +
  'Line 31 came out at $148,000.\n\nShe is delighted. Her lender is not.',
  M, 2.0, 6.0, 2.9);
panel(s, { x: M + 6.4, y: 2.0, w: W - 6.4, h: 1.35, fill: FWASH, line: FWASH,
  cap: 'What the box sees', capColor: FLAG, big: '$12,333 / mo', bigSize: 26,
  bigColor: FLAG });
panel(s, { x: M + 6.4, y: 3.55, w: W - 6.4, h: 1.35, fill: WASH, line: WASH,
  cap: 'What the bank statements say', big: '$43,333 / mo', bigSize: 26,
  bigColor: DEEP });
kicker(s, 'Her CPA did not cost her the house. The form did.', 5.2);

/* ───────────────────────── 6 · 01 The split ───────────────────────── */
s = slide('4:30 · 1m5s. Point top, then bottom. Three and a half times. Then the CPA P&L letter line if the room tenses.');
eyebrow(s, 'Scenario 01  ·  The split');
title(s, 'Same woman, two readings');
panel(s, { x: M, y: 2.0, w: W / 2 - 0.2, h: 2.5, fill: FWASH, line: FWASH,
  cap: 'What the box sees', capColor: FLAG, big: '$148,000 a year', bigSize: 26,
  bigColor: FLAG, sub: 'Schedule C, line 31.\n= $12,333 per month.' });
panel(s, { x: M + W / 2 + 0.2, y: 2.0, w: W / 2 - 0.2, h: 2.5, fill: WASH, line: WASH,
  cap: 'What a bank statement program sees', big: '$43,333 a month', bigSize: 26,
  bigColor: DEEP, sub: '24 months of business deposits,\nless a 50% expense factor.' });
kicker(s, '3.5x the qualifying income. Same business, same bank account, same woman.', 4.8);
s.addText('For the CPAs in the room: a CPA-prepared P&L can often support an expense factor well below the default 50%. ' +
  'That letter can be worth more to your client than another deduction.',
  { x: M, y: 5.6, w: W, h: 0.6, fontSize: 11, color: INK3, fontFace: 'Arial',
    margin: 0, valign: 'top', isTextBox: true });

/* ───────────────────────── 7 · 02 Portfolio ───────────────────────── */
s = slide('5:35 · 35s. Calmer tone. Fifty-one, sold his stake, no W-2 and no plans to get one. Then flatly: the box, no income, no loan.');
eyebrow(s, 'Scenario 02  ·  Asset depletion');
title(s, 'The buyer with $3.2 million and no income');
vignette(s, 'He sold his stake two years ago. Fifty-one years old. $3.2 million in a ' +
  'brokerage account, another $900,000 in retirement.\n\nNo W-2 since, and no intention of another one.\n\n' +
  'He wants a $2.8 million house and he is putting 40% down.',
  M, 2.0, 6.0, 2.9);
panel(s, { x: M + 6.4, y: 2.0, w: W - 6.4, h: 2.9, fill: FWASH, line: FWASH,
  cap: 'The box', capColor: FLAG, big: 'No income,\nno loan.', bigSize: 30,
  bigColor: FLAG });
kicker(s, 'He is not short of money. He is short of a payslip.', 5.2);

/* ───────────────────────── 8 · 02 The math ───────────────────────── */
s = slide('6:10 · 35s. Three lines, slowly. Three point two million over a hundred and twenty months. No employer required.');
eyebrow(s, 'Scenario 02  ·  The math');
title(s, 'Assets, read as income');
const MATH = [['$3,200,000', 'eligible assets'],
               ['÷ 120', 'months'],
               ['= $26,667', 'per month of qualifying income']];
MATH.forEach((m, i) => {
  const y = 2.2 + i * 0.95;
  const last = i === MATH.length - 1;
  s.addShape(pres.ShapeType.roundRect, { x: M, y: y, w: W, h: 0.8,
    fill: { color: last ? WASH : 'FFFFFF' }, rectRadius: 0.05,
    line: { color: last ? WASH : RULE, width: 0.75 } });
  s.addText(m[0], { x: M + 0.3, y: y + 0.14, w: 3.4, h: 0.52, fontSize: 28, bold: true,
    color: last ? DEEP : INK, fontFace: 'Arial', margin: 0, valign: 'middle', isTextBox: true });
  s.addText(m[1], { x: M + 3.9, y: y + 0.14, w: W - 4.2, h: 0.52, fontSize: 16,
    color: INK2, fontFace: 'Arial', margin: 0, valign: 'middle', isTextBox: true });
});
s.addText('No employer. No W-2. Documented, underwritable income.',
  { x: M, y: 5.25, w: W, h: 0.4, fontSize: 16, bold: true, color: DEEP,
    fontFace: 'Arial', margin: 0, isTextBox: true });

/* ───────────────────────── 9 · 02 Why borrow ───────────────────────── */
s = slide('6:45 · 50s. The best line for this room. Ask it, wait, somebody answers. Then the tax argument, then nod at the host.');
eyebrow(s, 'Scenario 02  ·  The turn');
s.addText('So why borrow at all?\nHe could write the check.', { x: M, y: 1.5, w: W, h: 1.5,
  fontSize: 40, bold: true, color: INK, fontFace: 'Arial', lineSpacingMultiple: 1.0,
  margin: 0, valign: 'top', isTextBox: true });
panel(s, { x: M, y: 3.2, w: W, h: 2.1, fill: WASH, line: WASH,
  cap: 'Because the check is the expensive option',
  sub: 'Writing it means liquidating $1.7 million. Long-term capital gains, net investment income tax, ' +
       'and California on top.\n\nThe mortgage is not the expensive option. The mortgage is the tax-efficient one.' });
s.addText('You spent this morning learning exactly that. This is the same lesson with a deed attached.',
  { x: M, y: 5.5, w: W, h: 0.4, fontSize: 13, italic: true, color: INK3,
    fontFace: 'Arial', margin: 0, isTextBox: true });

/* ───────────────────────── 10 · 02b Blended ───────────────────────── */
s = slide('7:35 · 40s. Pivot at the room: here is the version half of you are living. He is not short of money, he is short of ratio.');
eyebrow(s, 'Variation  ·  Full doc + asset depletion');
title(s, 'The W-2 earner who ran out of ratio, not money');
vignette(s, 'Staff engineer. $420,000 in base and bonus, fully documented, W-2 in hand. ' +
  '$1.8 million in vested company stock.\n\nHe wants a $3.2 million house with 25% down.\n\n' +
  'Underwriting puts him at 57% debt-to-income and stops.',
  M, 2.0, 6.0, 2.9);
panel(s, { x: M + 6.4, y: 2.0, w: W - 6.4, h: 2.9, fill: FWASH, line: FWASH,
  cap: 'Debt-to-income', capColor: FLAG, big: '57%', bigSize: 54, bigColor: FLAG,
  sub: 'Declined.' });
kicker(s, 'He is not short of money. He is short of ratio.', 5.2);

/* ───────────────────────── 11 · 02b The ratio ───────────────────────── */
s = slide('8:15 · 55s. Walk the table. Then: he cannot pledge the stock and you would not want him to. We do not pledge it, we do not sell it, we count it.');
eyebrow(s, 'Variation  ·  The ratio');
title(s, 'Counting the stock without selling it');
const RAT = [
  ['W-2 income, documented', '$35,000 / mo', null],
  ['Monthly obligations', '$19,900 / mo', null],
  ['DTI on the W-2 alone', '57%  ·  DECLINED', 'bad'],
  ['Asset depletion, $1.8M ÷ 120 months', '+ $15,000 / mo', 'add'],
  ['Blended DTI', '40%  ·  APPROVED', 'good']
];
RAT.forEach((r, i) => {
  const y = 2.0 + i * 0.66;
  const fill = r[2] === 'bad' ? FWASH : r[2] === 'good' ? WASH : 'FFFFFF';
  const col  = r[2] === 'bad' ? FLAG : r[2] === 'good' ? DEEP : (r[2] === 'add' ? GREEN : INK);
  s.addShape(pres.ShapeType.rect, { x: M, y: y, w: W, h: 0.58,
    fill: { color: fill }, line: { color: RULE, width: 0.75 } });
  s.addText(r[0], { x: M + 0.26, y: y + 0.1, w: 7.4, h: 0.38, fontSize: 14, color: INK2,
    fontFace: 'Arial', margin: 0, valign: 'middle', isTextBox: true });
  s.addText(r[1], { x: M + 7.8, y: y + 0.08, w: W - 8.1, h: 0.42, fontSize: 18, bold: true,
    color: col, fontFace: 'Arial', align: 'right', margin: 0, valign: 'middle', isTextBox: true });
});
kicker(s, 'He never sold a share, and he never pledged one.', 5.45);

/* ───────────────────────── 12 · 03 Two houses ───────────────────────── */
s = slide('9:10 · 45s. Keep it aspirational, they are growing not escaping. The down payment is sitting in the walls of the home they are in tonight.');
eyebrow(s, 'Scenario 03  ·  Bridge');
title(s, 'The family with $1.3 million in the house they already own');
vignette(s, 'Their home has done exactly what they hoped it would. It is worth $1.9 million, ' +
  'with $600,000 left on it.\n\nThe family has grown, and the house that fits them now is $2.4 million.\n\n' +
  'The down payment already exists. It is sitting in the walls of the home they are living in today.',
  M, 2.0, 6.0, 2.9);
panel(s, { x: M + 6.4, y: 2.0, w: W - 6.4, h: 1.35, fill: FWASH, line: FWASH,
  cap: 'To buy, they need the equity', capColor: FLAG,
  sub: 'and the equity requires selling' });
panel(s, { x: M + 6.4, y: 3.55, w: W - 6.4, h: 1.35, fill: FWASH, line: FWASH,
  cap: 'To sell, they need somewhere to go', capColor: FLAG,
  sub: 'and somewhere to go requires buying' });
kicker(s, 'A contingent offer in this market is usually a losing offer.', 5.2);

/* ───────────────────────── 13 · 03 The bridge ───────────────────────── */
s = slide('9:55 · 1m5s. Lead with the product: twelve months, no interest, no payments. Let it sit. Then the five steps, then why it clears underwriting.');
eyebrow(s, 'Scenario 03  ·  The bridge');
s.addShape(pres.ShapeType.roundRect, { x: M, y: 0.85, w: W, h: 0.95,
  fill: { color: INK }, rectRadius: 0.06, line: { color: INK, width: 0.75 } });
s.addText('12 months   ·   no interest   ·   no payments',
  { x: M + 0.3, y: 1.0, w: W - 0.6, h: 0.65, fontSize: 30, bold: true, color: 'FFFFFF',
    fontFace: 'Arial', margin: 0, valign: 'middle', isTextBox: true });
const STEPS = [
  'Borrow against the equity in the departing residence',
  'Make a clean, non-contingent offer on the new home',
  'Close, and move',
  'Sell on your timeline, not a buyer’s',
  'Retire the bridge out of the sale proceeds'
];
STEPS.forEach((t, i) => {
  const y = 2.1 + i * 0.56;
  s.addShape(pres.ShapeType.ellipse, { x: M, y: y, w: 0.38, h: 0.38,
    fill: { color: GREEN }, line: { color: GREEN, width: 0.5 } });
  s.addText(String(i + 1), { x: M, y: y, w: 0.38, h: 0.38, fontSize: 13, bold: true,
    color: 'FFFFFF', fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0 });
  s.addText(t, { x: M + 0.58, y: y, w: 6.4, h: 0.38, fontSize: 15, color: INK,
    fontFace: 'Arial', margin: 0, valign: 'middle', isTextBox: true });
});
panel(s, { x: M + 7.3, y: 2.1, w: W - 7.3, h: 2.5, fill: WASH, line: WASH,
  cap: 'Why it clears underwriting',
  sub: 'No monthly payment means no monthly obligation, so the bridge never enters the ' +
       'debt-to-income calculation at all.\n\nAnd if they rent the departing house rather than ' +
       'rushing the sale, that rental income counts toward qualifying too.' });
kicker(s, 'They never had a money problem. They had a sequencing problem.', 5.1);

/* ───────────────────────── 14 · 04 No income ───────────────────────── */
s = slide('11:00 · 50s. Open with the name, it does the work. Both stories fast. Handle the divorce one with respect and keep moving.');
eyebrow(s, 'Scenario 04  ·  Reserves and credit');
title(s, 'No income. No employment. No worries.', 38);
vignette(s, 'Founder, four years in. The company is real, the board is real, and the S-1 is ' +
  'being drafted.\n\nHis W-2 says almost nothing, because almost nothing is what he pays himself.',
  M, 2.1, W / 2 - 0.2, 2.3);
vignette(s, 'She is buying out her former spouse’s share of the home her children grew up in. ' +
  'The settlement is signed.\n\nThe buyout is due in January. Her payout lands in March.',
  M + W / 2 + 0.2, 2.1, W / 2 - 0.2, 2.3);
kicker(s, 'Different lives, same problem. The money is coming. It is just not here yet, and a tax return only knows how to look backwards.', 4.7);

/* ───────────────────────── 15 · 04 What it takes ───────────────────────── */
s = slide('11:50 · 50s. Read across, slow down on the last two. Let it sit, then defuse: that is not an absence of underwriting. Do NOT quote FICO or LTV.');
eyebrow(s, 'Scenario 04  ·  What it takes');
title(s, 'What the program actually asks for');
const QUAL = [
  ['2 to 12', 'months of cash reserves', false],
  ['$3M', 'maximum loan amount', false],
  ['None', 'income documented', true],
  ['None', 'employment verified', true]
];
QUAL.forEach((q, i) => {
  const x = M + i * (W / 4);
  panel(s, { x: x, y: 2.2, w: W / 4 - 0.22, h: 1.9, fill: q[2] ? WASH : 'FFFFFF',
    line: q[2] ? WASH : RULE, big: q[0], bigSize: 34, bigColor: q[2] ? DEEP : INK,
    sub: q[1] });
});
kicker(s, 'That is not an absence of underwriting. The reserves get verified, the credit gets pulled, the down payment gets sourced.', 4.4);
s.addText('Owner-occupied only. Figures and timelines illustrative, not an offer or commitment; requirements vary by program and are subject to underwriting approval.',
  { x: M, y: 5.6, w: W, h: 0.5, fontSize: 10.5, color: INK3, fontFace: 'Arial',
    margin: 0, valign: 'top', isTextBox: true });

/* ───────────────────────── 16 · Pull back ───────────────────────── */
s = slide('12:40 · 20s. Silent beat, count of three. Then: four stories, there are a great many more, every one ends at the same door.');
eyebrow(s, 'Step back');
title(s, 'Four stories. There are a great many more.');
['The business owner', 'The portfolio', 'The two houses', 'No income yet'].forEach((t, i) => {
  const x = M + i * (W / 4);
  panel(s, { x: x, y: 2.4, w: W / 4 - 0.22, h: 1.5, fill: WASH, line: WASH,
    cap: '0' + (i + 1), big: t, bigSize: 17, bigColor: INK });
});
kicker(s, 'Every one of them ends at the same door.', 4.4);

/* ───────────────────────── 17 · The thread ───────────────────────── */
s = slide('13:00 · 30s. Five clauses, then the beat, then: what failed was the measurement, not the borrower. Do not count the paths.');
eyebrow(s, 'The pattern');
title(s, 'Many paths. One door.');
const REAL = [
  ['The income was real',   '$1.04M a year, in the business account'],
  ['The money was real',    '$3.2M, documented and seasoned'],
  ['The stock was real',    '$1.8M vested, and never sold'],
  ['The equity was real',   '$1.3M, in the home they already own'],
  ['The reserves were real', 'counted and verified, before the payout']
];
REAL.forEach((r, i) => {
  const x = M + i * (W / 5);
  s.addText(r[0], { x: x, y: 2.3, w: W / 5 - 0.25, h: 0.7, fontSize: 15, bold: true,
    color: INK, fontFace: 'Arial', margin: 0, valign: 'top', isTextBox: true });
  s.addText(r[1], { x: x, y: 3.05, w: W / 5 - 0.25, h: 0.9, fontSize: 12, color: INK2,
    fontFace: 'Arial', margin: 0, valign: 'top', isTextBox: true });
});
kicker(s, 'What failed was the measurement, not the borrower.', 4.5);

/* ───────────────────────── 18 · Common sense ───────────────────────── */
s = slide('13:30 · 35s. Do not name the objection. State the standard. If someone raises the jargon in Q&A, answer it then.');
eyebrow(s, 'The standard');
s.addText('Common sense,\nfully documented.', { x: M, y: 1.4, w: W, h: 1.8, fontSize: 48,
  bold: true, color: INK, fontFace: 'Arial', lineSpacingMultiple: 0.98, margin: 0,
  valign: 'top', isTextBox: true });
s.addText('Every borrower in this talk put real money down, carries strong credit, and holds verified reserves.',
  { x: M, y: 3.5, w: W, h: 0.6, fontSize: 20, color: INK2, fontFace: 'Arial',
    margin: 0, valign: 'top', isTextBox: true });
kicker(s, 'A good loan measures the right thing and then proves it. That is all any of these were.', 4.5);

/* ───────────────────────── 19 · Close ───────────────────────── */
s = slide('14:05 · 35s. Three asks, one per audience. Then: the useful question is not whether you qualify, it is which lens they measured you with.');
eyebrow(s, 'Doma Loans');
title(s, 'If you take one thing away');
const ASKS = [
  ['If you are buying', 'Bring two years of bank statements, not two years of returns.'],
  ['If you prepare taxes', 'Your P&L letter can move a client’s qualifying income by six figures.'],
  ['If you sell real estate', 'Stop writing contingent offers. There is another way to structure the deal.']
];
ASKS.forEach((a, i) => {
  const x = M + i * (W / 3);
  panel(s, { x: x, y: 2.1, w: W / 3 - 0.25, h: 2.2, fill: WASH, line: WASH,
    cap: a[0], sub: a[1] });
});
kicker(s, 'If a lender has told you no, the useful question is not whether you qualify. It is which lens they measured you with.', 4.6);

/* ───────────────────────── 20 · The map ───────────────────────── */
s = slide('14:40 · 10s. Say nothing. Let it sit for a count of two, then go to the final line.');
s.addText('One front door.', { x: M, y: 2.6, w: W, h: 1.6, fontSize: 72, bold: true,
  color: GREEN, fontFace: 'Arial', align: 'center', valign: 'middle', margin: 0,
  isTextBox: true });

/* ───────────────────────── 21 · Tagline ───────────────────────── */
s = slide('14:50 to the end. The box reads one line. Beat. We read more than one. Let the green line land for two to three seconds. Then: your money is real, let us go document it. Then stop.');
s.addText('We read more\nthan one line.', { x: M, y: 1.1, w: 8.4, h: 2.3, fontSize: 56,
  bold: true, color: INK, fontFace: 'Arial', lineSpacingMultiple: 0.95, margin: 0,
  valign: 'top', isTextBox: true });
s.addText('A no is a measurement, not a verdict.', { x: M, y: 3.5, w: 8.4, h: 0.5,
  fontSize: 22, bold: true, color: DEEP, fontFace: 'Arial', margin: 0, isTextBox: true });
s.addText('Your money is real. Let’s go document it.', { x: M, y: 4.15, w: 8.4, h: 0.45,
  fontSize: 18, bold: true, color: INK, fontFace: 'Arial', margin: 0, isTextBox: true });
s.addText('Gaurav Vaish', { x: M, y: 4.95, w: 8.4, h: 0.45, fontSize: 24, bold: true,
  color: INK, fontFace: 'Arial', margin: 0, isTextBox: true });
s.addText('510.513.9369   ·   gvaish@domaloans.com', { x: M, y: 5.42, w: 8.4, h: 0.35,
  fontSize: 16, bold: true, color: DEEP, fontFace: 'Arial', margin: 0, isTextBox: true });
s.addImage({ path: PNG + 'qr-cl.png', x: 9.5, y: 1.5, w: 2.6, h: 2.6 });
s.addText('SCAN TO SAVE MY DETAILS', { x: 9.2, y: 4.2, w: 3.2, h: 0.3, fontSize: 10,
  bold: true, color: INK3, fontFace: 'Arial', charSpacing: 1.5, align: 'center',
  margin: 0, isTextBox: true });
s.addImage({ path: PNG + 'ehl.png', x: 11.3, y: 4.85, w: 0.75, h: 0.81 });

pres.writeFile({ fileName: 'many-paths-one-front-door.pptx' })
  .then(f => console.log('wrote ' + f));
