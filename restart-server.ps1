# ============================================================
# restart-server.ps1 — Mata porta 8888 e reinicia servidor
# ============================================================

Write-Host "🔄 Reiniciando servidor MamaFood..." -ForegroundColor Cyan

# Encontrar e matar processo na porta 8888
$port = 8888
$connections = netstat -ano | Select-String ":$port" | Select-String "LISTENING"

if ($connections) {
    Write-Host "📌 Encontrado processo na porta $port" -ForegroundColor Yellow
    
    foreach ($conn in $connections) {
        $parts = $conn -split '\s+' | Where-Object { $_ -ne '' }
        $pid = $parts[-1]
        
        if ($pid -match '^\d+$') {
            Write-Host "   Matando PID: $pid" -ForegroundColor Gray
            try {
                Stop-Process -Id $pid -Force -ErrorAction Stop
                Write-Host "   ✅ Processo $pid terminado" -ForegroundColor Green
            } catch {
                Write-Host "   ⚠️  Erro ao matar processo: $_" -ForegroundColor Red
            }
        }
    }
    
    Start-Sleep -Seconds 2
}

# Iniciar servidor
Write-Host ""
Write-Host "🚀 Iniciando servidor..." -ForegroundColor Green
Write-Host ""

& powershell.exe -ExecutionPolicy Bypass -NoExit -File "server.ps1"
