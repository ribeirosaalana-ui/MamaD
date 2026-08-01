# Script para adicionar PWA meta tags em todos os arquivos HTML

$pwaTags = @"

  <!-- PWA Meta Tags -->
  <link rel="manifest" href="../manifest.json" />
  <meta name="theme-color" content="#ea1d2c" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="MamaFood" />
  <link rel="apple-touch-icon" href="../IMG_2462-removebg-preview.png" />
  <link rel="icon" type="image/png" href="../IMG_2462-removebg-preview.png" />
"@

$files = @(
    "SiteHtmls\admin.html",
    "SiteHtmls\avaliacoes.html",
    "SiteHtmls\cardapio-criar.html",
    "SiteHtmls\checkout.html",
    "SiteHtmls\favoritos.html",
    "SiteHtmls\historico.html",
    "SiteHtmls\meus-pedidos.html",
    "SiteHtmls\notificacoes.html",
    "SiteHtmls\pedidos.html",
    "SiteHtmls\perfil.html",
    "SiteHtmls\promocoes.html",
    "SiteHtmls\suporte.html",
    "SiteHtmls\taxa-entrega.html"
)

foreach ($file in $files) {
    $fullPath = Join-Path $PSScriptRoot $file
    if (Test-Path $fullPath) {
        $content = Get-Content $fullPath -Raw -Encoding UTF8
        
        # Verifica se já tem as PWA tags
        if ($content -notmatch "PWA Meta Tags") {
            # Adiciona após o <title>
            $content = $content -replace '(</title>)', "`$1$pwaTags"
            Set-Content $fullPath -Value $content -Encoding UTF8 -NoNewline
            Write-Host "✅ PWA tags adicionadas em: $file" -ForegroundColor Green
        } else {
            Write-Host "⏭️  PWA tags já existem em: $file" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ Arquivo não encontrado: $file" -ForegroundColor Red
    }
}

Write-Host "`n✨ Processo concluído!" -ForegroundColor Cyan
