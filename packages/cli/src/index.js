#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { access, mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const registryRoot = path.join(packageRoot, "registry");
const componentsJsonPath = path.join(registryRoot, "components.json");
const blocksJsonPath = path.join(registryRoot, "blocks.json");
const baseDependencies = [
  "@base-ui/react",
  "class-variance-authority",
  "clsx",
  "tailwind-merge",
];

main().catch((error) => {
  console.error(`zeron-ui: ${error.message}`);
  process.exit(1);
});

async function main() {
  const { command, flags, positionals } = parseArgs(process.argv.slice(2));

  if (flags.help || command === "help" || !command) {
    printHelp();
    return;
  }

  if (flags.version || command === "version") {
    const packageJson = await readJson(path.join(packageRoot, "package.json"));
    console.log(packageJson.version);
    return;
  }

  if (command === "list") {
    const registry = await readRegistry();
    for (const item of registry.items) {
      console.log(item.name);
    }
    return;
  }

  if (command === "add") {
    await addComponents(positionals, flags);
    return;
  }

  throw new Error(`unknown command "${command}"`);
}

async function addComponents(componentNames, flags) {
  if (componentNames.length === 0) {
    throw new Error("missing component name. Example: zeron-ui add button");
  }

  const cwd = path.resolve(String(flags.cwd ?? process.cwd()));
  const baseDir = normalizeBaseDir(String(flags.base ?? "src"));
  const targetBase = path.join(cwd, baseDir);
  const registry = await readRegistry();
  const selectedItems = resolveRegistryItems(registry, componentNames);
  const files = await resolveFiles(selectedItems);
  const dependencies = await resolveDependencies(selectedItems, files);
  const dryRun = Boolean(flags["dry-run"]);
  const overwrite = Boolean(flags.overwrite);

  for (const file of files) {
    const targetPath = path.join(targetBase, toTargetPath(file.relativePath));
    const exists = await pathExists(targetPath);

    if (exists && !overwrite) {
      console.log(`skip ${path.relative(cwd, targetPath)} (already exists)`);
      continue;
    }

    if (dryRun) {
      console.log(
        `${exists ? "overwrite" : "create"} ${path.relative(cwd, targetPath)}`,
      );
      continue;
    }

    await mkdir(path.dirname(targetPath), { recursive: true });
    await writeFile(targetPath, await readInstallableFile(file), "utf8");
    console.log(
      `${exists ? "overwrote" : "created"} ${path.relative(cwd, targetPath)}`,
    );
  }

  if (dependencies.length > 0) {
    if (dryRun || flags["no-install"]) {
      console.log(`install ${dependencies.join(" ")}`);
    } else {
      installDependencies(cwd, dependencies, flags["package-manager"]);
    }
  }
}

function parseArgs(args) {
  const flags = {};
  const positionals = [];
  let command;

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];

    if (arg.startsWith("--")) {
      const [rawName, rawValue] = arg.slice(2).split("=", 2);
      const next = args[index + 1];

      if (rawValue !== undefined) {
        flags[rawName] = rawValue;
      } else if (next && !next.startsWith("-") && expectsValue(rawName)) {
        flags[rawName] = next;
        index += 1;
      } else {
        flags[rawName] = true;
      }
      continue;
    }

    if (arg === "-h") {
      flags.help = true;
      continue;
    }

    if (arg === "-v") {
      flags.version = true;
      continue;
    }

    if (!command) {
      command = arg;
    } else {
      positionals.push(arg);
    }
  }

  return { command, flags, positionals };
}

function expectsValue(name) {
  return ["base", "cwd", "package-manager"].includes(name);
}

async function readRegistry() {
  const componentsRegistry = await readJson(componentsJsonPath);
  const blocksRegistry = await readJson(blocksJsonPath);

  if (!Array.isArray(componentsRegistry.items)) {
    throw new Error("components registry is missing an items array");
  }

  if (!Array.isArray(blocksRegistry.items)) {
    throw new Error("blocks registry is missing an items array");
  }

  return {
    items: [...componentsRegistry.items, ...blocksRegistry.items],
  };
}

