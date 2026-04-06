import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const positions = [0, 900, 1800, 2700, 3600, 4500, 5400, 6300];
for (const y of positions) {
  await page.evaluate(pos => window.scrollTo(0, pos), y);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/home_y${y}.png` });
  console.log(`Saved y=${y}`);
}
await browser.close();
