// The only file that talks to Supabase. The library is self-hosted (vendor/) and loaded on demand,
// so a student who never signs in never downloads it.
import { supabasePublishableKey, supabaseUrl } from './cloud-config.js';

export const cloudConfigured = Boolean(supabaseUrl && supabasePublishableKey);
export const authStorageKey = 'study-circuit:auth';
const libraryUrl = new URL('./vendor/supabase-2.118.0.js', import.meta.url).href;

let clientPromise = null;

function loadLibrary() {
  if (globalThis.supabase?.createClient) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = libraryUrl;
    script.onload = () => (globalThis.supabase?.createClient ? resolve() : reject(new Error('Sign-in could not load. Check your connection, or any content blocker, and try again.')));
    script.onerror = () => reject(new Error('Sign-in could not load. Check your connection, or any content blocker, and try again.'));
    document.head.append(script);
  });
}

// Resolves to the client, or rejects if the library cannot load (offline, blocked). A failed load can be retried.
export function getClient() {
  if (!cloudConfigured) return Promise.reject(new Error('Accounts are not switched on.'));
  clientPromise ??= loadLibrary()
    .then(() => globalThis.supabase.createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        flowType: 'pkce',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storageKey: authStorageKey,
      },
    }))
    .catch(error => {
      clientPromise = null;
      throw error;
    });
  return clientPromise;
}

// True when this browser already holds a session or the page was opened from an emailed link.
export function hasAuthTraces() {
  try {
    if (localStorage.getItem(authStorageKey)) return true;
  } catch { /* storage blocked */ }
  return /[?&#](code|error_description|access_token)=/.test(location.search + location.hash);
}

const friendly = {
  invalid_credentials: 'That email and password do not match.',
  email_not_confirmed: 'Confirm your email first: open the link we sent you, then sign in.',
  over_email_send_rate_limit: 'Too many emails have been sent just now. Try again in a little while.',
  over_request_rate_limit: 'Too many tries. Wait a minute and try again.',
  weak_password: 'Choose a longer or less common password.',
  same_password: 'Your new password must be different from the old one.',
  email_address_invalid: 'That email address does not look right.',
  signup_disabled: 'New accounts are switched off right now.',
  user_already_exists: 'An account with that email already exists. Sign in instead.',
  validation_failed: 'Check the email and password and try again.',
  session_not_found: 'Your sign-in has ended. Sign in again.',
  user_not_found: 'Your sign-in has ended. Sign in again.',
};

export function friendlyError(error) {
  if (!error) return '';
  if (error.code && friendly[error.code]) return friendly[error.code];
  if (error.name === 'AuthRetryableFetchError' || /failed to fetch|network|load failed/i.test(error.message ?? '')) {
    return 'Could not reach the sign-in service. Check your connection and try again.';
  }
  if (/sign-in could not load/i.test(error.message ?? '')) return error.message;
  return 'Something went wrong. Try again in a moment.';
}

// ---- Progress rows ----
export async function fetchRemote(client, userId) {
  const { data, error } = await client.from('progress').select('state, updated_at').eq('user_id', userId).maybeSingle();
  if (error) throw error;
  return data;
}

export async function saveRemote(client, userId, state) {
  const { error } = await client.from('progress').upsert({ user_id: userId, state }, { onConflict: 'user_id' });
  if (error) throw error;
}

export async function removeAccount(client) {
  const { error } = await client.rpc('delete_my_account');
  if (error) throw error;
}
