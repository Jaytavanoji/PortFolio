# Dev Server Restart Rule

Always automatically clear the Next.js cache and restart the development server (`npm run dev` in daemon mode) whenever code changes are made. Do not wait for the user to request a server restart. This ensures that stale build chunks do not cause 404 errors during client navigation.
