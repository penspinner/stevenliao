# My personal site

This project houses my personal site. It is a monorepo with a Remix app and a Next app that renders the same pages. The pages, components, and utilities are shared through packages. Note that this project is overengineered for learning purposes.

- To check out the Remix version, visit https://stevenliao.vercel.app/.
- To check out the Next version, visit https://stevenliao-next.vercel.app/.

## Development

1. Build the package in `personal-site` and watch for changes:

   ```
   pnpm --filter personal-site watch
   ```

2. Start the development server for the app you're working on. For example, to start the Remix server, run:

   ```
   pnpm --filter app-remix dev
   ```

3. Visit the url that is logged to the console from the development server.
