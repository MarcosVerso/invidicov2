<?php
require_once __DIR__ . '/../bdd.php';

class UserModel {
    private $bdd;

    public function __construct() {
        $this->bdd = new BDD();
    }

    public function getUserById($id) {
        $consulta = "SELECT * FROM usuarios WHERE id = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
    }

    public function getUserRoleById($id) {
        $consulta = "SELECT * FROM roles WHERE id_usuario = ? AND activo = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id, 1]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
    }

    public function getUserRoleDescById($id) {
        $consulta = "SELECT * FROM cargos WHERE id = ? AND activo = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id, 1]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
    }

    public function getFullUserDataById($id) {
        $consulta = "SELECT u.id, u.email, c.nombre_cargo, c.nivel_acceso 
                     FROM usuarios u
                     JOIN roles r ON u.id = r.id_usuario AND r.activo = 1
                     JOIN cargos c ON r.id_cargo = c.id AND c.activo = 1
                     WHERE u.id = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$id]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_all(MYSQLI_ASSOC);
        }
        return null;
    }

    public function getUserByUsername($username) {
        $consulta = "SELECT * FROM usuarios WHERE username = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$username]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
    }

    public function getUserByEmail($email) {
        $consulta = "SELECT * FROM usuarios WHERE email = ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$email]);
        if ($resultado->num_rows > 0) {
            return $resultado->fetch_assoc();
        }
        return null;
    }

    public function createUser($username, $password) {
        $passwordHash = password_hash($password, PASSWORD_BCRYPT);
        $consulta = "INSERT INTO usuarios (username, password_hash) VALUES (?, ?)";
        return $this->bdd->consultaParametrizada($consulta, [$username, $passwordHash]);
    }
}