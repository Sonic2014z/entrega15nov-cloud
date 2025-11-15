USE actividad15nov;

CREATE TABLE IF NOT EXISTS integrantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO integrantes (nombre, email) VALUES
('Gonzalo Maturana', 'g.maturana5@almunos.santotomas.cl'),
('Vicente Rodriguez', 'v.rodriguez78@alumnos.santotomas.cl');