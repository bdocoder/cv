import { fileURLToPath } from "url";
import { chromium } from "playwright";
import { preview } from "vite";

async function run() {
  const __dirname = fileURLToPath(new URL("..", import.meta.url));
  const PORT = 4173;
  const server = await preview({
    configFile: false,
    root: __dirname,
    server: {
      port: PORT,
    },
  });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(`http://localhost:${PORT}`);
  await page.emulateMedia({media: "screen"});
  await page.pdf({
    path: "public/cv.pdf",
    printBackground: true,
    width: 768,
  });

  await browser.close();
  await server.close();
}

run();
