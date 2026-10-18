# Installing UXMachine in Cline

UXMachine is a remote MCP server. There is nothing to install locally.

1. Add this server to Cline's MCP settings:

```json
{
  "mcpServers": {
    "uxmachine": {
      "type": "streamableHttp",
      "url": "https://uxmachine.app/mcp"
    }
  }
}
```

2. The first time it is used, a UXMachine window opens so the user can authorize access with their account. If they do not have an account, they can create one there.
3. To check that it works, ask: "Measure the home page of https://example.com with UXMachine."
