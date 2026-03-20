<?php
require_once __DIR__ . '/../bdd.php';
class ProyectoModel{
    private $bdd;

    public function __construct() {
        $this->bdd = new BDD();
    }

    public function getTotalRegistros(){
        $consulta = "SELECT COUNT(*) FROM proyectos";
        $resultado = $this->bdd->ejecutarConsulta($consulta);

        return $resultado->fetch_row()[0];
     }

     public function getAllProyectos($porPagina = 0, $offset = 0) {
        $consulta = "SELECT p.*, c.nombre, GROUP_CONCAT(u.nombre SEPARATOR ', ') AS miembros
        FROM proyectos p
        LEFT JOIN clientes c ON p.id_cliente = c.id
        LEFT JOIN integrantes i ON p.id = i.id_proyecto 
        LEFT JOIN usuarios u ON i.id_usuario = u.id
        GROUP BY p.id
        LIMIT $porPagina OFFSET $offset";
        if($porPagina<=0)
            $consulta = "SELECT * FROM proyectos";
        $resultado = $this->bdd->ejecutarConsulta($consulta);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        }
        return null;
     }

     public function getProyectoById($id) {
        $consulta = "SELECT * FROM proyectos WHERE id = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
     }

     public function insertProyecto($id_cliente, $nombre, $diseños_asignados, $videos_asignados, $estado, $fecha_destino) {
        $consulta = "INSERT INTO proyectos (id_cliente, nombre_proyecto, diseños_asignados, 
        videos_asignados, estado, fecha_destino) VALUES (?, ?, ?, ?, ?, ?)";
        $this->bdd->consultaParametrizada($consulta, [$id_cliente, $nombre, 
        $diseños_asignados, $videos_asignados, $estado, $fecha_destino]);
        return $this->bdd->getConexion()->insert_id;
     }

     public function updateProyecto($id, $nombre) {
        $consulta = "UPDATE proyectos SET nombre_proyecto = ? WHERE id = ?";
        $this->bdd->consultaParametrizada($consulta, [$nombre, $id]);
        return $this->bdd->getConexion()->affected_rows;
     }

     public function deleteProyecto($id) {
        $consulta = "DELETE FROM proyectos WHERE id = ?";
        $this->bdd->consultaParametrizada($consulta, [$id]);
        return $this->bdd->getConexion()->affected_rows;
     }


     // En tu controlador o modelo
    public function getDashboardStats() {
        $sql = "SELECT 
            COUNT(*) as total_proyectos,
            SUM(videos_listos) as v_listos,
            SUM(videos_asignados) as v_total,
            SUM(diseños_asignados) - SUM(diseños_listos) as d_pendientes
            FROM proyectos";
    
        $res = $this->bdd->ejecutarConsulta($sql);
        $data = $res->fetch_assoc();

        return $data;
    }

    public function getMiembros($id_proyecto){
        $consulta = "SELECT u.nombre FROM usuarios u
        JOIN integrantes i ON u.id = i.id_usuario
        WHERE i.id_proyecto = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id_proyecto]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        }
        return null;
    }
}