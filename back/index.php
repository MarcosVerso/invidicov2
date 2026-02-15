<?php
require_once './routes/router.php';

$router = new Router();

$router->addRoute("pepe", "GET", "public", function() {
    echo json_encode(["message" => "si"]);
});
$router->addRoute("/marico", "GET", "public", function() {
    echo json_encode(["message" => "maricon"]);
});

$router->run();