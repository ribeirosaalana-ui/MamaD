// ============================================================
// MamaFood — Autenticação com Google
// ============================================================

var GOOGLE_CLIENT_ID = '947344893783-0ifjnair5kctsf5sm42m60tall2d3jcg.apps.googleusercontent.com';

// Inicializa o Google Sign-In quando a página carregar
function initGoogleSignIn() {
  if (typeof google === 'undefined' || !google.accounts) {
    console.warn('Google Sign-In API não carregada');
    return;
  }

  google.accounts.id.initialize({
    client_id: GOOGLE_CLIENT_ID,
    callback: handleGoogleCallback,
    auto_select: false,
    cancel_on_tap_outside: true
  });
}

// Callback quando o usuário faz login com Google
function handleGoogleCallback(response) {
  try {
    // Decodifica o JWT token do Google
    var payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    var userData = {
      email: payload.email.toLowerCase(),
      nome: payload.name,
      foto: payload.picture,
      googleId: payload.sub,
      celular: '', // Usuário pode adicionar depois
      loginViaGoogle: true,
      cadastradoEm: new Date().toISOString()
    };
    
    // Busca se usuário já existe
    var usuarios = JSON.parse(localStorage.getItem('mf_usuarios') || '[]');
    var usuarioExistente = null;
    var indiceUsuario = -1;
    
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === userData.email) {
        usuarioExistente = usuarios[i];
        indiceUsuario = i;
        break;
      }
    }
    
    if (usuarioExistente) {
      // Atualiza foto e nome do Google, mas mantém outros dados
      usuarios[indiceUsuario].foto = userData.foto;
      usuarios[indiceUsuario].nome = userData.nome;
      usuarios[indiceUsuario].googleId = userData.googleId;
      userData = usuarios[indiceUsuario]; // Usa dados completos existentes
    } else {
      // Novo usuário
      usuarios.push(userData);
    }
    
    localStorage.setItem('mf_usuarios', JSON.stringify(usuarios));
    localStorage.setItem('mf_sessao_ativa', JSON.stringify(userData));
    localStorage.setItem('mf_parceiro', JSON.stringify(userData));
    
    // Inicia pedidos vazios se não existir
    if (!localStorage.getItem('mf_pedidos')) {
      localStorage.setItem('mf_pedidos', JSON.stringify([]));
    }
    
    // Se for novo cadastro via Google, marca flag
    if (!usuarioExistente) {
      localStorage.setItem('mf_novo_cadastro', '1');
    }
    
    // Mostra mensagem de sucesso
    if (typeof showToast === 'function') {
      showToast('✅ Login com Google realizado!', 'ok');
    }
    
    // Redireciona para o painel
    setTimeout(function() {
      window.location.href = 'Tela2.html';
    }, 800);
    
  } catch (error) {
    console.error('Erro ao processar login do Google:', error);
    if (typeof showToast === 'function') {
      showToast('❌ Erro ao fazer login com Google', 'err');
    }
  }
}

// Função para abrir popup de login do Google
function abrirLoginGoogle() {
  if (typeof google === 'undefined' || !google.accounts) {
    if (typeof showToast === 'function') {
      showToast('⚠️ Carregando Google Sign-In...', 'err');
    }
    return;
  }
  
  google.accounts.id.prompt();
}
