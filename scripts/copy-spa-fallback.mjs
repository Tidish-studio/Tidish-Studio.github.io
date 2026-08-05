import fs from "node:fs";
import path from "node:path";

// Client routes that must resolve to a real 200 rather than falling through to 404.html.
// Google Play rejected the app once because /privacy-policy answered 404, so keep this list in
// sync with the routes in src/App.tsx.
// See docs/adr/0001-static-route-stubs-for-github-pages.md before changing any of this.
const routes = ["/spells", "/privacy-policy"];

const distDir = path.resolve(process.cwd(), "dist");
const indexHtml = path.join(distDir, "index.html");

if (!fs.existsSync(indexHtml)) {
  console.error(`Expected build output at ${indexHtml}`);
  process.exit(1);
}

fs.copyFileSync(indexHtml, path.join(distDir, "404.html"));
console.log("Created dist/404.html SPA fallback.");

for (const route of routes) {
  const routeDir = path.join(distDir, route);
  fs.mkdirSync(routeDir, { recursive: true });
  fs.copyFileSync(indexHtml, path.join(routeDir, "index.html"));
  console.log(`Created dist${route}/index.html for direct requests.`);
}
