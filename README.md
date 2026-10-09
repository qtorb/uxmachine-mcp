# UXMachine for coding agents

UXMachine measures a web page in a real browser and returns verifiable observations, each with its evidence and its limits. It opens the address on desktop (1280×800) and mobile (390×844) and follows the site's own links for up to 11 pages. For each observation it says what was observed, on which page and at which width, and how to check it. It also says what it could not check and why. It can compare a measurement with an earlier one of the same site.

It does not judge design, copy or brand, does not fill in forms, does not enter password-protected areas and does not replace an audit or testing with people. Only measure sites you own or may review.

This repository only holds the configuration to connect the UXMachine MCP server (`https://uxmachine.app/mcp`). The first time you use it, a UXMachine window opens so you can sign in or create an account and authorize access. Each measurement uses 1 credit from your UXMachine account.

## Gemini CLI

```
gemini extensions install https://github.com/qtorb/uxmachine-mcp
```

## Antigravity

Add this to `~/.gemini/config/mcp_config.json` (or `.agents/mcp_config.json` in a project):

```json
{
  "mcpServers": {
    "uxmachine": {
      "serverUrl": "https://uxmachine.app/mcp"
    }
  }
}
```

## Cursor and other MCP clients

Use the server URL `https://uxmachine.app/mcp`, or the `mcp.json` in this repository.

## Guides

Step-by-step guides for Claude, ChatGPT, Claude Code, Lovable and more: https://uxmachine.app/en/agents?via=github

Privacy: https://uxmachine.app/en/privacy · Terms: https://uxmachine.app/en/legal · Contact: https://uxmachine.app/en/contact
