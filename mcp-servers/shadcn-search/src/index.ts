import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
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
    } else {
        console.error("blocks-db.json not found. Run generation script.");
    }
} catch (e) {
    console.error("Error loading DB", e);
}

// Initialize Fuse
const fuse = new Fuse(blocks, {
    keys: ["description", "category", "id", "tags"],
    threshold: 0.4,
});

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

        const results = fuse.search(query).slice(0, limit);

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
