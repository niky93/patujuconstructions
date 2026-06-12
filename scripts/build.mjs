import { cp, mkdir, readFile, rm, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, "..");
const outputDirectory = path.join(projectRoot, "dist");

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
  const html = await readFile(path.join(outputDirectory, page), "utf8");
  if (!html.includes("propuesta-editorial.css") || !html.includes("script.js")) {
    throw new Error(`${page} no contiene los recursos publicos esperados.`);
  }
}

console.log(
  `Sitio listo para publicar en ${outputDirectory} (${referencedAssets.size} imagenes).`
);
