#!/usr/bin/env node
/**
 * Automated screenshot capture for 959 shadcn blocks
 * Uses Playwright directly
 */

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const CATEGORIES = {
  about: 16, awards: 4, banner: 7, blog: 22, blogpost: 6, careers: 9,
  casestudies: 5, casestudy: 3, changelog: 7, codeexample: 5, community: 7,
  compare: 10, compliance: 3, contact: 17, content: 4, cta: 25, download: 11,
  experience: 4, faq: 16, feature: 265, footer: 21, gallery: 33, hero: 166,
  integration: 13, list: 3, login: 7, logos: 12, navbar: 16, pricing: 35,
  process: 3, project: 32, projects: 24, ratecard: 2, resource: 2, resources: 4,
  service: 7, services: 18, signup: 10, skills: 2, stats: 18, team: 12,
  testimonial: 28, timeline: 14, waitlist: 1
};

const BASE_URL = 'https://www.shadcnblocks.com/preview/';
const BASE_PATH = path.join(__dirname, '../skills/shadcn-ui-blocks/images');
const WAIT_TIME = 3000; // 3 seconds

async function captureScreenshots() {
  const results = {
    success: [],
    failed: [],
    total: 0
  };

  const startTime = Date.now();
  let count = 0;

  const totalBlocks = Object.values(CATEGORIES).reduce((a, b) => a + b, 0);
  console.log(`Starting screenshot capture for ${totalBlocks} blocks...\n`);

  // Launch browser
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 }
  });
  const page = await context.newPage();

  try {
    for (const [category, total] of Object.entries(CATEGORIES)) {
      const categoryPath = path.join(BASE_PATH, category);

      // Ensure directory exists
      if (!fs.existsSync(categoryPath)) {
        fs.mkdirSync(categoryPath, { recursive: true });
      }

      for (let i = 1; i <= total; i++) {
        count++;
        const blockName = `${category}${i}`;
        const url = `${BASE_URL}${blockName}`;
        const outputFile = path.join(categoryPath, `${blockName}.png`);

        try {
          process.stdout.write(`[${count}/${totalBlocks}] ${blockName}... `);

          // Skip if already exists
          if (fs.existsSync(outputFile)) {
            results.success.push(blockName);
            console.log('SKIP (exists)');
            continue;
          }

          // Navigate and wait
          await page.goto(url, {
            waitUntil: 'networkidle',
            timeout: 30000
          });
          await page.waitForTimeout(WAIT_TIME);

          // Take screenshot
          await page.screenshot({
            path: outputFile,
            fullPage: true,
            type: 'png'
          });

          results.success.push(blockName);
          console.log('OK');

          // Progress update every 50 blocks
          if (count % 50 === 0) {
            const elapsed = (Date.now() - startTime) / 1000;
            const rate = count / elapsed;
            const remaining = (totalBlocks - count) / rate;
            console.log(`\nProgress: ${count}/${totalBlocks} blocks (${elapsed.toFixed(1)}s elapsed, ~${remaining.toFixed(1)}s remaining)\n`);
          }

        } catch (error) {
          results.failed.push({
            block: blockName,
            reason: error.message
          });
          console.log(`FAILED: ${error.message}`);
        }
      }
    }
  } finally {
    await browser.close();
  }

  // Final report
  const totalTime = (Date.now() - startTime) / 1000;
  results.total = count;

  console.log('\n' + '='.repeat(60));
  console.log('FINAL REPORT');
  console.log('='.repeat(60));
  console.log(`Total blocks: ${results.total}`);
  console.log(`Successful: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Total time: ${totalTime.toFixed(2)}s`);
  console.log(`Average time per block: ${(totalTime / count).toFixed(2)}s`);

  if (results.failed.length > 0) {
    console.log(`\nFailed blocks (${results.failed.length}):`);
    results.failed.forEach(f => {
      console.log(`  - ${f.block}: ${f.reason}`);
    });
  }

  // Save results
  const resultsFile = path.join(__dirname, 'screenshot-results.json');
  fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
  console.log(`\nResults saved to: ${resultsFile}`);

  return results;
}

// Run the script
captureScreenshots()
  .then(results => {
    console.log('\nScreenshot capture completed!');
    process.exit(results.failed.length > 0 ? 1 : 0);
  })
  .catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
