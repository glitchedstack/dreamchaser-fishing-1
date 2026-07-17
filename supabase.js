const SUPABASE_URL = "https://pnuvqgyxiuecdeywswqn.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBudXZxZ3l4aXVlY2RleXdzd3FuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQyMzE5ODksImV4cCI6MjA5OTgwNzk4OX0.8LmrWskNdFSWfH5f1M-DIS5Fbd4tfIqms-fA5w6tPrU";

window.db = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Database connected:", window.db);
