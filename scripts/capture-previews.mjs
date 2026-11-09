#!/usr/bin/env node
/**
 * Captures a real screenshot of every live project into public/projects/<slug>.png
 * and regenerates the manifest used by <SiteShot>.
 *
 *   npm run capture:screenshots
 *
 * Requires Google Chrome or Microsoft Edge installed locally. No extra npm
 * packages. Set CHROME_PATH to point at a specific browser binary if needed.
 */
import { execFile } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const shotDir = join(root, "public", "projects");
const projectsFile = join(root, "lib", "projects.ts");
const manifestFile = join(root, "lib", "shots.ts");

const WIDTH = 1440;
const HEIGHT = 900;
const MIN_BYTES = 10_000;

function findBrowser() {
  const programFiles = process.env.ProgramFiles ?? "";
  const programFilesX86 = process.env["ProgramFiles(x86)"] ?? "";
  const localAppData = process.env.LOCALAPPDATA ?? "";
  const candidates = [
    process.env.CHROME_PATH,
    join(programFiles, "Google", "Chrome", "Application", "chrome.exe"),
    join(programFilesX86, "Google", "Chrome", "Application", "chrome.exe"),
    join(localAppData, "Google", "Chrome", "Application", "chrome.exe"),
    join(programFiles, "Microsoft", "Edge", "Application", "msedge.exe"),
    join(programFilesX86, "Microsoft", "Edge", "Application", "msedge.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
  ].filter(Boolean);

  return candidates.find((candidate) => existsSync(candidate));
}

function readProjects() {
  const source = readFileSync(projectsFile, "utf8");
  const declared = (source.match(/^\s*slug:\s*"/gm) ?? []).length;
  const entries = new Map();

  for (const match of source.matchAll(/slug:\s*"([a-z0-9-]+)"[\s\S]{0,400}?url:\s*"(https?:\/\/[^"]+)"/g)) {
    entries.set(match[1], match[2]);
  }

  if (entries.size === 0) {
    throw new Error("No projects found in lib/projects.ts");
  }
  if (entries.size !== declared) {
    throw new Error(
      `Parsed ${entries.size} projects but found ${declared} slugs. Refusing to capture a partial set.`,
    );
  }

  return [...entries].map(([slug, url]) => ({ slug, url }));
}

function writeManifest(entries) {
  const captured = entries.filter(({ slug }) => {
    const file = join(shotDir, `${slug}.png`);
    return existsSync(file) && statSync(file).size >= MIN_BYTES;
  });

  const lines = captured.map(({ slug }) => `  "${slug}": "/projects/${slug}.png",`).join("\n");

  writeFileSync(
    manifestFile,
    `/**
 * Real screenshot manifest, written by \`scripts/capture-previews.mjs\`.
 *
 * Generated — do not edit by hand. Re-run \`npm run capture:screenshots\`.
 */
export const projectScreenshots: Record<string, string> = {
${lines}
};
`,
    "utf8",
  );

  return captured.length;
}

async function main() {
  const browser = findBrowser();
  if (!browser) {
    console.error("No Chrome or Edge binary found.");
    console.error("Install Chrome, or set CHROME_PATH to the browser executable, then re-run.");
    process.exitCode = 1;
    return;
  }

  const projects = readProjects();
  const profileDir = mkdtempSync(join(tmpdir(), "v3i-shots-"));
  mkdirSync(shotDir, { recursive: true });

  console.log(`Capturing ${projects.length} sites at ${WIDTH}x${HEIGHT} with ${browser}\n`);

  const failures = [];

  for (const { slug, url } of projects) {
    const output = join(shotDir, `${slug}.png`);
    process.stdout.write(`  ${slug.padEnd(32)}`);

    try {
      await execFileAsync(
        browser,
        [
          "--headless=new",
          "--disable-gpu",
          "--hide-scrollbars",
          "--no-first-run",
          "--no-default-browser-check",
          "--force-device-scale-factor=1",
          "--run-all-compositor-stages-before-draw",
          "--virtual-time-budget=12000",
          `--user-data-dir=${profileDir}`,
          `--window-size=${WIDTH},${HEIGHT}`,
          `--screenshot=${output}`,
          url,
        ],
        { timeout: 90_000, windowsHide: true, maxBuffer: 10 * 1024 * 1024 },
      );
    } catch {
      // Chrome can exit non-zero after writing a valid capture, so judge by the file.
    }

    if (existsSync(output) && statSync(output).size >= MIN_BYTES) {
      console.log("saved");
    } else {
      failures.push({ slug, url });
      console.log("FAILED");
    }

    await new Promise((resolve) => setTimeout(resolve, 600));
  }

  const captured = writeManifest(projects);

  rmSync(profileDir, { recursive: true, force: true });

  console.log(`\n${captured}/${projects.length} screenshots written to public/projects/`);
  console.log(`Manifest updated: lib/shots.ts`);
  console.log(`Commit public/projects/ and lib/shots.ts so the captures ship with the site.`);

  if (failures.length > 0) {
    console.log("\nFailed captures (these keep the generated preview):");
    for (const { slug, url } of failures) console.log(`  - ${slug}  ${url}`);
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
