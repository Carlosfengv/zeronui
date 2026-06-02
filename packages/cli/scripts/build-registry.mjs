import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const cliDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(cliDir, "..");
const workspaceRoot = path.resolve(packageDir, "../..");
const outputDir = path.join(packageDir, "registry");

const componentsJsonPath = path.join(
  workspaceRoot,
  "packages/registry/src/components.json",
);
const uiSrcDir = path.join(workspaceRoot, "packages/ui/src");

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

const componentsJson = JSON.parse(await readFile(componentsJsonPath, "utf8"));
componentsJson.homepage = "https://www.npmjs.com/package/zeron-ui";

await writeFile(
  path.join(outputDir, "components.json"),
  `${JSON.stringify(componentsJson, null, 2)}\n`,
);

await mkdir(path.join(outputDir, "packages/ui"), { recursive: true });
await cp(uiSrcDir, path.join(outputDir, "packages/ui/src"), {
  force: true,
  recursive: true,
});

console.log(`Built CLI registry at ${path.relative(workspaceRoot, outputDir)}`);
