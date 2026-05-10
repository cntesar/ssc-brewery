import {PurgeCSS} from "purgecss";
import {mkdirSync, writeFileSync} from "node:fs";
import path from "node:path";

const outDir = "cleaned-css";
mkdirSync(outDir, {recursive: true});

const result = await new PurgeCSS().purge({
    content: ["./src/main/resources/templates/**/*.html"],
    css: ["./src/main/resources/static/css/*.css"],
    // safelist: ['active','show','collapse'] // add if needed
});

for (const r of result) {
    const fileName = path.basename(r.file);
    writeFileSync(path.join(outDir, fileName), r.css, "utf8");
}

console.log(`Wrote ${result.length} cleaned file(s) to ${outDir}/`);