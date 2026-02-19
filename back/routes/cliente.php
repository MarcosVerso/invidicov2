<?php
require_once __DIR__ . '/../models/clientemodel.php';

function getAllClientes() {
    $data = json_decode(file_get_contents('php://input'), true);
    $porPagina = (int)($data['porPagina'] ?? 0); // Valor por defecto si no se proporciona
    $offset = (int)(isset($data['porPagina']) ? ($data['pagina'] - 1) * $porPagina : 0);
    $clienteModel = new ClienteModel();

    $totalRegistros = $clienteModel->getTotalRegistros();
    $clientes = $clienteModel->getAllClientes($porPagina, $offset);
    $totalPaginas = 0;
    if($porPagina>0)
        $totalPaginas = ceil($totalRegistros / $porPagina);

    echo json_encode([
        "clientes" => $clientes,
        "totalPaginas" => $totalPaginas
    ]);
}

function insertCliente(){
    $clienteModel = new ClienteModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['nombre'])) {
        $nombre = $data['nombre'];
        $id = $clienteModel->insertCliente($nombre);
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['error' => 'Falta el nombre del cliente']);
    }
}

function updateCliente() {
    $clienteModel = new ClienteModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id']) && isset($data['nombre'])) {
        $id = $data['id'];
        $nombre = $data['nombre'];
        $affectedRows = $clienteModel->updateCliente($id, $nombre);
        echo json_encode(['success' => true, 'affectedRows' => $affectedRows]);
    } else {
        echo json_encode(['error' => 'Faltan el ID o el nombre del cliente']);
    }
}

function deleteCliente() {
    $clienteModel = new ClienteModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $id = $data['id'];
        $affectedRows = $clienteModel->deleteCliente($id);
        echo json_encode(['success' => true, 'id' => $affectedRows]);
    } else {
        echo json_encode(['error' => 'Falta el ID del cliente']);
    }
}