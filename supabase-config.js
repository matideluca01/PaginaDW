// Configuración de conexión a Supabase (Base de datos + Login)
// Estas claves son públicas por diseño (clave "anon"): la seguridad real
// la dan las políticas de acceso (RLS) configuradas en la base de datos.
const SUPABASE_URL = "https://znwxbthiyjgzrakmjbeu.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_DVO-piq1b1Tfid84_Pr0OA_0eTtVqpB";

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
