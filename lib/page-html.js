import fs from "fs";
import path from "path";

export function pageHtml(main) {
  const dir = path.join(process.cwd(), "content/shell");
  const prefix = fs.readFileSync(path.join(dir, "prefix.html"), "utf8");
  const suffix = fs.readFileSync(path.join(dir, "suffix.html"), "utf8");
  return prefix + main + suffix;
}
