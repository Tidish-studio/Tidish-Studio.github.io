import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";

const candidatePath = process.argv[2];
if (!candidatePath) {
  console.error("Usage: node diff-spells.mjs <new-spell-file.json>");
  process.exit(1);
}

const loadSpells = (path) => {
  const spells = JSON.parse(readFileSync(path, "utf8"));
  if (!Array.isArray(spells)) throw new Error(`${path} is not a JSON array`);
  return spells;
};

const spellKey = (spell) => `${spell.name}|${spell.source}`;

const countBySource = (spells) => {
  const counts = {};
  for (const spell of spells) counts[spell.source] = (counts[spell.source] ?? 0) + 1;
  return counts;
};

const downloadsDir = "public/downloads";
const existingFiles = [downloadsDir, join(downloadsDir, "test")]
  .filter(existsSync)
  .flatMap((dir) =>
    readdirSync(dir)
      .filter((name) => name.endsWith(".json"))
      .map((name) => join(dir, name)),
  );

const candidate = loadSpells(candidatePath);
const candidateKeys = new Set(candidate.map(spellKey));
console.log(`${candidatePath}: ${candidate.length} spells`);
console.log(`  by source: ${JSON.stringify(countBySource(candidate))}`);

const comparisons = existingFiles.map((path) => {
  const existing = loadSpells(path);
  const existingKeys = new Set(existing.map(spellKey));
  return {
    path,
    count: existing.length,
    shared: existing.filter((spell) => candidateKeys.has(spellKey(spell))).length,
    added: candidate.filter((spell) => !existingKeys.has(spellKey(spell))),
    removed: existing.filter((spell) => !candidateKeys.has(spellKey(spell))),
  };
});

comparisons.sort((a, b) => b.shared - a.shared);
for (const { path, count, shared, added, removed } of comparisons) {
  console.log(`\nvs ${path} (${count} spells): ${shared} shared`);
  console.log(`  added ${added.length}: ${JSON.stringify(countBySource(added))}`);
  console.log(`  removed ${removed.length}: ${JSON.stringify(countBySource(removed))}`);
}
