// MamaFood — Proteção de código
// Bloqueia DevTools, inspeção, view-source e clique direito
;(function(){
  'use strict';

  // ── 1. Desabilita clique direito ────────────────────────────────
  document.addEventListener('contextmenu', function(e){ e.preventDefault(); });

  // ── 2. Bloqueia atalhos de teclado ──────────────────────────────
  document.addEventListener('keydown', function(e){
    // F12
    if (e.key === 'F12' || e.keyCode === 123) { e.preventDefault(); e.stopPropagation(); return false; }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C (DevTools)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault(); e.stopPropagation(); return false;
    }
    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) { e.preventDefault(); e.stopPropagation(); return false; }
    // Ctrl+S (Save)
    if (e.ctrlKey && (e.key === 'S' || e.key === 's')) { e.preventDefault(); return false; }
    // Ctrl+A (Select All)
    if (e.ctrlKey && (e.key === 'A' || e.key === 'a')) { e.preventDefault(); return false; }
  }, true);

  // ── 3. Detecta abertura do DevTools ─────────────────────────────
  var _dt = false;
  var _threshold = 160;

  function _checkDevTools() {
    var w = window.outerWidth  - window.innerWidth;
    var h = window.outerHeight - window.innerHeight;
    if (w > _threshold || h > _threshold) {
      if (!_dt) {
        _dt = true;
        _onDevToolsOpen();
      }
    } else {
      _dt = false;
    }
  }

  function _onDevToolsOpen() {
    // Limpa o documento
    document.body.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100vh;font-family:monospace;font-size:14px;color:#666;background:#1e1e1e;color:#ff4444">Acesso não autorizado.</div>';
    // Para todos os intervalos
    var id = setTimeout(function(){}, 0);
    while (id--) clearTimeout(id);
    while (id--) clearInterval(id);
  }

  setInterval(_checkDevTools, 500);

  // ── 4. Anti-debugger ────────────────────────────────────────────
  setInterval(function(){
    (function _d(){
      var s = +new Date();
      (function(){}).constructor('debugger')();
      if (+new Date() - s > 100) { _onDevToolsOpen(); }
    })();
  }, 3000);

  // ── 5. Bloqueia seleção de texto ────────────────────────────────
  document.addEventListener('selectstart', function(e){
    if (!['INPUT','TEXTAREA'].includes(e.target.tagName)) {
      e.preventDefault();
    }
  });

  // ── 6. Bloqueia arrastar elementos ──────────────────────────────
  document.addEventListener('dragstart', function(e){ e.preventDefault(); });

  // ── 7. Bloqueia print (Ctrl+P) ──────────────────────────────────
  document.addEventListener('keydown', function(e){
    if (e.ctrlKey && (e.key === 'p' || e.key === 'P')) { e.preventDefault(); return false; }
  });

  // ── 8. CSS anti-seleção ─────────────────────────────────────────
  var _s = document.createElement('style');
  _s.textContent = '* { -webkit-user-select:none!important; -moz-user-select:none!important; user-select:none!important; } input,textarea { -webkit-user-select:text!important; user-select:text!important; }';
  document.head.appendChild(_s);

})();
