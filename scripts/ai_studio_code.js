const fs = require('fs');
const path = require('path');

// CONFIG
const SKILLS_DIR = path.join(__dirname, '../.claude/skills/shadcn-ui-blocks/docs');
const OUTPUT_FILE = path.join(__dirname, '../mcp-servers/shadcn-search/data/blocks-db.json');

const scanDirectory = () => {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error(`Error: Skills directory not found at ${SKILLS_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(SKILLS_DIR).filter(f => f.endsWith('.md'));
  const db = [];

  files.forEach(file => {
    const content = fs.readFileSync(path.join(SKILLS_DIR, file), 'utf-8');
    const category = file.replace('.md', '');
    
    // Regex to extract blocks from the markdown format used in the repo
    const blockRegex = /##\s+(.*?)\n\n!\[screenshot\]\(.*?\)\n\n(.*?)\n\n\*\*Install\*\*:\s+`(.*?)`/gs;
    let match;

    while ((match = blockRegex.exec(content)) !== null) {
      const [_, name, description, command] = match;
      
      db.push({
        id: name.trim(),
        category: category,
        description: description.replace(/\n/g, ' ').trim(),
        installCommand: command.trim(),
        tags: [category, name.includes('dark') ? 'dark' : 'light', 'ui']
      });
    }
  });

  // Fallback Sample Data if extraction fails or dir is empty
  if (db.length === 0) {
    console.log("No files found or regex mismatch. Generating sample data...");
    return generateSampleData();
  }

  return db;
};

const generateSampleData = () => [
  {
    "id": "hero-18",
    "category": "hero",
    "description": "A centered hero section with a main heading, supporting text, two buttons, and a large dashboard image preview.",
    "installCommand": "pnpm dlx shadcn add @shadcnblocks/hero-18",
    "tags": ["hero", "dashboard", "centered"]
  },
  {
    "id": "pricing-02",
    "category": "pricing",
    "description": "Three column pricing table with toggle for monthly/yearly billing. Highlighted center card.",
    "installCommand": "pnpm dlx shadcn add @shadcnblocks/pricing-02",
    "tags": ["pricing", "cards", "toggle"]
  }
];

const data = scanDirectory();
// Ensure output dir exists
const outputDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
console.log(`✅ Generated blocks-db.json with ${data.length} entries at ${OUTPUT_FILE}`);