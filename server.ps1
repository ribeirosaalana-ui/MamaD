$port = 8888
$root = "c:\Users\skank\Desktop\site"

$mime = @{
  '.html'=   'text/html; charset=utf-8'
  '.css' =   'text/css; charset=utf-8'
  '.js'  =   'application/javascript; charset=utf-8'
  '.json'=   'application/json'
  '.png' =   'image/png'
  '.jpg' =   'image/jpeg'
  '.jpeg'=   'image/jpeg'
  '.ico' =   'image/x-icon'
  '.svg' =   'image/svg+xml'
  '.env' =   'text/plain; charset=utf-8'
  '.txt' =   'text/plain; charset=utf-8'
}

function getMime($ext) {
  if ($mime.ContainsKey($ext)) { return $mime[$ext] }
  return 'application/octet-stream'
}

function sendResponse($stream, $status, $statusText, $ct, $body) {
  $hdr = "HTTP/1.1 $status $statusText`r`nContent-Type: $ct`r`nContent-Length: $($body.Length)`r`nAccess-Control-Allow-Origin: *`r`nCache-Control: no-store, no-cache, must-revalidate, private`r`nPragma: no-cache`r`nX-Content-Type-Options: nosniff`r`nX-Frame-Options: DENY`r`nConnection: close`r`n`r`n"
  $hb  = [System.Text.Encoding]::ASCII.GetBytes($hdr)
  try { $stream.Write($hb, 0, $hb.Length); $stream.Write($body, 0, $body.Length); $stream.Flush() } catch {}
}

$tcp = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Any, $port)
try {
  $tcp.Start()
} catch {
  Write-Host "ERRO ao iniciar na porta $port : $_" -ForegroundColor Red
  Read-Host "Pressione Enter para fechar"
  exit 1
}

Write-Host ""
Write-Host "  =====================================" -ForegroundColor DarkGray
Write-Host "   MamaFood Server iniciado!" -ForegroundColor Green
Write-Host "   http://localhost:$port/SiteHtmls/Tela1.html" -ForegroundColor Cyan
Write-Host "   Ctrl+C para parar" -ForegroundColor DarkGray
Write-Host "  =====================================" -ForegroundColor DarkGray
Write-Host ""

try {
  while ($true) {
    $client = $null
    try {
      $client = $tcp.AcceptTcpClient()
      $client.ReceiveTimeout = 3000
      $client.SendTimeout    = 8000
      $stream = $client.GetStream()

      $buf   = New-Object byte[] 16384
      $nread = 0
      try { $nread = $stream.Read($buf, 0, $buf.Length) } catch {}

      if ($nread -gt 0) {
        $reqText  = [System.Text.Encoding]::ASCII.GetString($buf, 0, $nread)
        $firstLine = ($reqText -split "`r`n")[0]
        $parts     = $firstLine -split ' '
        $urlPath   = if ($parts.Count -ge 2) { $parts[1] } else { '/' }
        $urlPath   = ($urlPath -split '\?')[0]

        # Decode %20 etc
        $urlPath = [Uri]::UnescapeDataString($urlPath)

        # Normaliza
        $local = $urlPath.TrimStart('/')
        if ($local -eq '' -or $local -eq '/') { $local = 'SiteHtmls/index.html' }

        # Converte separadores
        $local    = $local.Replace('/', '\')
        $filePath = Join-Path $root $local

        if (Test-Path $filePath -PathType Leaf) {
          $bytes   = [System.IO.File]::ReadAllBytes($filePath)
          $ext     = [System.IO.Path]::GetExtension($filePath).ToLower()
          $ct      = getMime $ext
          sendResponse $stream 200 'OK' $ct $bytes
          Write-Host "  200  $urlPath" -ForegroundColor Green
        } else {
          $body = [System.Text.Encoding]::UTF8.GetBytes("<!DOCTYPE html><html><body><h2>404 - Nao encontrado</h2><p>$local</p><a href='/SiteHtmls/Tela1.html'>Ir para Tela1</a></body></html>")
          sendResponse $stream 404 'Not Found' 'text/html; charset=utf-8' $body
          Write-Host "  404  $urlPath" -ForegroundColor Yellow
        }
      }
    } catch {}
    finally {
      if ($client) { try { $client.Close() } catch {} }
    }
  }
} finally {
  $tcp.Stop()
  Write-Host "Servidor encerrado." -ForegroundColor Yellow
}
