import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import Fuse from "fuse.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "../data/blocks-db.json");

// Interface for Block Data
interface Block {
    id: string;
    category: string;
    description: string;
    installCommand: string;
    tags: string[];
}

// Load DB
let blocks: Block[] = [];
try {
    if (fs.existsSync(DB_PATH)) {
        blocks = JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
        console.error(`[shadcn-search] Loaded ${blocks.length} blocks from database`);
    } else {
        console.error("blocks-db.json not found. Run generation script.");
    }
} catch (e) {
    console.error("Error loading DB", e);
}

// Initialize Fuse
const fuse = new Fuse(blocks, {
    keys: [
        { name: "tags", weight: 2.0 },        // Prioritize tags (highest weight)
        { name: "category", weight: 1.5 },    // Then category
        { name: "id", weight: 1.2 },          // Then id
        { name: "description", weight: 0.8 }  // Description has lower priority
    ],
    threshold: 0.5, // Balanced threshold for good matches
    includeScore: true,
    ignoreLocation: true, // Don't penalize matches based on position in text
    minMatchCharLength: 2, // Minimum character length for matches
});

console.error(`[shadcn-search] Fuse initialized with ${blocks.length} items`);

const server = new Server(
    { name: "shadcn-search", version: "1.0.0" },
    { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "search_components",
                description: "Search for Shadcn/UI blocks to build web pages. Returns install commands.",
                inputSchema: {
                    type: "object",
                    properties: {
                        query: {
                            type: "string",
                            description: "Descriptive search term (e.g. 'hero with email signup', 'pricing table')"
                        },
                        limit: { type: "number", description: "Max results (default 5)" }
                    },
                    required: ["query"],
                },
            },
        ],
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === "search_components") {
        const query = String(request.params.arguments?.query);
        const limit = Number(request.params.arguments?.limit) || 5;

        console.error(`[shadcn-search] Searching for: "${query}" with limit: ${limit}`);

        const results = fuse.search(query).slice(0, limit);

        console.error(`[shadcn-search] Found ${results.length} results`);

        if (results.length === 0) {
            return { content: [{ type: "text", text: "No components found matching that query." }] };
        }

        const formatted = results.map(r => {
            const b = r.item;
            return `### ${b.id} (${b.category})\nDesc: ${b.description}\nCommand: \`${b.installCommand}\`\n`;
        }).join("\n---\n");

        return {
            content: [{ type: "text", text: formatted }],
        };
    }
    throw new Error("Tool not found");
});

const transport = new StdioServerTransport();
await server.connect(transport);
