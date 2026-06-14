/**
 * RawWeights — Page Screenshot Script
 *
 * Captures full-page screenshots of key pages for before/after comparison.
 * Run with: node scripts/screenshot.js [before|after]
 *
 * Requirements:
 *   npm install puppeteer  (first time only — ~170MB download)
 *
 * Usage:
 *   1. Before hosting: node scripts/screenshot.js before
 *      → saves to screenshots/before/
 *   2. After hosting:  node scripts/screenshot.js after  --base https://rawweights.com
 *      → saves to screenshots/after/
 *   3. Create comparison video: node scripts/screenshot.js compare
 *      → saves side-by-side PNGs to screenshots/compare/ (needs ffmpeg)
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const LABEL = process.argv[2] || 'before';
const BASE_ARG = process.argv.find(a => a.startsWith('--base='));
const BASE_URL = BASE_ARG
  ? BASE_ARG.split('=')[1]
  : 'file:///' + path.resolve(__dirname, '..').replace(/\\/g, '/');

const PAGES = [
  { name: '01-home',              path: '/index.html' },
  { name: '02-blog',              path: '/blog.html' },
  { name: '03-portfolio',         path: '/portfolio/index.html' },
  { name: '04-rag-guide',         path: '/guide/rag.html' },
  { name: '05-mcp',               path: '/guide/mcp.html' },
  { name: '06-llm-post-training', path: '/guide/llm-post-training-guide.html' },
  { name: '07-ml-hub',            path: '/tools/master_ml_hub.html' },
  { name: '08-agentic-strategy',  path: '/blog/agentic-architecture-strategy.html' },
  { name: '09-threatscope',       path: '/blog/threatscope.html' },
  { name: '10-passive-safety',    path: '/guide/passive-safety-watchdog.html' },
  { name: '11-rfp-agent',         path: '/portfolio/rfp-mcp-agent.html' },
  { name: '12-agent-autonomy',    path: '/guide/agent-autonomy-dial.html' },
];

const VIEWPORT = { width: 1440, height: 900, deviceScaleFactor: 1 };
const OUT_DIR = path.resolve(__dirname, '..', 'screenshots', LABEL);

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  await page.setViewport(VIEWPORT);

  for (const pg of PAGES) {
    const url = BASE_URL + pg.path;
    console.log(`Capturing ${pg.name}...`);
    try {
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
      await page.waitForTimeout(800); // let animations settle
      const file = path.join(OUT_DIR, pg.name + '.png');
      await page.screenshot({ path: file, fullPage: true });
      console.log(`  → ${file}`);
    } catch (e) {
      console.warn(`  ✗ Failed: ${e.message}`);
    }
  }

  await browser.close();
  console.log(`\nDone. Screenshots saved to: ${OUT_DIR}`);
  if (LABEL === 'after') {
    console.log('\nTo create a comparison slideshow video:');
    console.log('  node scripts/screenshot.js compare');
  }
}

if (LABEL === 'compare') {
  createComparison();
} else {
  run().catch(console.error);
}

async function createComparison() {
  const beforeDir = path.resolve(__dirname, '..', 'screenshots', 'before');
  const afterDir  = path.resolve(__dirname, '..', 'screenshots', 'after');
  const outDir    = path.resolve(__dirname, '..', 'screenshots', 'compare');
  fs.mkdirSync(outDir, { recursive: true });

  const sharp = (() => { try { return require('sharp'); } catch { return null; } })();
  if (!sharp) {
    console.log('Install sharp for image compositing: npm install sharp');
    console.log('\nAlternatively, create the video manually with ffmpeg:');
    console.log('  ffmpeg -framerate 1 -pattern_type glob -i "screenshots/before/*.png" -framerate 1 -pattern_type glob -i "screenshots/after/*.png" -filter_complex "[0:v][1:v]hstack" -c:v libx264 comparison.mp4');
    return;
  }

  for (const pg of PAGES) {
    const bFile = path.join(beforeDir, pg.name + '.png');
    const aFile = path.join(afterDir,  pg.name + '.png');
    if (!fs.existsSync(bFile) || !fs.existsSync(aFile)) {
      console.warn(`Skipping ${pg.name} — missing before or after screenshot`);
      continue;
    }
    const outFile = path.join(outDir, pg.name + '.png');
    const [bImg, aImg] = await Promise.all([sharp(bFile).resize(960).toBuffer(), sharp(aFile).resize(960).toBuffer()]);
    await sharp({ create: { width: 1920, height: 900, channels: 4, background: '#000' } })
      .composite([{ input: bImg, left: 0, top: 0 }, { input: aImg, left: 960, top: 0 }])
      .png()
      .toFile(outFile);
    console.log(`  → ${outFile}`);
  }
  console.log('\nSide-by-side images saved to screenshots/compare/');
  console.log('Create video: ffmpeg -framerate 0.5 -pattern_type glob -i "screenshots/compare/*.png" -c:v libx264 -pix_fmt yuv420p comparison.mp4');
}
