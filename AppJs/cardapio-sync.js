// ============================================================
// cardapio-sync.js — Sincronização de Cardápio Global
// ============================================================

var CARDAPIO_API = '/api/cardapio';
var CARDAPIO_CACHE_KEY = 'mf_cardapio';
var LAST_SYNC_KEY = 'mf_last_sync';

// ── Carregar cardápio (localStorage + servidor) ──────────────────
function getCardapioGlobal(callback) {
  // 1. Tenta carregar do servidor primeiro
  fetch(CARDAPIO_API + '?t=' + Date.now(), {
    method: 'GET',
    cache: 'no-cache'
  })
  .then(function(response) {
    if (!response.ok) throw new Error('Erro ao carregar cardápio');
    return response.json();
  })
  .then(function(cardapioServidor) {
    console.log('✅ Cardápio carregado do servidor:', cardapioServidor.length, 'itens');
    
    // Salva no localStorage como cache
    localStorage.setItem(CARDAPIO_CACHE_KEY, JSON.stringify(cardapioServidor));
    localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
    
    if (callback) callback(cardapioServidor);
  })
  .catch(function(error) {
    console.warn('⚠️ Erro ao carregar do servidor, usando cache local:', error);
    
    // Fallback: usa localStorage
    var cache = localStorage.getItem(CARDAPIO_CACHE_KEY);
    var cardapio = cache ? JSON.parse(cache) : [];
    
    if (callback) callback(cardapio);
  });
}

// ── Salvar cardápio (localStorage + servidor) ────────────────────
function setCardapioGlobal(cardapio, callback) {
  console.log('💾 Salvando cardápio:', cardapio.length, 'itens');
  
  // 1. Salva no localStorage imediatamente
  localStorage.setItem(CARDAPIO_CACHE_KEY, JSON.stringify(cardapio));
  
  // 2. Tenta salvar no servidor
  fetch(CARDAPIO_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cardapio)
  })
  .then(function(response) {
    if (!response.ok) throw new Error('Erro ao salvar no servidor');
    return response.json();
  })
  .then(function(data) {
    console.log('✅ Cardápio salvo no servidor com sucesso!', data);
    localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
    if (callback) callback(true);
  })
  .catch(function(error) {
    console.warn('⚠️ Não foi possível salvar no servidor (apenas localStorage):', error);
    // Continua funcionando com localStorage
    if (callback) callback(false);
  });
}

// ── Verificar se precisa atualizar ───────────────────────────────
function verificarAtualizacao(callback) {
  var lastSync = parseInt(localStorage.getItem(LAST_SYNC_KEY) || '0');
  var agora = Date.now();
  
  // Se passou mais de 5 segundos, verifica novamente
  if (agora - lastSync > 5000) {
    getCardapioGlobal(callback);
  } else {
    var cache = localStorage.getItem(CARDAPIO_CACHE_KEY);
    var cardapio = cache ? JSON.parse(cache) : [];
    if (callback) callback(cardapio);
  }
}

// ── Auto-atualização em tempo real ───────────────────────────────
function iniciarAutoSync(callback, intervalo) {
  intervalo = intervalo || 3000; // 3 segundos
  
  setInterval(function() {
    fetch(CARDAPIO_API + '?t=' + Date.now(), { cache: 'no-cache' })
      .then(function(r) { return r.json(); })
      .then(function(serverData) {
        var localData = localStorage.getItem(CARDAPIO_CACHE_KEY);
        var local = localData ? JSON.parse(localData) : [];
        
        // Compara se mudou
        if (JSON.stringify(serverData) !== JSON.stringify(local)) {
          console.log('🔄 Cardápio atualizado! Recarregando...');
          localStorage.setItem(CARDAPIO_CACHE_KEY, JSON.stringify(serverData));
          localStorage.setItem(LAST_SYNC_KEY, Date.now().toString());
          if (callback) callback(serverData);
        }
      })
      .catch(function(err) {
        console.warn('⚠️ Erro ao verificar atualizações:', err);
      });
  }, intervalo);
}
