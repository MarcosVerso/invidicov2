<?php
require_once __DIR__ . '/../bdd.php';

class ClienteModel{
    private $bdd;

    public function __construct() {
        $this->bdd = new BDD();
    }

    public function getTotalRegistros(){
        $consulta = "SELECT COUNT(*) FROM clientes";
        $resultado = $this->bdd->ejecutarConsulta($consulta);

        return $resultado->fetch_row()[0];
    }

    public function getAllClientes($porPagina = 0, $offset = 0) {
        $consulta = "SELECT * FROM clientes LIMIT $porPagina OFFSET $offset";
        if($porPagina<=0)
            $consulta = "SELECT * FROM clientes";
        $resultado = $this->bdd->ejecutarConsulta($consulta);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        }
        return null;
    }

    public function getClienteById($id) {
        $consulta = "SELECT * FROM clientes WHERE id = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
    }

    public function insertCliente($nombre) {
        $consulta = "INSERT INTO clientes (nombre) VALUES (?)";
        $this->bdd->consultaParametrizada($consulta, [$nombre]);
        return $this->bdd->getConexion()->insert_id;
    }

    public function updateCliente($id, $nombre) {
        $consulta = "UPDATE clientes SET nombre = ? WHERE id = ?";
        $this->bdd->consultaParametrizada($consulta, [$nombre, $id]);
        return $this->bdd->getConexion()->affected_rows;
    }

    public function deleteCliente($id) {
        $consulta = "DELETE FROM clientes WHERE id = ?";
        $this->bdd->consultaParametrizada($consulta, [$id]);
        return $this->bdd->getConexion()->affected_rows;
    }
}