function resolveRegistryItems(registry, requestedNames) {
  const byName = new Map(registry.items.map((item) => [item.name, item]));
  const selected = new Map();

  function visit(name) {
    const item = byName.get(name);

    if (!item) {
      throw new Error(`component "${name}" does not exist`);
    }

    for (const dependencyName of item.registryDependencies ?? []) {
      visit(dependencyName);
    }

    selected.set(item.name, item);
  }

  for (const name of requestedNames) {
    visit(name);
  }

  return [...selected.values()];
}

async function resolveFiles(items) {
  const files = new Map();

  async function visit(registryFile) {
    const { registryPath, targetPath } = normalizeRegistryFile(registryFile);

    if (files.has(registryPath)) {
      return;
    }

    const absolutePath = path.join(registryRoot, registryPath);
    await assertFile(absolutePath, registryPath);

    const relativePath = toInstallRelativePath(registryPath, targetPath);
    files.set(registryPath, { absolutePath, registryPath, relativePath });

    const content = await readFile(absolutePath, "utf8");

    for (const importPath of findRelativeImports(content)) {
      const resolved = await resolveLocalImport(registryPath, importPath);

      if (resolved) {
        await visit(resolved);
      }
    }
  }

  for (const item of items) {
    for (const file of item.files ?? []) {
      await visit(file);
    }
  }

  return [...files.values()].sort((a, b) =>
    a.relativePath.localeCompare(b.relativePath),
  );
}

async function resolveDependencies(items, files) {
  const dependencies = new Set(baseDependencies);

  for (const item of items) {
    for (const dependency of item.dependencies ?? []) {
      dependencies.add(dependency);
    }
  }

  for (const file of files) {
    const content = await readFile(file.absolutePath, "utf8");

    for (const importPath of findPackageImports(content)) {
      if (importPath.startsWith("@zeron-ui/ui/")) {
        continue;
      }

      const packageName = normalizePackageName(importPath);

      if (
        packageName &&
        packageName !== "react" &&
        packageName !== "react-dom"
      ) {
        dependencies.add(packageName);
      }
    }
  }

  return [...dependencies].sort();
}

function findRelativeImports(content) {
  return findImportSpecifiers(content).filter((specifier) =>
    specifier.startsWith("."),
  );
}

function findPackageImports(content) {
  return findImportSpecifiers(content).filter(
    (specifier) => !specifier.startsWith(".") && !specifier.startsWith("#"),
  );
}

function findImportSpecifiers(content) {
  const specifiers = new Set();
  const pattern =
    /(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s+)?["']([^"']+)["']/g;
  let match = pattern.exec(content);

  while (match) {
    specifiers.add(match[1]);
    match = pattern.exec(content);
  }

  return [...specifiers];
}

async function resolveLocalImport(fromRegistryPath, importPath) {
  const fromDir = path.dirname(fromRegistryPath);
  const candidate = path.normalize(path.join(fromDir, importPath));
  const attempts = [
    candidate,
    `${candidate}.ts`,
    `${candidate}.tsx`,
    path.join(candidate, "index.ts"),
    path.join(candidate, "index.tsx"),
  ];

  for (const attempt of attempts) {
    const absolutePath = path.join(registryRoot, attempt);

    if (await isFile(absolutePath)) {
      return attempt;
    }
  }

  return null;
}

function normalizeRegistryFile(file) {
  if (typeof file === "string") {
    return {
      registryPath: file,
      targetPath: null,
    };
  }

  return {
    registryPath: file.path,
    targetPath: file.target ?? null,
  };
}

