# My personal site

This project houses my personal site. It is a monorepo with a React Router app and a Next app that renders the same pages. The pages, components, and utilities are shared through packages. Note that this project is overengineered for learning purposes.

- To check out the React Router version, visit https://stevenliao.vercel.app/.
- To check out the Next version, visit https://stevenliao-next.vercel.app/.

## Development

```sh
bun install            # install dependencies
bun dev:next           # start Next.js dev server + watch package build
bun dev:react-router   # start React Router dev server + watch package build
bun run build          # build all packages and apps
bun check:lint         # lint
bun check:fmt          # format check
bun fmt                # format write
```
