/**
 * Real screenshot manifest, written by `scripts/capture-previews.mjs`.
 *
 * Every entry maps a project slug to a PNG captured from the live site at
 * 1440x900 and stored in `public/projects/`. The file is empty until the
 * capture script runs; project cards and case studies fall back to the
 * generated previews for any project without an entry.
 *
 * Do not edit by hand — re-run `npm run capture:screenshots` instead.
 */
export const projectScreenshots: Record<string, string> = {};