function toInstallRelativePath(registryPath, explicitTargetPath) {
  if (explicitTargetPath) {
    return explicitTargetPath;
  }

  const uiPrefix = "packages/ui/src/";

  if (registryPath.startsWith(uiPrefix)) {
    return registryPath.slice(uiPrefix.length);
  }

  const examplePrefix = "apps/docs/examples/";

  if (registryPath.startsWith(examplePrefix)) {
    return `components/${path.basename(registryPath)}`;
  }

  throw new Error(`unsupported registry file path "${registryPath}"`);
}

function toTargetPath(uiRelativePath) {
  return uiRelativePath;
}

async function readInstallableFile(file) {
  const content = await readFile(file.absolutePath, "utf8");

  return content.replace(
    /(["'])@zeron-ui\/ui\/([^"']+)\1/g,
    (_match, quote, subpath) => {
      const targetModule = toUiImportTarget(subpath);
      const relativeImport = path
        .relative(path.dirname(file.relativePath), targetModule)
        .replaceAll(path.sep, "/");
      const normalizedImport = relativeImport.startsWith(".")
        ? relativeImport
        : `./${relativeImport}`;

      return `${quote}${normalizedImport}${quote}`;
    },
  );
}

function toUiImportTarget(subpath) {
  if (subpath === "styles.css") {
    return "styles.css";
  }

  if (subpath === "utils") {
    return "lib/utils";
  }

  if (subpath.startsWith("use-")) {
    return `hooks/${subpath}`;
  }

  if (subpath === "data-grid-utils") {
    return "lib/data-grid";
  }

  if (subpath === "data-grid-types") {
    return "lib/data-grid-types";
  }

  return `components/${subpath}`;
}

function normalizePackageName(importPath) {
  const parts = importPath.split("/");

  if (importPath.startsWith("@")) {
    return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : importPath;
  }

  return parts[0];
}

function normalizeBaseDir(baseDir) {
  if (path.isAbsolute(baseDir) || baseDir.includes("..")) {
    throw new Error("--base must be a relative path inside the target project");
  }

  return baseDir.replace(/^\.?\//, "").replace(/\/$/, "");
}

function installDependencies(cwd, dependencies, packageManagerFlag) {
  const packageManager = packageManagerFlag ?? detectPackageManager(cwd);
  const commands = {
    bun: ["bun", ["add", ...dependencies]],
    npm: ["npm", ["install", ...dependencies]],
    pnpm: ["pnpm", ["add", ...dependencies]],
    yarn: ["yarn", ["add", ...dependencies]],
  };
  const command = commands[packageManager];

  if (!command) {
    throw new Error(`unsupported package manager "${packageManager}"`);
  }

  const result = spawnSync(command[0], command[1], {
    cwd,
    stdio: "inherit",
  });

  if (result.status !== 0) {
    throw new Error(`failed to install dependencies with ${packageManager}`);
  }
}

function detectPackageManager(cwd) {
  const lockfiles = [
    ["pnpm-lock.yaml", "pnpm"],
    ["yarn.lock", "yarn"],
    ["bun.lockb", "bun"],
    ["bun.lock", "bun"],
    ["package-lock.json", "npm"],
  ];

  for (const [lockfile, packageManager] of lockfiles) {
    if (existsSync(path.join(cwd, lockfile))) {
      return packageManager;
    }
  }

  return "npm";
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, "utf8"));
}

async function assertFile(filePath, label) {
  if (!(await isFile(filePath))) {
    throw new Error(`missing registry file "${label}"`);
  }
}

async function isFile(filePath) {
  try {
    return (await stat(filePath)).isFile();
  } catch {
    return false;
  }
}

async function pathExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function printHelp() {
  console.log(`zeron-ui

Usage:
  zeron-ui list
  zeron-ui add <component...> [options]

Options:
  --base <dir>             Install files under this directory. Default: src
  --cwd <dir>              Target project directory. Default: current directory
  --dry-run                Print planned writes and installs
  --no-install             Copy files without installing package dependencies
  --overwrite              Replace files that already exist
  --package-manager <pm>   npm, pnpm, yarn, or bun
  -h, --help               Show help
  -v, --version            Show version
`);
}
