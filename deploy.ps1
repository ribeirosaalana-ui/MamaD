# 🚀 Script de Deploy Automático - MamaFood
# Execute: powershell -ExecutionPolicy Bypass -File deploy.ps1

Write-Host "🚀 Iniciando deploy do MamaFood..." -ForegroundColor Cyan

# Verificar se Node.js está instalado
Write-Host "`n📦 Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado!" -ForegroundColor Red
    Write-Host "   Baixe em: https://nodejs.org" -ForegroundColor Yellow
    exit 1
}

# Verificar se Firebase CLI está instalado
Write-Host "`n🔥 Verificando Firebase CLI..." -ForegroundColor Yellow
try {
    $firebaseVersion = firebase --version
    Write-Host "✅ Firebase CLI instalado: $firebaseVersion" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Firebase CLI não encontrado. Instalando..." -ForegroundColor Yellow
    npm install -g firebase-tools
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao instalar Firebase CLI" -ForegroundColor Red
        exit 1
    }
    Write-Host "✅ Firebase CLI instalado!" -ForegroundColor Green
}

# Verificar se está logado no Firebase
Write-Host "`n🔐 Verificando login no Firebase..." -ForegroundColor Yellow
$loginCheck = firebase projects:list 2>&1
if ($loginCheck -match "not logged in" -or $LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Não está logado. Abrindo login..." -ForegroundColor Yellow
    firebase login
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Erro ao fazer login" -ForegroundColor Red
        exit 1
    }
}
Write-Host "✅ Login confirmado!" -ForegroundColor Green

# Listar projetos disponíveis
Write-Host "`n📋 Projetos Firebase disponíveis:" -ForegroundColor Cyan
firebase projects:list

# Verificar se .firebaserc existe
if (Test-Path .firebaserc) {
    $firebaserc = Get-Content .firebaserc | ConvertFrom-Json
    $projectId = $firebaserc.projects.default
    
    if ($projectId -eq "SEU-PROJETO-AQUI") {
        Write-Host "`n⚠️  Projeto Firebase não configurado!" -ForegroundColor Yellow
        Write-Host "   Execute: firebase use --add" -ForegroundColor Yellow
        Write-Host "   Ou edite o arquivo .firebaserc manualmente" -ForegroundColor Yellow
        
        $useProject = Read-Host "`nDeseja selecionar um projeto agora? (S/N)"
        if ($useProject -eq "S" -or $useProject -eq "s") {
            firebase use --add
        } else {
            exit 1
        }
    }
}

# Deploy!
Write-Host "`n🚀 Iniciando deploy..." -ForegroundColor Cyan
firebase deploy --only hosting

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Deploy concluído com sucesso!" -ForegroundColor Green
    Write-Host "`n📱 Próximos passos:" -ForegroundColor Cyan
    Write-Host "   1. Atualize as URLs autorizadas no Google OAuth" -ForegroundColor White
    Write-Host "   2. Teste o login no site" -ForegroundColor White
    Write-Host "   3. Teste um pedido completo" -ForegroundColor White
    Write-Host "`n🌐 Console Firebase: https://console.firebase.google.com" -ForegroundColor Yellow
} else {
    Write-Host "`n❌ Erro durante o deploy!" -ForegroundColor Red
    exit 1
}
