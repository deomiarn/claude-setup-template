// Screenshot automation for 959 shadcn blocks
const categories = {
  about: 16, awards: 4, banner: 7, blog: 22, blogpost: 6, careers: 9,
  casestudies: 5, casestudy: 3, changelog: 7, codeexample: 5, community: 7,
  compare: 10, compliance: 3, contact: 17, content: 4, cta: 25, download: 11,
  experience: 4, faq: 16, feature: 265, footer: 21, gallery: 33, hero: 166,
  integration: 13, list: 3, login: 7, logos: 12, navbar: 16, pricing: 35,
  process: 3, project: 32, projects: 24, ratecard: 2, resource: 2, resources: 4,
  service: 7, services: 18, signup: 10, skills: 2, stats: 18, team: 12,
  testimonial: 28, timeline: 14, waitlist: 1
};

const results = {
  success: [],
  failed: [],
  total: 0,
  startTime: Date.now()
};

console.log(`Starting screenshot capture for ${Object.values(categories).reduce((a, b) => a + b, 0)} blocks...`);

// Function will be called from bash with page context
async function captureScreenshots(page) {
  let count = 0;

  for (const [category, total] of Object.entries(categories)) {
    for (let i = 1; i <= total; i++) {
      count++;
      const blockName = `${category}${i}`;
      const url = `https://www.shadcnblocks.com/preview/${blockName}`;
      const filename = `.claude/skills/shadcn-ui-blocks/images/${category}/${blockName}.png`;

      try {
        await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
        await page.waitForTimeout(3000);
        await page.screenshot({
          path: filename,
          fullPage: true,
          type: 'png'
        });

        results.success.push(blockName);

        if (count % 50 === 0) {
          const elapsed = ((Date.now() - results.startTime) / 1000).toFixed(2);
          console.log(`Progress: ${count}/959 blocks captured (${elapsed}s)`);
        }
      } catch (error) {
        results.failed.push({ block: blockName, reason: error.message });
        console.error(`Failed ${blockName}: ${error.message}`);
      }
    }
  }

  results.total = count;
  const totalTime = ((Date.now() - results.startTime) / 1000).toFixed(2);

  console.log('\n=== FINAL REPORT ===');
  console.log(`Total blocks: ${results.total}`);
  console.log(`Successful: ${results.success.length}`);
  console.log(`Failed: ${results.failed.length}`);
  console.log(`Total time: ${totalTime}s`);

  if (results.failed.length > 0) {
    console.log('\nFailed blocks:');
    results.failed.forEach(f => console.log(`  - ${f.block}: ${f.reason}`));
  }

  return results;
}
