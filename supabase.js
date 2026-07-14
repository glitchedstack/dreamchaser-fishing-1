supabase.js.txt
const SUPABASE_URL = "https://trlytqrdjmvbihntvieq.supabase.co/rest/v1/";

const SUPABASE_KEY = "sb_publishable_Du6X969aLd1s3oB6kOM6Gw_qT0gdU2z ";

const supabaseClient = supabase.createClient(
SUPABASE_URL,
SUPABASE_KEY
);

console.log("supabase connected");