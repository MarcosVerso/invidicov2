<?php
// back/bdd.php

class BDD {
    private $host = 'localhost';
    private $usuario = 'root';
    private $contrasena = '';
    private $nombre_bd = 'invidico';
    private $conexion;

    public function __construct() {
        $this->conexion = new mysqli(
            $this->host,
            $this->usuario,
            $this->contrasena,
            $this->nombre_bd
        );

        if ($this->conexion->connect_error) {
            die('Error de conexión: ' . $this->conexion->connect_error);
        }
    }

    public function getConexion() {
        return $this->conexion;
    }

    public function ejecutarConsulta($consulta) {
        $resultado = $this->conexion->query($consulta);
        if ($resultado === false) {
            die('Error en la consulta: ' . $this->conexion->error);
        }
        return $resultado;
    }

    public function consultaParametrizada($consulta, $parametros) {
        $stmt = $this->conexion->prepare($consulta);
        if ($stmt === false) {
            die('Error en la preparación de la consulta: ' . $this->conexion->error);
        }

        // Determinar los tipos de los parámetros
        $tipos = '';
        foreach ($parametros as $parametro) {
            if (is_int($parametro)) {
                $tipos .= 'i'; // tipo entero
            } elseif (is_double($parametro)) {
                $tipos .= 'd'; // tipo double
            } else {
                $tipos .= 's'; // tipo string
            }
        }
        $stmt->bind_param($tipos, ...$parametros);

        if (!$stmt->execute()) {
            die('Error en la ejecución de la consulta: ' . $stmt->error);
        }

        return $stmt->get_result();
    }

    public function cerrar() {
        $this->conexion->close();
    }
}
?>