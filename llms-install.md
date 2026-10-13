# Installing UXMachine in Cline

UXMachine is a remote MCP server. There is nothing to install on your machine.

1. Add this to your Cline MCP settings (`cline_mcp_settings.json`):

   ```json
   {
     "mcpServers": {
       "uxmachine": {
         "type": "streamableHttp",
         "url": "https://uxmachine.app/mcp",
         "disabled": false,
         "autoApprove": []
       }
     }
   }
   ```

2. Authorize access. Cline opens a UXMachine window in your browser: sign in (or create an account) and click “Authorize”. If you use the Cline CLI, run `cline mcp` and choose “Authorize OAuth” for uxmachine.
3. Ask Cline: “Measure https://your-site.com with UXMachine and tell me what was observed and what could not be checked.” A measurement takes a few minutes.
