import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { cwd } from "node:process";
import { preview } from "astro";
import { chromium } from "playwright";

const outputPath = join(cwd(), "public", "cv.pdf");

const server = await preview({
	root: ".",
	server: {
		port: 0,
	},
	logLevel: "error",
});

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`http://localhost:${server.port}`, {
	waitUntil: "networkidle",
});
await page.emulateMedia({ media: "print" });
await mkdir(dirname(outputPath), { recursive: true });
await page.pdf({
	path: outputPath,
	width: 1080,
	margin: {
		top: 24,
	},
	printBackground: true,
});

await browser.close();
await server.stop();

console.log(`the cv was created at ${outputPath}`);
