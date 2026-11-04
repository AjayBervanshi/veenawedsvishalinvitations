import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Safeguard: the blessing wall / RSVP page cannot work without the backend
 * address baked into the bundle. If these variables are missing, the published
 * site renders but posting silently fails — so refuse to build instead.
 */
function requireSupabaseEnv(): Plugin {
  return {
    name: 'require-supabase-env',
    config(_config, env) {
      // Do not block unit test runners (vitest)
      if (process.env.VITEST || env.mode === 'test') {
        return;
      }
      const loaded = loadEnv(env.mode, process.cwd(), 'VITE_');
      const missing = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY'].filter(
        (k) => !loaded[k] && !process.env[k]
      );
      if (missing.length > 0) {
        throw new Error(
          `[build guard] Missing ${missing.join(', ')} in .env — the live site would render but the blessing wall could never post. Restore .env before building.`
        );
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [requireSupabaseEnv(), react()],
  server: {
    port: 5173,
    host: true
  }
}));
