// Funciones compartidas de sesión / login / roles.
// Se usa en index.html, account.html y admin.html

async function dwGetSession(){
  const { data: { session } } = await supabaseClient.auth.getSession();
  return session;
}

async function dwGetProfile(){
  const session = await dwGetSession();
  if (!session) return null;
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('id, email, role')
    .eq('id', session.user.id)
    .single();
  if (error) { console.warn('No se pudo leer el perfil', error); return null; }
  return data;
}

async function dwSignUp(email, password){
  return await supabaseClient.auth.signUp({ email, password });
}

async function dwSignIn(email, password){
  return await supabaseClient.auth.signInWithPassword({ email, password });
}

async function dwSignOut(){
  await supabaseClient.auth.signOut();
}

// Actualiza el link de cuenta en el header de cualquier página que lo tenga
async function dwRenderAccountLink(){
  const link = document.getElementById('accountLink');
  const label = document.getElementById('accountLabel');
  const adminLink = document.getElementById('adminLink');
  if (!link || !label) return;

  const profile = await dwGetProfile();
  if (!profile){
    label.textContent = 'Ingresar';
    link.href = 'account.html';
    if (adminLink) adminLink.style.display = 'none';
    return;
  }
  label.textContent = profile.email ? profile.email.split('@')[0] : 'Mi cuenta';
  link.href = 'account.html';
  if (adminLink) adminLink.style.display = profile.role === 'admin' ? '' : 'none';
}

document.addEventListener('DOMContentLoaded', dwRenderAccountLink);
