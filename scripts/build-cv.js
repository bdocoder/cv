import { fileURLToPath } from "url";
import puppeteer from "puppeteer";
import { build, preview } from "vite";

async function run() {
  const __dirname = fileURLToPath(new URL("..", import.meta.url));
  await build({
    configFile: false,
    root: __dirname,
  });
  const PORT = 4173;
  const server = await preview({
    configFile: false,
    root: __dirname,
    server: {
      port: PORT,
    },
  });

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`);
  await page.emulateMediaType("screen");
  await page.pdf({
    path: "public/cv.pdf",
    printBackground: true,
    width: 768,
  });

  await browser.close();
  await server.close();
}

run();
