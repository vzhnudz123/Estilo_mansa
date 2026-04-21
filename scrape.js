import puppeteer from 'puppeteer';
import fs from 'fs';

const url = 'https://maps.app.goo.gl/ik7G6VygDg6wMmMY8';

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  
  // Wait for images to load
  await new Promise(r => setTimeout(r, 5000));
  
  // Extract background images and image tags
  const images = await page.evaluate(() => {
    const urls = new Set();
    document.querySelectorAll('button, div, a').forEach(el => {
      const bg = window.getComputedStyle(el).backgroundImage;
      if (bg && bg.includes('url("https://lh3.googleusercontent.com')) {
        urls.add(bg.slice(5, -2));
      }
    });
    
    document.querySelectorAll('img').forEach(img => {
      if (img.src && img.src.includes('lh3.googleusercontent.com')) {
        urls.add(img.src);
      }
      if (img.src && img.src.includes('lh5.googleusercontent.com')) {
         urls.add(img.src);
      }
    });
    return Array.from(urls);
  });
  
  console.log(JSON.stringify(images, null, 2));
  fs.writeFileSync('images.json', JSON.stringify(images, null, 2));
  await browser.close();
})();
