// Dreamchaser Fishing App

alert("Dreamchaser script loaded 🎣");

const supabase = supabaseClient;

let currentUser = null;

const SUPABASE_URL = "https://glitchedstack.github.io/dreamchaser-fishing-1/";

const SUPABASE_KEY = "sb_publishable_NDLHZOKs4FcD7N22EerKgg_FPWZenpI";


const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
