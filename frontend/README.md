# Frontend Directory Notice

The frontend has been moved to the root directory for better Vercel compatibility.

## Current Structure

The Next.js application is now in the root directory:
- `/src/pages/` - Next.js pages
- `/src/components/` - React components  
- `/src/styles/` - CSS files
- `/package.json` - Dependencies in root
- `/next.config.js` - Next.js config in root

## Development Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

This change was made to ensure proper Vercel deployment and Next.js detection.
