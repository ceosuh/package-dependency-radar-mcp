# 📦 Package Version, License & Dependency Radar (MCP Server)

An official Model Context Protocol (MCP) server that verifies **real-time package versions, deprecation warnings, licenses, runtime requirements, and core dependencies** across **NPM (JavaScript/TypeScript), PyPI (Python), and Crates.io (Rust)**.

Powered by Apify (`ceosuh/package-dependency-radar-mcp`) and built to eliminate outdated package hallucinations in **Cursor, Windsurf, Claude Desktop, and Autonomous Coding Agents**.

## 🚀 Quick Start (Claude Desktop / Cursor)

Add the following configuration to your `claude_desktop_config.json` or Cursor MCP settings:

```json
{
  "mcpServers": {
    "package-dependency-radar-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "@apify/actors-mcp-server",
        "--actors",
        "ceosuh/package-dependency-radar-mcp"
      ],
      "env": {
        "APIFY_TOKEN": "your-apify-api-token"
      }
    }
  }
}
```

### Alternative: Run Local Bridge Directly

```bash
export APIFY_TOKEN="your-apify-api-token"
node index.js
```

## 🛠️ Tool Provided

* **`verify_package_dependencies`**: Queries NPM, PyPI, and Crates.io simultaneously to check latest stable versions, licenses, deprecation notices, and install commands.

## 📄 License

MIT License
