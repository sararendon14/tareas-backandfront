Holaaaaaaas
Este proyecto implementa un sistema de gestión de tareas con autenticación JWT, CRUD de tareas y protección de rutas, utilizando ASP.NET Core para el backend y React para el frontend. El backend se conecta a SQL Server, y el frontend consume exclusivamente los endpoints del backend.

Tecnologías utilizadas

Backend:

ASP.NET Core 7

Entity Framework Core

SQL Server

JWT para autenticación

BCrypt para hash de contraseñas

Frontend:

React

React Router DOM

Axios

Estructura del backend
/Backend
│
├─ Controllers
│   ├─ AuthController.cs       # Login y emisión de JWT
│   └─ TareasController.cs     # CRUD de tareas con autorización
│
├─ Models
│   ├─ Usuario.cs              # Modelo de usuario
│   └─ Tarea.cs                # Modelo de tarea
│
├─ Data
│   └─ TareasDbContext.cs      # DbContext con DbSets y relaciones
│
├─ Program.cs                  # Configuración de servicios, JWT, CORS
└─ appsettings.json            # Conexión a SQL Server y configuración JWT

Estructura del frontend
/Frontend
│
├─ src
│   ├─ api
│   │   └─ api.js             # Configuración de Axios con baseURL
│   ├─ components
│   │   ├─ Login.jsx           # Componente de login
│   │   ├─ Dashboard.jsx       # Pantalla principal de tareas
│   │   └─ TareaForm.jsx       # Formulario para agregar tareas
│   └─ index.js                # Punto de entrada de React
└─ package.json                # Dependencias de React

Configuración
Backend

Configurar la conexión a SQL Server en appsettings.json:

"ConnectionStrings": {
  "DefaultConnection": "Server=localhost;Database=tareas_db;Trusted_Connection=True;TrustServerCertificate=True;"
},
"Jwt": {
  "Key": "ClaveSecretaSuperLargaQueTieneMasDe32Caracteres!!!",
  "Issuer": "TareasApi",
  "Audience": "TareasClient",
  "ExpiresInMinutes": 60
}


Crear la base de datos y tablas:

CREATE TABLE usuarios (
    id INT IDENTITY PRIMARY KEY,
    usuario NVARCHAR(100) NOT NULL,
    contraseña NVARCHAR(256) NOT NULL
);

CREATE TABLE tareas (
    id INT IDENTITY PRIMARY KEY,
    titulo NVARCHAR(255) NOT NULL,
    descripcion NVARCHAR(MAX),
    completada BIT DEFAULT 0,
    usuario_id INT NOT NULL FOREIGN KEY REFERENCES usuarios(id)
);


Ejecutar el backend:

cd Backend
dotnet run


Swagger disponible en http://localhost:5149/swagger

Endpoint login: POST /api/auth/login

Nota: Para desarrollo con React, se recomienda no usar HTTPS redirection y habilitar CORS para http://localhost:3000.

Frontend

Instalar dependencias:

cd Frontend
npm install


Configurar Axios en src/api/api.js:

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5149/api",
});

export default api;


Ejecutar React:

npm start


La app correrá en http://localhost:3000

Funcionalidades
Autenticación

Login con usuario y contraseña.

Emisión de JWT y almacenamiento en localStorage.

Rutas protegidas usando guards y token Bearer.

Gestión de tareas

Crear tarea (POST /api/tareas)

Listar tareas del usuario logueado (GET /api/tareas)

Editar tarea (PUT /api/tareas/{id})

Eliminar tarea (DELETE /api/tareas/{id})

Seguridad

Contraseñas almacenadas con BCrypt.

Endpoints protegidos mediante JWT.

Manejo de errores de autenticación centralizado.

Notas importantes

Para desarrollo se recomienda usar HTTP en vez de HTTPS para evitar problemas con preflight y CORS en React.

La clave JWT debe ser mínimo 32 caracteres para que HMAC-SHA256 funcione.

El frontend y backend deben ejecutarse en puertos diferentes (React: 3000, Backend: 5149).
