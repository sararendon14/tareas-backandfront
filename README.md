# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

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
