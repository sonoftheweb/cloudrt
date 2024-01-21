# Cloudrt

Fuck infrastructure as code! We want drag and drop interfaces with the right terminologies and easy to understand interface for the cloud with code integration and AI.

## Setup

Clone repo and run 

```bash
# bun
bun install
```

## Development Server

Start the development server:

```bash
# bun
bun run tauri dev
```

You may use npm or yarn if that suits your needs but make sure to update `src-tauri/tauri.conf.json` file to use npm or yarn in it's build processes.

# Resources
- https://nuxt.com/ - non ssr app.
- https://ui.nuxt.com/ - Nuxt Tailwind UI integration with components like vuetify
- https://pinia.vuejs.org/ - State management
- https://tauri.app/ builds the view (web view) and handles backend commands (low level)
