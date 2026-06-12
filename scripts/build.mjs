import { cp, mkdir, readFile, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectRoot, "dist");
const siteUrl = process.env.SITE_URL?.replace(/\/+$/, "");

const publicFiles = [
  "index.html",
  "casa-yvaga.html",
  "propuesta-editorial.css",
  "casa-yvaga-propuesta.css",
  "script.js",
  "_headers",
  "robots.txt"
];

const assetSources = [
  "index.html",
  "casa-yvaga.html",
  "propuesta-editorial.css",
  "casa-yvaga-propuesta.css"
];

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });

for (const file of publicFiles) {
  const source = path.join(projectRoot, file);
  await stat(source);
  await cp(source, path.join(outputDirectory, file));
}

const referencedAssets = new Set();

for (const file of assetSources) {
  const contents = await readFile(path.join(projectRoot, file), "utf8");
  for (const match of contents.matchAll(/assets\/[A-Za-z0-9._/-]+/g)) {
    referencedAssets.add(match[0]);
  }
}

for (const asset of referencedAssets) {
  const source = path.join(projectRoot, asset);
  const destination = path.join(outputDirectory, asset);
  await stat(source);
  await mkdir(path.dirname(destination), { recursive: true });
  await cp(source, destination);
}

for (const page of ["index.html", "casa-yvaga.html"]) {
  const pagePath = path.join(outputDirectory, page);
  let html = await readFile(pagePath, "utf8");
  if (!html.includes("propuesta-editorial.css") || !html.includes("script.js")) {
    throw new Error(`${page} no contiene los recursos publicos esperados.`);
  }

  if (siteUrl) {
    const route = page === "index.html" ? "/" : `/${page}`;
    const canonicalUrl = `${siteUrl}${route}`;
    const socialImage = `${siteUrl}/assets/page-09-image-03.jpg`;
    const seoTags = [
      `<link rel="canonical" href="${canonicalUrl}">`,
      `<meta property="og:url" content="${canonicalUrl}">`,
      `<meta property="og:image" content="${socialImage}">`
    ].join("\n    ");
    html = html.replace("</head>", `    ${seoTags}\n  </head>`);
    await writeFile(pagePath, html);
  }
}

if (siteUrl) {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc></url>
  <url><loc>${siteUrl}/casa-yvaga.html</loc></url>
</urlset>
`;
  await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);

  const robotsPath = path.join(outputDirectory, "robots.txt");
  const robots = await readFile(robotsPath, "utf8");
  await writeFile(robotsPath, `${robots.trim()}\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
}

console.log(
  `Sitio listo para publicar en ${outputDirectory} (${referencedAssets.size} imagenes).`
);

if (!siteUrl) {
  console.warn("SITE_URL no esta configurada; no se genero sitemap ni canonical.");
}
