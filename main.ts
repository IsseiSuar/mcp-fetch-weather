import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// 1. Create the server
// The main interface with the MCP. Handles the connection and communication between the client and server.

const server = new McpServer({
    name: "MyDemo",
    version: "1.0.0",
})

// 2. Define the tools.
// The tools allow to the LLM to perform actions througth the server.

server.tool(
    'fetch-weather', // the name of the tool
    'tool to fetch the weather for a given city', // description of the tool
    {
        city: z.string().describe("The city to fetch the weather for"), // input schema
    },
    async ({ city }) => {
        const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=en&format=json`);
        const data = await response.json();

        if (data.results.length === 0) {
            return {
                content: [
                    {
                        type: "text",
                        text: `Weather for the city ${city} not found.`
                    }
                ]
            }
        }

        const { latitude, longitude } = data.results[0];

        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current=temperature_2m,precipitation,is_day,rain&forecast_days=1`);

        const weatherData = await weatherResponse.json();

        return {
            content: [
                {
                    type: "text",
                    text: JSON.stringify(weatherData, null, 2)
                }
            ]
        }
    }
)
// 3. Hear the connections of the client.
const transport = new StdioServerTransport()
await server.connect(transport);
