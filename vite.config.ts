import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

const DEFAULT_SUPABASE_URL = 'https://c--a2949c9b-c36f-4069-84c1-2379d383a02a-prod.lovable.cloud';
const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_lpQ30dRUdpwdyrSbeacNIA_dEZYUJEl';

/**
 * Ensures backend environment variables are always present for the live site,
 * Lovable preview surfaces, and local builds without ever breaking preview updates.
 */
function ensureSupabaseEnv(): Plugin {
  return {
    name: 'ensure-supabase-env',
    config(_config, env) {
      if (process.env.VITEST || env.mode === 'test') {
        return;
      }
      const loaded = loadEnv(env.mode, process.cwd(), 'VITE_');
      if (!loaded.VITE_SUPABASE_URL && !process.env.VITE_SUPABASE_URL) {
        process.env.VITE_SUPABASE_URL = DEFAULT_SUPABASE_URL;
      }
      if (!loaded.VITE_SUPABASE_PUBLISHABLE_KEY && !process.env.VITE_SUPABASE_PUBLISHABLE_KEY) {
        process.env.VITE_SUPABASE_PUBLISHABLE_KEY = DEFAULT_SUPABASE_PUBLISHABLE_KEY;
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
  const supabaseKey = env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_PUBLISHABLE_KEY;

  return {
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(supabaseUrl),
      'import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY': JSON.stringify(supabaseKey),
    },
    plugins: [ensureSupabaseEnv(), react()],
    server: {
      port: 5173,
      host: true
    }
  };
});
