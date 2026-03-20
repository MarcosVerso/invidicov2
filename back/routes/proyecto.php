<?php
require_once __DIR__ . '/../models/proyectomodel.php';

function getAllProyectos() {
    $data = json_decode(file_get_contents('php://input'), true);
    $porPagina = (int)($data['porPagina'] ?? 0); // Valor por defecto si no se proporciona
    $offset = (int)(isset($data['porPagina']) ? ($data['pagina'] - 1) * $porPagina : 0);
    $proyectoModel = new ProyectoModel();

    $totalRegistros = $proyectoModel->getTotalRegistros();
    $proyectos = $proyectoModel->getAllProyectos($porPagina, $offset);
    $totalPaginas = ceil($totalRegistros / $porPagina);
    if($porPagina<=0)
        $totalPaginas = 1;

    echo json_encode([
        "proyectos" => $proyectos,
        "totalPaginas" => $totalPaginas
    ]);
}

function insertProyecto(){
    $proyectoModel = new ProyectoModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['nombre_proyecto']) && isset($data['diseños_asignados']) && isset($data['videos_asignados']) && isset($data['fecha_destino']) && isset($data['id_cliente'])) {
        $id_cliente = $data['id_cliente'];
        $nombre = $data['nombre_proyecto'];
        $diseños_asignados = $data['diseños_asignados'];
        $videos_asignados = $data['videos_asignados'];
        $estado = 1;//$data['estado'];
        $fecha_destino = $data['fecha_destino'];
        $id = $proyectoModel->insertProyecto($id_cliente, $nombre, $diseños_asignados, $videos_asignados, $estado, $fecha_destino);
        echo json_encode(['success' => true, 'id' => $id]);
    } else {
        echo json_encode(['error' => 'Faltan datos del proyecto']);
    }
}

function updateProyecto() {
    $proyectoModel = new ProyectoModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id']) && isset($data['nombre_proyecto'])) {
        $id = $data['id'];
        $nombre = $data['nombre_proyecto'];
        $affectedRows = $proyectoModel->updateProyecto($id, $nombre);
        echo json_encode(['success' => true, 'affectedRows' => $affectedRows]);
    } else {
        echo json_encode(['error' => 'Faltan el ID o el nombre del proyecto']);
    }
}

function deleteProyecto() {
    $proyectoModel = new ProyectoModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $id = $data['id'];
        $affectedRows = $proyectoModel->deleteProyecto($id);
        echo json_encode(['success' => true, 'id' => $affectedRows]);
    } else {
        echo json_encode(['error' => 'Falta el ID del proyecto']);
    }
}

function getEstadisticas() {
    $proyectoModel = new ProyectoModel();
    $data = $proyectoModel->getDashboardStats();

    echo json_encode([
        "proyectos" => $data['total_proyectos'] ?? 0,
        "videos" => ($data['v_listos'] ?? 0) . " / " . ($data['v_total'] ?? 0),
        "disenos" => $data['d_pendientes'] ?? 0
    ]);
}

function getMiembrosProyecto() {
    $proyectoModel = new ProyectoModel();
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id_proyecto'])) {
        $id_proyecto = $data['id_proyecto'];
        $miembros = $proyectoModel->getMiembros($id_proyecto);
        echo json_encode(['success' => true, 'miembros' => $miembros]);
    } else {
        echo json_encode(['error' => 'Falta el ID del proyecto']);
    }
}