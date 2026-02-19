<?php
class Router{
    private $routes;

    public function __construct() {
        $this->routes = [];
    }

    public function addRoute($route, $method, $level, $callback){
        array_push($this->routes, [
            'path' => trim($route, "/"),
            'method' => $method,
            'access' => $level,
            'callback' => $callback
        ]);
    }

    public function run(){
        $url = $_GET["endpoint"] ?? '';
        $currentMethod = $_SERVER["REQUEST_METHOD"];

        foreach ($this->routes as $route) {
            if($route['path']===$url && $route['method']===$currentMethod){
                $this->checkAccess($route['access']);

                //PARA PRUEBA:
                //echo json_encode(["message" => "SI ES LA RUTA"]);
                $route['callback']();
                return;
            }
        }

        echo json_encode(["error" => "Ruta no encontrada"]);
    }

    public function checkAccess($level){
        if($level==="public")
            return true;

        if(!isset($_COOKIE["auth_token"])){
            http_response_code(401);
            echo json_encode(["error" => "No autorizado"]);
            exit;
        }

        $token = $_COOKIE["auth_token"];

        $auth = new AuthModel();
        $userId = $auth->validateToken($token);

        if(!$userId){
            setcookie("auth_token", "", time() - 3600, "/"); // Eliminar la cookie
            http_response_code(401);
            echo json_encode(["error" => "Token inválido o expirado"]);
            exit;
        }

        //$_SESSION["user_id"] = $userId;
        return true;
    }
};