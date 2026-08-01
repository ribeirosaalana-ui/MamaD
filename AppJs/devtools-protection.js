
(function () {
  'use strict';

  // ── Detecta se é dispositivo móvel (tela de toque) ─────────────────────────
  var isMobile = (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    navigator.maxTouchPoints > 1 ||
    window.innerWidth <= 768
  );

  // Se for mobile, não aplica NENHUMA proteção (evita tela branca)
  if (isMobile) return;

  // ── 1. Bloqueia clique direito ──────────────────────────────────────────────
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  });

  // ── 2. Bloqueia atalhos de teclado do DevTools ─────────────────────────────
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+Shift+I / Ctrl+Shift+J / Ctrl+Shift+C
    if (e.ctrlKey && e.shiftKey && (
      e.key === 'I' || e.key === 'i' ||
      e.key === 'J' || e.key === 'j' ||
      e.key === 'C' || e.key === 'c'
    )) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
    // Ctrl+U (ver código-fonte)
    if (e.ctrlKey && (e.key === 'U' || e.key === 'u')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, true);

  // ── 3. Loop infinito de debugger (congela o DevTools quando aberto) ─────────
  function devtoolsLoop() {
    // DESABILITADO TEMPORARIAMENTE
    // setInterval(function () { debugger; }, 100);
  }

  // ── 4. Detecção por diferença de tamanho da janela ─────────────────────────
  // Só ativa se a diferença for MUITO grande (DevTools lateral/inferior)
  // Threshold mais alto para evitar falsos positivos
  var devToolsOpen = false;
  var WIDTH_THRESHOLD  = 250;
  var HEIGHT_THRESHOLD = 250;

  function detectBySize() {
    // Verifica de novo se é mobile (pode ter redimensionado)
    if (navigator.maxTouchPoints > 1) return;

    var widthDiff  = window.outerWidth  - window.innerWidth;
    var heightDiff = window.outerHeight - window.innerHeight;

    if (widthDiff > WIDTH_THRESHOLD || heightDiff > HEIGHT_THRESHOLD) {
      if (!devToolsOpen) {
        devToolsOpen = true;
        handleDevTools();
      }
    } else {
      devToolsOpen = false;
    }
  }

  // ── 5. O que fazer quando detectar DevTools aberto ─────────────────────────
  function handleDevTools() {
    document.documentElement.innerHTML = '';
    window.location.href = 'about:blank';
  }

  // ── 6. Inicia as checagens ──────────────────────────────────────────────────
  devtoolsLoop();
  setInterval(detectBySize, 1500);
  window.addEventListener('resize', function () {
    // Aguarda um frame para o resize completar antes de checar
    setTimeout(detectBySize, 200);
  });

})();
