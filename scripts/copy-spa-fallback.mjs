import fs from "node:fs";
import path from "node:path";

const distDir = path.resolve(process.cwd(), "dist");
const indexHtml = path.join(distDir, "index.html");
const notFoundHtml = path.join(distDir, "404.html");
const privacyPolicyDir = path.join(distDir, "privacy-policy");
const privacyPolicyIndex = path.join(privacyPolicyDir, "index.html");

if (!fs.existsSync(indexHtml)) {
  console.error(`Expected build output at ${indexHtml}`);
  process.exit(1);
}

fs.copyFileSync(indexHtml, notFoundHtml);
fs.mkdirSync(privacyPolicyDir, { recursive: true });
fs.copyFileSync(indexHtml, privacyPolicyIndex);

console.log("Created dist/404.html SPA fallback.");
console.log("Created dist/privacy-policy/index.html for direct requests.");

