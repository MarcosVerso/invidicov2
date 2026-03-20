<?php
include_once './routes/router.php';
include_once './routes/tokens.php';
include_once './routes/cliente.php';
include_once './routes/proyecto.php';

$router = new Router();

$router->addRoute("/validarToken", "POST", 0, "validateToken");
$router->addRoute("/login", "POST", 0, "login");
$router->addRoute("/logout", "POST", 0, "logout");
$router->addRoute("/obtenerClientes", "POST", 0, "getAllClientes");
$router->addRoute("/insertarCliente", "POST", 0, "insertCliente");
$router->addRoute("/actualizarCliente", "POST", 0, "updateCliente");
$router->addRoute("/eliminarCliente", "POST", 0, "deleteCliente");
$router->addRoute("/actualizarCliente", "POST", 0, "updateCliente");
$router->addRoute("/obtenerProyectos", "POST", 0, "getAllProyectos");
$router->addRoute("/insertarProyecto", "POST", 0, "insertProyecto");
$router->addRoute("/actualizarProyecto", "POST",0, "updateProyecto");
$router->addRoute("/eliminarProyecto", "POST", 0, "deleteProyecto");
$router->addRoute("/obtenerEstadisticas", "POST",0, "getEstadisticas");
$router->addRoute("/obtenerMiembrosProyecto", "POST", 0, "getMiembrosProyecto");

$router->run();