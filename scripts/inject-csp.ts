import { createHash } from "node:crypto";
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import path from "node:path";

const OUT_DIR = path.join(process.cwd(), "out");

function walk(dir: string): string[] {
  const entries = readdirSync(dir);
  const files: string[] = [];
  for (const entry of entries) {
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) {
      files.push(...walk(full));
    } else if (full.endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function hashScript(content: string): string {
  const hash = createHash("sha256").update(content, "utf8").digest("base64");
  return `'sha256-${hash}'`;
}

function inject(html: string): string {
  const hashes = new Set<string>();
  const scriptRe = /<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;
  while ((match = scriptRe.exec(html)) !== null) {
    const body = match[1] ?? "";
    if (body.trim().length > 0) {
      hashes.add(hashScript(body));
    }
  }

  const scriptSrc = ["'self'", ...hashes].join(" ");
  const csp = [
    `default-src 'self'`,
    `script-src ${scriptSrc}`,
    `style-src 'self' 'unsafe-inline'`,
    `img-src 'self' data: https:`,
    `font-src 'self' data:`,
    `connect-src 'self'`,
    `base-uri 'self'`,
    `form-action 'self'`,
  ].join("; ");

  const meta = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
  const referrer = `<meta name="referrer" content="strict-origin-when-cross-origin">`;

  if (html.includes('http-equiv="Content-Security-Policy"')) {
    return html;
  }

  const headOpenRe = /<head(?:\s[^>]*)?>/i;
  if (headOpenRe.test(html)) {
    return html.replace(headOpenRe, (headTag) => `${headTag}\n${meta}\n${referrer}`);
  }

  return `${meta}\n${referrer}\n${html}`;
}

function main() {
  if (!statSync(OUT_DIR, { throwIfNoEntry: false })?.isDirectory()) {
    console.error("out/ directory not found — run next build first");
    process.exit(1);
  }

  const files = walk(OUT_DIR);
  for (const file of files) {
    const html = readFileSync(file, "utf8");
    writeFileSync(file, inject(html), "utf8");
  }

  console.log(`CSP injected into ${files.length} HTML files`);
}

main();
