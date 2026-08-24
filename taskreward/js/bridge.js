// ============================================================
// FRONTEND-BACKEND BRIDGE
// This file decides whether to use mock or real Supabase backend
// ============================================================

import { isSupabaseConfigured } from '../backend/js/supabase.js';
import * as mockServices from './services.js';
import * as realServices from '../backend/js/services.js';

// Determine which backend to use
const useRealBackend = isSupabaseConfigured();

if (useRealBackend) {
  console.log('🚀 Using Supabase backend');
} else {
  console.log('🎭 Using mock backend (configure backend/js/supabase.js to switch)');
}

// Export the appropriate services
export const authService = useRealBackend ? realServices.authService : mockServices.authService;
export const taskService = useRealBackend ? realServices.taskService : mockServices.taskService;
export const userService = useRealBackend ? realServices.userService : mockServices.userService;
export const coinService = useRealBackend ? realServices.coinService : mockServices.coinService;
export const submissionService = useRealBackend ? realServices.submissionService : mockServices.submissionService;
export const adminService = useRealBackend ? realServices.adminService : mockServices.adminService;
export const settingsService = useRealBackend ? realServices.settingsService : mockServices.settingsService;
export const storageService = useRealBackend ? realServices.storageService : mockServices.storageService;
