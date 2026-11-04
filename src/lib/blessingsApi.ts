import type { SupabaseClient } from '@supabase/supabase-js';
import type { Blessing } from '../types/wedding';

type Row = { id: string; guest_name: string; message: string; side: string | null; created_at: string };

export const DEFAULT_SUPABASE_URL = 'https://c--a2949c9b-c36f-4069-84c1-2379d383a02a-prod.lovable.cloud';
export const DEFAULT_SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_lpQ30dRUdpwdyrSbeacNIA_dEZYUJEl';

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

export const SEEDED_FAKE_NAMES = new Set([
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

export const isRealBlessing = (r: Row): boolean => {
  const name = (r.guest_name || '').trim().toLowerCase();
  const msg = (r.message || '').trim().toLowerCase();
  if (SEEDED_FAKE_NAMES.has(name) || name.includes('rameshwar')) return false;
  return !(
    name.includes('bot') ||
    name.includes('playwright') ||
    name.includes('probe') ||
    name.includes('verification') ||
    name.includes('test') ||
    name.includes('sync') ||
    msg.includes('playwright') ||
    msg.includes('probe') ||
    msg.includes('test') ||
    msg.includes('sync test')
  );
};

export async function fetchBlessings(): Promise<Blessing[]> {
  try {
    const db = await getDb();
    if (db) {
      const { data, error } = await db
        .from('blessings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      if (!error && data) {
        return (data as Row[]).filter(isRealBlessing).map(toBlessing);
      }
    }
  } catch (err) {
    console.warn('Supabase JS fetchBlessings error, falling back to direct REST:', err);
  }

  // Resilient Direct REST fallback with project credentials
  try {
    const url = `${DEFAULT_SUPABASE_URL}/rest/v1/blessings?select=*&order=created_at.desc&limit=100`;
    const res = await fetch(url, {
      headers: {
        apikey: DEFAULT_SUPABASE_PUBLISHABLE_KEY,
        Authorization: `Bearer ${DEFAULT_SUPABASE_PUBLISHABLE_KEY}`,
      },
    });
    if (res.ok) {
      const data: Row[] = await res.json();
      return (data || []).filter(isRealBlessing).map(toBlessing);
    }
  } catch (err) {
    console.warn('Direct REST fetchBlessings error:', err);
  }

  return [];
}

export async function postBlessing(name: string, message: string): Promise<Blessing> {
  const cleanName = name.slice(0, 80);
  const cleanMessage = message.slice(0, 500);

  // 1. Try Supabase JS client
  try {
    const db = await getDb();
    if (db) {
      const { data, error } = await db
        .from('blessings')
        .insert({ guest_name: cleanName, message: cleanMessage })
        .select()
        .single();
      if (!error && data) {
        return toBlessing(data as Row);
      }
    }
  } catch (err) {
    console.warn('Supabase JS postBlessing error, trying direct REST:', err);
  }

  // 2. High-reliability direct REST call
  const url = `${DEFAULT_SUPABASE_URL}/rest/v1/blessings`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: DEFAULT_SUPABASE_PUBLISHABLE_KEY,
      Authorization: `Bearer ${DEFAULT_SUPABASE_PUBLISHABLE_KEY}`,
      Prefer: 'return=representation',
    },
    body: JSON.stringify({ guest_name: cleanName, message: cleanMessage }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`Failed to post blessing (${res.status}): ${errText}`);
  }

  const rows = await res.json();
  const row = Array.isArray(rows) ? rows[0] : rows;
  return toBlessing(row as Row);
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
