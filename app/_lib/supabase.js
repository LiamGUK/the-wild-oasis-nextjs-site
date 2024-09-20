// JS file to include logic to connect to supabase DB to Next.js app
import { createClient } from "@supabase/supabase-js";

// Use createClient method from Supabase to connect to remote DB from app - pass in project URL which is listed in Database settings on platform - Store URL to env variable in .env.local file
// Variables stored to env.local files will not leak to client so store secure values inside env file
// For the API key use the service_role secret key instead to allow some endpoints to override user role protected routes - allows access to cabins info which is protected by authenticated users - using secret key can bypass this
export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);
