<?php
require_once __DIR__ . '/../models/authmodel.php';
require_once __DIR__ . '/../models/usermodel.php';

function login() {
    $data = json_decode(file_get_contents("php://input"), true);
    $email = $data["email"] ?? '';
    $password = $data["password"] ?? '';

    $auth = new AuthModel();
    $result = $auth->login($email, $password);

    if(isset($result["token"])) {
        http_response_code(200);
        $expiracion = time() + 3600;
        setcookie(
            'auth_token',
            $result['token'],
            $expiracion,
            '/',
            '',
            false,
            true
        );     
        echo json_encode(['message' => 'Login Exitoso', 'success' => true]);
    } else {
        http_response_code(401);
        echo json_encode($result);
    }
    
}

function logout(){
    $auth = new AuthModel();
    $token = $_COOKIE['auth_token'] ?? '';
    $auth->eliminarSesion($token);
    setcookie('auth_token', '', time() - 3600, '/');
    echo json_encode(['message' => 'Logout Exitoso', 'success' => true]);
}

function obtenerFullDataUser($userId){
    $userModel = new UserModel();
    $todo = $userModel->getFullUserDataById($userId);

    return $todo;
}

function validateToken() {
    $auth = new AuthModel();
    $token = $_COOKIE['auth_token'] ?? '';
    $user = $auth->validateToken($token);
    if ($user) {
        //$roles = obtenerRoles($user['id']);
        $todo = obtenerFullDataUser($user['id']);
        $roles = array_map(function($item) {
            return [
                'nombre_cargo' => $item['nombre_cargo'],
                'nivel_acceso' => $item['nivel_acceso']
            ];
        }, $todo);
        $niveles = array_column($todo, 'nivel_acceso');
        $maxNivel = !empty($niveles) ? max($niveles) : 0;
        http_response_code(200);
        echo json_encode([
            "valid" => true, 
            "user" => [
                "nombre" => $user['nombre'],
                "id" => $user['id'], 
                "email" => $user['email'],
                "maximo_acceso" => $maxNivel,
                "roles" => $roles
            ]
        ]);
    } else {
        $auth->eliminarSesion($token);
        http_response_code(401);
        echo json_encode(["valid" => false]);
    }
}