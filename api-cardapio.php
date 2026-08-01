<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Responde OPTIONS para CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$arquivo = __DIR__ . '/cardapio.json';

// GET - Ler cardápio
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($arquivo)) {
        $conteudo = file_get_contents($arquivo);
        echo $conteudo;
    } else {
        echo '[]';
    }
    exit;
}

// POST - Salvar cardápio
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json = file_get_contents('php://input');
    $cardapio = json_decode($json, true);
    
    if (json_last_error() === JSON_ERROR_NONE) {
        $resultado = file_put_contents($arquivo, json_encode($cardapio, JSON_PRETTY_PRINT));
        
        if ($resultado !== false) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Cardápio salvo']);
        } else {
            http_response_code(500);
            echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao salvar arquivo']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['sucesso' => false, 'mensagem' => 'JSON inválido']);
    }
    exit;
}

http_response_code(405);
echo json_encode(['sucesso' => false, 'mensagem' => 'Método não permitido']);
?>
