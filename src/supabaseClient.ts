import { createClient } from '@supabase/supabase-js';

// Vervang deze waardes met jouw eigen URL en Anon Key uit Stap 3
const supabaseUrl = 'https://xgjsfagzmhlbnbatogwx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhnanNmYWd6bWhsYm5iYXRvZ3d4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUzNTAyMzAsImV4cCI6MjEwMDkyNjIzMH0.aCuVuJx7NX4R2d3dP-EqhvdXpTFYgHYnMqEeHc_PKAU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);