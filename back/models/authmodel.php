<?php
require_once __DIR__ . '/../bdd.php';
require_once __DIR__ . '/usermodel.php';

class AuthModel {
    private $bdd;

    public function __construct() {
        $this->bdd = new BDD();
    }

    public function garbageCollector() {
        $sql = "DELETE FROM sesiones WHERE expires_at < UTC_TIMESTAMP()";
        return $this->bdd->ejecutarConsulta($sql); 
    }

    public function generateToken($userId) {
        $token = bin2hex(random_bytes(16)); // Genera un token aleatorio
        $fechaExpiracion = date('Y-m-d H:i:s', time() + 3600);
        $consulta = "INSERT INTO sesiones (usuario_id, token_hash, expires_at) VALUES (?, ?, ?)";
        $token_hash = hash('sha256', $token);

       

        $this->bdd->consultaParametrizada($consulta, [$userId, $token_hash, $fechaExpiracion]);
        return $token;
    }

    public function eliminarSesion($token){
        $tokenHash = hash('sha256', $token);
        $consulta = "DELETE FROM sesiones WHERE token_hash = ?";
        $this->bdd->consultaParametrizada($consulta, [$tokenHash]);
    }

    public function limpiarSesionesExpiradas(){
        $ahora = date('Y-m-d H:i:s');
        $consulta = "DELETE FROM sesiones WHERE expires_at <= ?";
        $this->bdd->consultaParametrizada($consulta, [$ahora]);
    }

    public function validateToken($token) {
        $token_hash = hash('sha256', $token);
        $ahora = date('Y-m-d H:i:s');
        $consulta = "SELECT * FROM sesiones WHERE token_hash = ? AND expires_at > ?";
        $resultado = $this->bdd->consultaParametrizada($consulta, [$token_hash, $ahora]);
        if ($resultado->num_rows > 0) {
            $user = $resultado->fetch_assoc();
            require_once __DIR__ . '/usermodel.php';
            $userModel = new UserModel();
            $user = $userModel->getUserById($user['usuario_id']);
            return $user;//['usuario_id'];
        }
        return false;
    }

    public function login($email, $password) {
        $userModel = new UserModel();
        $user = $userModel->getUserByEmail($email);
        if(!$user)
            return ["error" => "Usuario no encontrado"];
        //if(password_verify($password, $user['password_hash'])){
        if($password===$user['password_hash'])
            return ["token" => $this->generateToken($user['id'])];
        //}

        return ["error" => "Contraseña incorrecta"];
    }
}