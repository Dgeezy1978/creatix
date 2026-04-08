# Creatix Studio

A minimal Vite-powered web app scaffold.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start dev server:
   ```bash
   npm run dev
   ```

## Build

```bash
npm run build
```

## Preview

```bash
npm run preview
```

## Deploy

This repo is configured for GitHub Pages deployment via GitHub Actions.

- On each push to `main`, the workflow will build the app and publish the `dist/` output.
- No manual GitHub Pages branch configuration is needed.

If you want to publish locally instead, you can still run:

```bash
npm run deploy
```
