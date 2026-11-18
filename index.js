#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

const APIFY_TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = "ceosuh~package-dependency-radar-mcp";

const server = new Server(
  { name: "package-dependency-radar-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "verify_package_dependencies",
      description: "Verify latest stable package versions, deprecation warnings, licenses, and dependencies across NPM (JS/TS), PyPI (Python), and Crates.io (Rust).",
      inputSchema: {
        type: "object",
        properties: {
          packages: {
            type: "array",
            items: { type: "string" },
            description: "Package names to inspect (e.g., ['@modelcontextprotocol/sdk', 'openai', 'pydantic', 'serde'])",
            default: ["@modelcontextprotocol/sdk", "openai", "pydantic", "serde"]
          },
          ecosystems: {
            type: "array",
            items: { type: "string" },
            description: "Registries to query ('npm', 'pypi', 'crates')",
            default: ["npm", "pypi", "crates"]
          }
        },
        required: ["packages"]
      }
    }
  ]
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name !== "verify_package_dependencies") {
    throw new Error(`Unknown tool: ${request.params.name}`);
  }
  if (!APIFY_TOKEN) {
    throw new Error("Missing APIFY_TOKEN environment variable. Get yours at https://console.apify.com/settings/integrations");
  }

  const response = await fetch(
    `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items?token=${APIFY_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request.params.arguments || {})
    }
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Apify API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  return {
    content: [{ type: "text", text: JSON.stringify(data, null, 2) }]
  };
});

const transport = new StdioServerTransport();
await server.connect(transport);
