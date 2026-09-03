import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env?.VITE_SUPABASE_URL?.trim() || '';
const rawKey = import.meta.env?.VITE_SUPABASE_ANON_KEY?.trim() || '';

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  !rawUrl.includes('placeholder') &&
  !rawKey.includes('placeholder') &&
  rawUrl.startsWith('http')
);

let supabaseClient = null;

if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(rawUrl, rawKey, {
      realtime: {
        params: {
          eventsPerSecond: 10,
        },
      },
    });
  } catch (err) {
    console.warn('Gagal inisialisasi Supabase client:', err);
  }
}

// Fallback dummy client jika Supabase belum dikonfigurasi / offline
if (!supabaseClient) {
  const dummyChain = {
    select: () => dummyChain,
    insert: () => Promise.resolve({ data: null, error: new Error('Supabase belum dikonfigurasi') }),
    delete: () => dummyChain,
    update: () => dummyChain,
    order: () => Promise.resolve({ data: [], error: new Error('Supabase belum dikonfigurasi') }),
    eq: () => dummyChain,
    then: (resolve) => resolve({ data: [], error: null }),
  };

  supabaseClient = {
    from: () => dummyChain,
    channel: () => ({
      on: () => ({
        subscribe: (cb) => {
          if (cb) cb('CLOSED');
          return { unsubscribe: () => {} };
        },
      }),
      subscribe: (cb) => {
        if (cb) cb('CLOSED');
        return { unsubscribe: () => {} };
      },
    }),
    removeChannel: () => {},
  };
}

export const supabase = supabaseClient;

