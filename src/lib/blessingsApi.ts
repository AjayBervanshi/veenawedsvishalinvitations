import { supabase } from '../integrations/supabase/client';
import type { Blessing } from '../types/wedding';

export const db = supabase;

type Row = { id: string; guest_name: string; message: string; side: string | null; created_at: string };

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

export const toBlessing = (r: Row): Blessing => ({
  id: r.id,
  name: r.guest_name,
  relation: r.side ?? 'Guest',
  message: r.message,
  timestamp: fmt(r.created_at),
});

export async function fetchBlessings(): Promise<Blessing[]> {
  const { data, error } = await db
    .from('blessings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100);
  if (error) throw error;
  return (data as Row[]).map(toBlessing);
}

export async function postBlessing(name: string, message: string): Promise<Blessing> {
  const { data, error } = await db
    .from('blessings')
    .insert({ guest_name: name.slice(0, 80), message: message.slice(0, 500) })
    .select()
    .single();
  if (error) throw error;
  return toBlessing(data as Row);
}
