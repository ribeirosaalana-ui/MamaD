# ============================================================
# start-server.ps1 — Inicia servidor Node.js com API
# ============================================================

Write-Host ""
Write-Host "╔═══════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║   🍔 MamaFood - Inicializando Servidor   ║" -ForegroundColor Cyan
Write-Host "╚═══════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Por favor, instale o Node.js:" -ForegroundColor Yellow
    Write-Host "https://nodejs.org" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Pressione qualquer tecla para sair..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Obter IP local
$ip = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*"} | Select-Object -First 1).IPAddress

Write-Host ""
Write-Host "🌐 Endereços de acesso:" -ForegroundColor Yellow
Write-Host "   PC (local):     http://localhost:8888" -ForegroundColor White
if ($ip) {
    Write-Host "   Celular/Rede:   http://${ip}:8888" -ForegroundColor White
}
Write-Host ""
Write-Host "📡 API endpoint:   /api/cardapio" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Dica: Use Ctrl+C para parar o servidor" -ForegroundColor Gray
Write-Host ""
Write-Host "════════════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# Iniciar servidor
node server-api.js
