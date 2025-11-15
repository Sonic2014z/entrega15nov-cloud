# Entrega actividad

> Integrantes : Gonzalo Maturana Cruces y Vicente Rodriguez Cancino.

---

```yml

services:
  db:  # servicio de base de datos 
    image: mariadb:11 #  imagen de base de datos
    container_name: db-actividad # nombre del contenedor 
    environment: # variables de entorno
      - MARIADB_DATABASE=actividad15nov
      - MARIADB_USER=gmc
      - MARIADB_PASSWORD=15nov2025
      - MARIADB_ROOT_PASSWORD=admin123
    volumes:  # volumenes para mantener la persistencia 
      - db_data:/var/lib/mysql
      - ./db.sql:/docker-entrypoint-initdb.d/db.sql
    restart: on-failure # si existe un fallo en el inicio del servicio se reinicia
    healthcheck: # checkeo de salud 
      test: ["CMD-SHELL", "mariadb-admin ping -uroot -p15nov2025 || exit 1"]
      interval: 5s
      timeout: 3s
      retries: 10

  app:  # servicio de la web
    build: .
    container_name: app-actividad  # nombre del contenedor
    ports: # ocupamos los puerto  8080:3000
      - "8080:3000"
    environment: # variables de entorno desde la web
      DB_HOST: db-actividad
      DB_PORT: 3306
      DB_USER: gmc
      DB_PASSWORD: 15nov2025
      DB_NAME: actividad15nov
    depends_on: # depende la condicion de salud de la bd 
      db:
        condition: service_healthy
    restart: on-failure # si existe un fallo en el inicio del servicio se reinicia

volumes:
  db_data:


```

```sql

--  base de datos 
USE actividad15nov;

CREATE TABLE IF NOT EXISTS integrantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO integrantes (nombre, email) VALUES
('Gonzalo Maturana', 'g.maturana5@almunos.santotomas.cl'),
('Vicente Rodriguez', 'v.rodriguez78@alumnos.santotomas.cl');

```

### Como iniciar el servicio dockerizado:

1. Entrar a la carpeta por medio de la terminal.

```bash
cd el/directorio/de/la/carpeta
```

2. Escribir el siguiente comando **(ASEGURARSE DE TENER DOCKER FUNCIONANDO)**}

```bash
docker compose up -d
```

3. Entrar a la direccion `localhost:8080`, donde será recibido con el json que obtiene los datos de la base de datos.

**O si está en linux, puede hacer curl a la dirección:**

```bash
curl localhost:8080
```

