// ============================================================
// SUPABASE CLIENT CONFIGURATION
// Phase 2: Real backend connection
// Replace with your actual Supabase project credentials
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

// ============================================================
// CONFIGURATION — Replace these with your Supabase project values
// Get these from: https://supabase.com/dashboard/project/_/settings/api
// ============================================================
const SUPABASE_URL = 'YOUR_SUPABASE_URL'; // e.g., https://xyzcompany.supabase.co
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY'; // public anon key (safe for frontend)

// Validate configuration
if (SUPABASE_URL === 'YOUR_SUPABASE_URL' || SUPABASE_ANON_KEY === 'YOUR_SUPABASE_ANON_KEY') {
  console.warn('⚠️ Supabase not configured. Using mock mode. Update backend/js/supabase.js with your credentials.');
}

// Create Supabase client
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// ============================================================
// Helper: Check if Supabase is properly configured
// ============================================================
export function isSupabaseConfigured() {
  return SUPABASE_URL !== 'YOUR_SUPABASE_URL' && 
         SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY' &&
         SUPABASE_URL.includes('supabase.co');
}

// ============================================================
// Helper: Get current session
// ============================================================
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Session error:', error);
    return null;
  }
  return session;
}

// ============================================================
// Helper: Get current user
// ============================================================
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('User error:', error);
    return null;
  }
  return user;
}

// ============================================================
// Helper: Check if user is admin
// ============================================================
export async function isAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;
  
  const { data, error } = await supabase
    .from('admin_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  return !error && data && ['super_admin', 'admin'].includes(data.role);
}
