<?php
include_once './routes/router.php';
include_once './routes/tokens.php';
include_once './routes/cliente.php';
include_once './routes/proyecto.php';

$router = new Router();

$router->addRoute("/validarToken", "POST", "public", "validateToken");
$router->addRoute("/login", "POST", "public", "login");
$router->addRoute("/logout", "POST", "public", "logout");
$router->addRoute("/obtenerClientes", "POST", "public", "getAllClientes");
$router->addRoute("/insertarCliente", "POST", "public", "insertCliente");
$router->addRoute("/actualizarCliente", "POST", "public", "updateCliente");
$router->addRoute("/eliminarCliente", "POST", "public", "deleteCliente");
$router->addRoute("/actualizarCliente", "POST", "public", "updateCliente");
$router->addRoute("/obtenerProyectos", "POST", "public", "getAllProyectos");
$router->addRoute("/insertarProyecto", "POST", "public", "insertProyecto");
$router->addRoute("/actualizarProyecto", "POST", "public", "updateProyecto");
$router->addRoute("/eliminarProyecto", "POST", "public", "deleteProyecto");
$router->addRoute("/obtenerEstadisticas", "POST", "public", "getEstadisticas");

$router->run();