# MLCC Admin

Next.js application configured for Webflow Cloud deployment.

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

**Note:** In development, the app runs from the root path (`/`). The `/admin` basePath is only applied in production builds for Webflow Cloud deployment.

### Local Preview (Webflow Cloud Simulation)

Test your app locally in an environment that simulates Webflow Cloud:

```bash
npm run preview
```

### Build

Build the application for production:

```bash
npm run build
```

## Deployment to Webflow Cloud

1. Authenticate with Webflow:
   ```bash
   webflow auth login
   ```

2. Deploy using the Webflow CLI:
   ```bash
   webflow cloud deploy
   ```

The app is configured with mount path `/admin`. Make sure to set the same mount path in your Webflow Cloud environment settings.

## Project Structure

- `/app` - Next.js App Router pages and layouts
- `/app/page.tsx` - Home page (Dashboard)
- `/app/neighbors/page.tsx` - Neighbors page
- `/app/members/page.tsx` - Members page
- `/app/routes/page.tsx` - Routes page
- `/app/businesses/page.tsx` - Businesses page

## Configuration Files

- `next.config.ts` - Next.js configuration with basePath and assetPrefix
- `open-next.config.ts` - OpenNext Cloudflare configuration
- `wrangler.jsonc` - Wrangler configuration for local testing
- `webflow.json` - Webflow framework configuration
- `cloudflare-env.d.ts` - TypeScript definitions for Cloudflare environment

