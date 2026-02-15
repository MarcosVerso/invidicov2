CREATE DATABASE invidico;
USE invidico;

-- Tabla para roles del sistema
CREATE TABLE cargos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre_cargo VARCHAR(50) NOT NULL UNIQUE,
    nivel_acceso INT NOT NULL DEFAULT 1,
    descripcion TEXT,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de usuarios del sistema
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    activo BOOLEAN DEFAULT TRUE
    -- fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- fecha_ultimo_login TIMESTAMP NULL,
);

CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cargo INT NOT NULL,
    id_usuario INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (id_cargo) REFERENCES cargos(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- Insertar cargos:
INSERT INTO cargos(nombre_cargo, descripcion, nivel_acceso) VALUES
('Administrador', 'para pruebas', 4),
('Supervisor', "Pueden administrar todo lo demas", 3),
('Project Manager', "administran los equipos", 2),
('Video', "edicion de video", 1),
('Diseñador', "Los diseños graficos", 1);

-- Tabla clientes
CREATE TABLE clientes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL  
);

-- tabla proyectos
CREATE TABLE proyectos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    nombre_proyecto VARCHAR(200) NOT NULL,
    diseños_asignados INT DEFAULT 0,
    diseños_listos INT DEFAULT 0,
    videos_asignados INT DEFAULT 0,
    videos_listos INT DEFAULT 0,
    estado ENUM('pendiente', 'completado', 'cancelado') DEFAULT 'pendiente',
    fecha_destino DATE,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);

-- tabla integrantes
CREATE TABLE integrantes(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_proyecto INT NOT NULL,
    id_usuario INT NOT NULL,
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

-- dias festivos
CREATE TABLE festivos(
    dia DATE,
    festividad VARCHAR(50)
);


INSERT INTO usuarios(nombre, apellido, email, password_hash) VALUES
("pepe", "segundo", "pepe@gmail.com", "pepe123");

INSERT INTO roles(id_cargo, id_usuario)
SELECT c.id, LAST_INSERT_ID() FROM cargos c WHERE c.nombre_cargo = "Administrador";