// ============================================================
// shared.js — MamaFood v2
// ============================================================

// ── Proteção básica (não bloqueia thread) ─────────────────────────
(function(){
  // Não aplica proteção em dispositivos móveis
  var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                 navigator.maxTouchPoints > 1 ||
                 window.innerWidth <= 768;

  if (!isMobile) {
    document.addEventListener('contextmenu', function(e){ e.preventDefault(); });
    document.addEventListener('keydown', function(e){
      var k = e.key || '';
      if (e.keyCode === 123) { e.preventDefault(); return false; }
      if (e.ctrlKey && e.shiftKey && 'ijcIJC'.indexOf(k) !== -1) { e.preventDefault(); return false; }
      if (e.ctrlKey && 'uUsSpP'.indexOf(k) !== -1) { e.preventDefault(); return false; }
    }, true);
    document.addEventListener('selectstart', function(e){
      if (!['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) e.preventDefault();
    });
    var _s = document.createElement('style');
    _s.textContent = '*{-webkit-user-select:none!important;user-select:none!important}input,textarea,select{-webkit-user-select:text!important;user-select:text!important}';
    (document.head || document.documentElement).appendChild(_s);
    // Detecta DevTools por diferença de tamanho (só desktop)
    var _dtOpen = false;
    setInterval(function(){
      if (navigator.maxTouchPoints > 1) return; // mobile conectou teclado, ignora
      var dw = window.outerWidth  - window.innerWidth  > 250;
      var dh = window.outerHeight - window.innerHeight > 250;
      if ((dw || dh) && !_dtOpen) {
        _dtOpen = true;
        document.documentElement.innerHTML = '<html><head></head><body style="background:#111;display:flex;align-items:center;justify-content:center;height:100vh"><p style="color:#ff4444;font-family:monospace;font-size:14px">Acesso n\u00e3o autorizado.</p></body></html>';
      } else if (!dw && !dh) { _dtOpen = false; }
    }, 1500);
  }
})();


// ── .env / ADMIN_EMAILS ───────────────────────────────────────────
// Fallback hardcoded — funciona mesmo sem fetch
var ADMIN_EMAILS = ['francimarjuniorr435@gmail.com'];
var _envLoaded   = false;

function loadEnv(cb) {
  console.log('🔄 loadEnv() iniciado, _envLoaded:', _envLoaded);
  if (_envLoaded) { 
    console.log('✅ .env já carregado, ADMIN_EMAILS:', ADMIN_EMAILS);
    cb(); 
    return; 
  }
  var tried = 0;
  var paths  = ['../../.env', '../.env', '/.env', '.env'];
  function tryPath(i) {
    if (i >= paths.length) { 
      console.warn('⚠️ .env não encontrado em nenhum path, usando fallback:', ADMIN_EMAILS);
      _envLoaded = true; 
      cb(); 
      return; 
    }
    console.log('🔍 Tentando carregar:', paths[i]);
    fetch(paths[i] + '?t=' + Date.now())
      .then(function(r){ return r.ok ? r.text() : Promise.reject('not ok'); })
      .then(function(txt){
        console.log('✅ .env carregado de', paths[i], 'conteúdo:', txt.substring(0, 100));
        var m = txt.match(/^ADMIN_EMAILS\s*=\s*([^\r\n]+)/m);
        if (m) {
          ADMIN_EMAILS = m[1].trim().split(',').map(function(e){
            return e.trim().toLowerCase();
          }).filter(Boolean);
          console.log('📧 ADMIN_EMAILS extraídos:', ADMIN_EMAILS);
        }
        _envLoaded = true; cb();
      })
      .catch(function(err){ 
        console.log('❌ Falha ao carregar', paths[i], err);
        tryPath(i + 1); 
      });
  }
  tryPath(0);
}

// ── Parceiro ──────────────────────────────────────────────────────
function getParceiro(){ return JSON.parse(localStorage.getItem('mf_parceiro') || 'null'); }

function isAdmin(){
  var p = getParceiro();
  if (!p || !p.email) return false;
  return ADMIN_EMAILS.indexOf(p.email.toLowerCase()) !== -1;
}

// ── Auth guard ────────────────────────────────────────────────────
function authGuard(adminOnly, cb) {
  console.log('🚪 authGuard() iniciado, adminOnly:', adminOnly);
  var p = getParceiro();
  console.log('👤 Parceiro encontrado:', p);
  
  if (!p || !p.email || !p.nome) { 
    console.log('❌ Sem parceiro válido no localStorage, redirecionando para Tela1');
    // Limpa dados inconsistentes antes de redirecionar
    localStorage.removeItem('mf_sessao_ativa');
    localStorage.removeItem('mf_parceiro');
    
    // Previne loop infinito: só redireciona se não estiver já na Tela1
    if (window.location.pathname.indexOf('Tela1.html') === -1) {
      window.location.href = 'Tela1.html';
    }
    return; 
  }
  console.log('👤 Parceiro encontrado:', p);
  console.log('📧 Email do parceiro:', p.email);
  
  loadEnv(function(){
    console.log('🏗️ Chamando buildSidebar...');
    buildSidebar(window.location.pathname.split('/').pop());
    startClock('clock');
    
    console.log('🔐 Verificando se é admin... adminOnly=', adminOnly, 'isAdmin()=', isAdmin());
    
    if (adminOnly && !isAdmin()) {
      console.log('🔒 Acesso negado: página admin-only mas usuário não é admin');
      console.log('📧 Email do usuário:', p.email);
      console.log('📧 ADMIN_EMAILS:', ADMIN_EMAILS);
      var main = document.querySelector('.main');
      if (main) main.innerHTML =
        '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;gap:16px;padding:40px;text-align:center">' +
        '<i class="fa-solid fa-lock" style="font-size:3rem;color:#ea1d2c"></i>' +
        '<h2 style="font-family:Inter,sans-serif;color:#18181b">Acesso restrito</h2>' +
        '<p style="color:#71717a;font-family:Inter,sans-serif">Apenas administradores podem acessar esta página.</p>' +
        '<p style="color:#71717a;font-family:Inter,sans-serif;font-size:0.85rem">Seu email: ' + p.email + '</p>' +
        '<a href="Tela2.html" style="color:#ea1d2c;font-weight:700;font-family:Inter,sans-serif">← Voltar ao painel</a></div>';
      return;
    }
    console.log('✅ authGuard completo, executando callback da página');
    if (cb) cb();
  });
}


// ── Sidebar ───────────────────────────────────────────────────────
function buildSidebar(activePage) {
  if (!activePage) activePage = window.location.pathname.split('/').pop() || '';
  var p     = getParceiro();
  var admin = isAdmin();
  var name  = p ? (p.nome || 'Usuário') : '—';
  var email = p ? (p.email || '') : '';
  var addr  = p ? ((p.rua||'') + (p.numero ? ', '+p.numero : '') + (p.cidade ? ' — '+p.cidade : '')) : '';

  // ── Avatar: foto Google ou inicial colorida ──────────────────────
  var avatarHtml;
  if (p && p.foto) {
    // Login com Google — exibe a foto de perfil
    avatarHtml =
      '<div class="sb-store-avatar" style="' +
        'width:48px;height:48px;border-radius:12px;overflow:hidden;' +
        'border:2px solid rgba(255,255,255,.15);flex-shrink:0;' +
      '">' +
        '<img src="' + p.foto + '" ' +
             'alt="' + esc(name) + '" ' +
             'style="width:100%;height:100%;object-fit:cover;display:block" ' +
             'onerror="this.parentNode.innerHTML=_sbInitial(\'' + esc(name) + '\',\'' + esc(email) + '\')" ' +
        '/>' +
      '</div>';
  } else {
    // Login manual — inicial com cor gerada pelo email
    avatarHtml = '<div class="sb-store-avatar" style="' + _sbAvatarStyle(email) + '">' + _sbInitialChar(name, email) + '</div>';
  }

  var adminHtml = admin ? (
    '<div class="sb-section">Admin</div>' +
    _sb('fa-shield-halved',     'Painel Admin',   'admin.html',          activePage) +
    _sb('fa-bag-shopping',      'Pedidos',        'pedidos.html',        activePage, true, 'badge-new') +
    _sb('fa-clock-rotate-left', 'Histórico',      'historico.html',      activePage) +
    _sb('fa-plus-circle',       'Cardápio Criar', 'cardapio-criar.html', activePage)
  ) : '';

  var html =
    '<button class="sidebar-close-btn" onclick="toggleSidebar()"><i class="fa-solid fa-xmark"></i></button>' +
    '<div class="sb-logo">' +
      '<div class="sb-logo-icon"><i class="fa-solid fa-bowl-food"></i></div>' +
      '<div class="sb-logo-name">Mama<span>Food</span></div>' +
    '</div>' +
    '<div class="sb-store">' +
      avatarHtml +
      '<div>' +
        '<div class="sb-store-name">' + esc(name) + '</div>' +
        '<div class="sb-store-addr">' + esc(addr || email) + '</div>' +
      '</div>' +
    '</div>' +
    '<nav class="sb-nav">' +
      '<div class="sb-section">Menu</div>' +
      _sb('fa-utensils',   'Cardápio',       'cardapio.html',     activePage) +
      _sb('fa-receipt',    'Meus Pedidos',   'meus-pedidos.html', activePage) +
      _sb('fa-motorcycle', 'Taxa e Entrega', 'taxa-entrega.html', activePage) +
      '<div class="sb-section">Recursos</div>' +
      _sb('fa-tags',       'Promoções',      'promocoes.html',    activePage, true, 'badge-promo') +
      _sb('fa-heart',      'Favoritos',      'favoritos.html',    activePage) +
      _sb('fa-star',       'Avaliações',     'avaliacoes.html',   activePage) +
      _sb('fa-bell',       'Notificações',   'notificacoes.html', activePage, true, 'badge-notif') +
      _sb('fa-headset',    'Suporte',        'suporte.html',      activePage) +
      adminHtml +
      '<div class="sb-section">Conta</div>' +
      _sb('fa-store', 'Meu Perfil', 'perfil.html', activePage) +
    '</nav>' +
    '<div class="sb-footer">' +
      '<div class="sb-logout" onclick="logout()">' +
        '<i class="fa-solid fa-right-from-bracket"></i> Sair da conta' +
      '</div>' +
    '</div>';

  var el = document.getElementById('sidebar');
  if (el) el.innerHTML = html;
  
  // Atualizar badges dinamicamente
  atualizarBadges();
}

// ── Atualizar badges da sidebar ──────────────────────────────────
function atualizarBadges() {
  try {
    // Badge de promoções (exemplo: 3 promos ativas)
    var promos = JSON.parse(localStorage.getItem('mf_promocoes') || '[]');
    var badgePromo = document.getElementById('badge-promo');
    if (badgePromo) {
      if (promos.length > 0) {
        badgePromo.textContent = promos.length;
        badgePromo.style.display = 'flex';
      } else {
        badgePromo.style.display = 'none';
      }
    }
    
    // Badge de notificações (verifica com email do usuário)
    var p = getParceiro();
    if (p && p.email) {
      var notifs = JSON.parse(localStorage.getItem('mf_notificacoes_' + p.email) || '[]');
      var notifNaoLidas = notifs.filter(function(n){ return !n.lida; }).length;
      var badgeNotif = document.getElementById('badge-notif');
      if (badgeNotif) {
        if (notifNaoLidas > 0) {
          badgeNotif.textContent = notifNaoLidas;
          badgeNotif.style.display = 'flex';
        } else {
          badgeNotif.style.display = 'none';
        }
      }
    }
    
    // Badge de pedidos (para admin)
    if (isAdmin()) {
      var pedidosNovos = 0;
      var allKeys = Object.keys(localStorage);
      allKeys.forEach(function(key) {
        if (key.startsWith('mf_pedidos_')) {
          try {
            var pedidos = JSON.parse(localStorage.getItem(key) || '[]');
            pedidosNovos += pedidos.filter(function(p){ return p.status === 'pendente'; }).length;
          } catch(e) {
            console.warn('Erro ao contar pedidos:', e);
          }
        }
      });
      var badgeNew = document.getElementById('badge-new');
      if (badgeNew) {
        if (pedidosNovos > 0) {
          badgeNew.textContent = pedidosNovos;
          badgeNew.style.display = 'flex';
        } else {
          badgeNew.style.display = 'none';
        }
      }
    }
  } catch(error) {
    console.warn('⚠️ Erro ao atualizar badges:', error);
  }
}

// ── Helpers de avatar ────────────────────────────────────────────
// Gera uma cor de fundo baseada no email (determinística)
function _sbAvatarColor(email) {
  var colors = [
    '#e53e3e','#dd6b20','#d69e2e','#38a169',
    '#3182ce','#805ad5','#d53f8c','#00b5d8',
    '#c05621','#2c7a7b','#6b46c1','#2b6cb0'
  ];
  var hash = 0;
  for (var i = 0; i < email.length; i++) hash = email.charCodeAt(i) + ((hash << 5) - hash);
  return colors[Math.abs(hash) % colors.length];
}

// Retorna o estilo inline para o avatar com inicial
function _sbAvatarStyle(email) {
  var bg = _sbAvatarColor(email || 'user');
  return [
    'width:48px', 'height:48px', 'border-radius:12px',
    'background:' + bg,
    'display:flex', 'align-items:center', 'justify-content:center',
    'font-size:1.2rem', 'font-weight:900', 'color:#fff',
    'flex-shrink:0', 'letter-spacing:-.02em',
    'box-shadow:0 4px 12px rgba(0,0,0,.25)',
    'border:2px solid rgba(255,255,255,.12)'
  ].join(';');
}

// Retorna a letra inicial do nome ou email
function _sbInitialChar(name, email) {
  var src = (name && name !== '—' && name !== 'Usuário') ? name : email;
  return src ? src.charAt(0).toUpperCase() : '?';
}

// Usado como fallback de erro de imagem (chamado via onerror inline)
function _sbInitial(name, email) {
  return '<div style="' + _sbAvatarStyle(email) + '">' + _sbInitialChar(name, email) + '</div>';
}

function _sb(icon, label, href, active, hasBadge, badgeId) {
  var cls   = active === href ? 'sb-item active' : 'sb-item';
  var badge = hasBadge && badgeId ? '<span class="badge" id="'+badgeId+'">0</span>' : '';
  return '<a class="'+cls+'" href="'+href+'"><i class="fa-solid '+icon+' sb-item-icon"></i><span>'+label+'</span>'+badge+'</a>';
}

function esc(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// ── Relógio ───────────────────────────────────────────────────────
function startClock(id) {
  function tick() {
    var el = document.getElementById(id);
    if (!el) return;
    var n = new Date();
    el.textContent = String(n.getHours()).padStart(2,'0') + ':' + String(n.getMinutes()).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);
}

// ── Toast ─────────────────────────────────────────────────────────
function showToast(msg, type) {
  var wrap = document.getElementById('toastWrap');
  if (!wrap) return;
  var t = document.createElement('div');
  t.className = 'toast ' + (type || 'ok');
  t.textContent = msg;
  wrap.appendChild(t);
  setTimeout(function(){ if (t.parentNode) t.parentNode.removeChild(t); }, 3200);
}

// ── Logout ────────────────────────────────────────────────────────
function logout() {
  if (confirm('Deseja sair da conta?')) {
    localStorage.removeItem('mf_parceiro');
    localStorage.removeItem('mf_pedidos');
    window.location.href = 'Tela1.html';
  }
}

// ── Sidebar mobile ────────────────────────────────────────────────
function toggleSidebar() {
  var sb = document.getElementById('sidebar');
  if (sb) sb.classList.toggle('open');
}
window.addEventListener('resize', function(){
  var btn = document.getElementById('menu-btn');
  if (btn) btn.style.display = window.innerWidth <= 768 ? 'flex' : 'none';
});
