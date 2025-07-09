import { chromium } from "playwright";
import { preview } from "astro";

const PORT = 4321;
const server = await preview({
  root: ".",
  server: {
    port: PORT,
  },
  logLevel: "error",
});

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${PORT}`);
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: "public/cv.pdf",
  width: 1080,
  margin: {
    top: 24,
  },
});

await browser.close();
await server.stop();
