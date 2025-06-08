
# MCP Fetch Weather

A simple and functional implementation of a [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol/sdk) server, using the official SDK.

This project exposes a tool (`fetch-weather`) that allows you to obtain the current weather of a city, ideal as a basic example to learn about the protocol and communication between LLMs and custom tools.

---

## 🚀 Features

- ✅ Minimalist MCP Server
- 🌤 Fetch-weather tool with external API consumption (Open-Meteo)
- 📦 Using `@modelcontextprotocol/sdk` and `zod`

---

## 🛠 Requirements

- Node.js 18 or higher
- `pnpm`, `npm` or `yarn` 

---

## 🔧 Installation

```bash
git clone git@github.com:IsseiSuar/mcp-fetch-weather.git
cd mcp-fetch-weather
pnpm install  # or npm install
