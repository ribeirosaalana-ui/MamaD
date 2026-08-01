// ============================================================
// server-api.js — Servidor Node.js com API para cardápio
// ============================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8888;
const CARDAPIO_FILE = path.join(__dirname, 'cardapio.json');

// Tipos MIME
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // ═══ API CARDÁPIO ═══
  if (req.url === '/api/cardapio' || req.url.startsWith('/api/cardapio?')) {
    // GET - Ler cardápio
    if (req.method === 'GET') {
      fs.readFile(CARDAPIO_FILE, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end('[]');
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
      return;
    }

    // POST - Salvar cardápio
    if (req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk.toString(); });
      req.on('end', () => {
        try {
          const cardapio = JSON.parse(body);
          fs.writeFile(CARDAPIO_FILE, JSON.stringify(cardapio, null, 2), (err) => {
            if (err) {
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ sucesso: false, erro: err.message }));
            } else {
              console.log('✅ Cardápio salvo:', cardapio.length, 'itens');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ sucesso: true }));
            }
          });
        } catch (e) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ sucesso: false, erro: 'JSON inválido' }));
        }
      });
      return;
    }
  }

  // ═══ ARQUIVOS ESTÁTICOS ═══
  let filePath = '.' + req.url;
  if (filePath === './') filePath = './index.html';

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Página não encontrada</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Erro interno: ' + error.code);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('╔═══════════════════════════════════════╗');
  console.log('║   🍔 MamaFood Server + API rodando   ║');
  console.log('╠═══════════════════════════════════════╣');
  console.log(`║   http://localhost:${PORT}             ║`);
  console.log(`║   API: /api/cardapio                  ║');
  console.log('╚═══════════════════════════════════════╝');
});
