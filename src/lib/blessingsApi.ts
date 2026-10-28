import type { SupabaseClient } from '@supabase/supabase-js';
import type { Blessing } from '../types/wedding';

type Row = { id: string; guest_name: string; message: string; side: string | null; created_at: string };

// The database client is loaded lazily so that a missing or misconfigured
// backend can never crash the whole invitation page — the wall falls back
// to its seeded blessings and posting shows a friendly retry message.
let dbPromise: Promise<SupabaseClient<any> | null> | null = null;

export function getDb(): Promise<SupabaseClient<any> | null> {
  if (!dbPromise) {
    dbPromise = import('../integrations/supabase/client')
      .then((m) => m.supabase as SupabaseClient<any>)
      .catch(() => null);
  }
  return dbPromise;
}

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

export const toBlessing = (r: Row): Blessing => ({
  id: r.id,
  name: r.guest_name,
  relation: r.side ?? 'Guest',
  message: r.message,
  timestamp: fmt(r.created_at),
});

const SEEDED_FAKE_NAMES = new Set([
  'rajmata shanti devi (naniji, ballia)',
  'mamaji arun kumar singh & family (ballia)',
  'chacha ramesh singh & chachi sunita (varanasi)',
  'dadi vimla devi (maheshwar, mp)',
  'tau deen dayal & tauji family (ballia)',
  'bua sushma & phuphaji (bhopal, mp)',
  'cousins rohit, priya & aarav (mumbai)',
  'mausi kavita & mausaji (lucknow)',
  'rameshwar singh & family',
  'rameshwar singh',
  'test check bot'
]);

const isRealBlessing = (r: Row): boolean => {
  const name = (r.guest_name || '').trim().toLowerCase();
  const msg = (r.message || '').trim().toLowerCase();
  if (SEEDED_FAKE_NAMES.has(name) || name.includes('rameshwar')) return false;
  return !(name.includes('bot') || name.includes('playwright') || msg.includes('playwright') || (name.includes('test') && msg.includes('test')));
};

export async function fetchBlessings(): Promise<Blessing[]> {
  const db = await getDb();
  if (!db) return [];
  const { data, error } = await db
    .from('blessings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data as Row[]).filter(isRealBlessing).map(toBlessing);
}

export async function postBlessing(name: string, message: string): Promise<Blessing> {
  const db = await getDb();
  if (!db) throw new Error('Database unavailable');
  const { data, error } = await db
    .from('blessings')
    .insert({ guest_name: name.slice(0, 80), message: message.slice(0, 500) })
    .select()
    .single();
  if (error) throw error;
  return toBlessing(data as Row);
}

export async function subscribeBlessings(
  onInsert: (b: Blessing) => void
): Promise<() => void> {
  const db = await getDb();
  if (!db) return () => {};
  const channel = db
    .channel(`blessings-${Math.random().toString(36).slice(2)}`)
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blessings' }, (payload: any) => {
      const row = payload.new as Row;
      if (isRealBlessing(row)) {
        onInsert(toBlessing(row));
      }
    })
    .subscribe();
  return () => {
    db.removeChannel(channel);
  };
}
