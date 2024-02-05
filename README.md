#  CENTRIBAL - Prueba Técnica

#### Candidato: **Luis Eduardo Belisario**

> ℹ  **_INFO_**  
>
> Primera sección del documento en Español y posterior en Ingles.
>
> First section of the document in Spanish and later in English.

**Requerimientos:**

Se requiere implementar una aplicación de gestión de artículos y pedidos; la misma, debe poder inventariar artículos que puedan ser añadidos a los pedidos.

**Requerimientos técnicos:**

La aplicación tiene que estar construida en REACT, tener un README.md con la explicación de la ejecución de la aplicación.

[Requerimientos Ampliados](https://res.cloudinary.com/dhw4kmb5x/image/upload/v1707142305/Centribal/requerimientospt_yowtdw.jpg)

## Vista Desktop de la aplicación.

![](documents/desktop.gif)

## Vista Mobile de la aplicación.

![](documents/mobile.gif)


**Realizado:** 

Se desarroyó una aplicación responsive de gestión de artículos y pedidos construida en React, dicha aplicación esta construida con un patrón de arquitectura hexagonal, lo que permite separa los componentes involucrados, utiliza json-server para proveer una API REST simple que permite realizar operaciones CRUD y cuenta con un controlador para realizar cambios de bases de datos. Cabe destacar que se empleó Docker para facilitar el despliegue de la aplicación y su implementación se detalla en este documento.

La aplicacición es una SPA, en donde el diseño planteado es una barra de navegación para las páginas de artículos y pedidos, además en la parte inferior se renderizan los componentes principales. 

La aplicación inicia en la vista de Artículos, en donde se puede observar una tabla con los artículos disponibles e información solicitada para el desafío; desde esta página se puede ir a nuevas vistas que permiten crear, editar y eliminar los artículos.

En la vista de Pedidos se puede observar una tabla con la información de los pedidos realizados, desde allí se puede eliminar los pedidos e ir a nuevas vistas que permiten crear, editar los pedidos.

Finalmente, el diseño de esta aplicación se inspiró en la página principal de Centribal, a la cual se puede acceder desde la imagen que muestra su logotipo en la barra de navegación. Los modelos de la aplicación están en la carpeta documents con los nombres articulos.drawio y pedidos.drawio, pueden ser visualizados con la extención de VSC Draw.io Integration, se implementó una pequeña prueba de consulta con jest y supertest.

## FrameWork utilizado

[Bootstrap](https://getbootstrap.com/), este marco de trabajo me dió la posibilidad de crear un proyecto responsive con menor cantidad de horas de desarrollo y se adaptó perfectamente a los requerimientos de la aplicación. 

## Librerías utilizadas

- [Google Fonts](https://fonts.google.com/knowledge): Esta librería aportó los estilos empleados en las fuentes.

- [React-router-dom](https://reactrouter.com/en/main): Permitió enrutar de forma dinámica la aplicación.

- [React-spinners](https://www.npmjs.com/package/react-spinners): Inserta una animación indicativa de que el sítio esta trabajando con una promesa.

- [Axios](https://www.npmjs.com/package/axios): Permite hacer sencillas las operaciones como cliente HTTP.

- [uuid](https://www.npmjs.com/package/uuid): Genera un identificador universalmente único.

- [json-server](https://www.npmjs.com/package/json-server): Simula una API RESTful utilizando un archivo JSON como fuente de datos.

- [jest](https://jestjs.io/es-ES/docs/getting-started) y [supertest](https://www.npmjs.com/package/supertest): Realizar test unitario.

## Aplicación React con una API REST de servidor json y una base de datos simulada

Estructura del Proyecto:
```
.
├── backend
│   ├── ...
│   ├── Dockerfile
│   └── db.json
├── documents
├── frontend
│   ├── ...
│   ├── index.html
│   └── Dockerfile
├── docker-compose.yaml
└── README.md
```

## Uso con entornos de desarrollo Docker

Puede abrir este proyecto en Docker Desktop versión 4.26 o posterior.

1. Clonar el repositorio

```
git clone https://github.com/Lebs87/pruebacentribal.git
```
2. Debe tener instalado Docker y el motor funcionando, para ello debe tener abierto Docker Desktop.

3. Abrir el proyecto en un editor de código.

4. Abrir una terminal y correr el siguiente comando:

```
docker-compose up --build
```
- Resultado esperado, algo similar a:

```
[+] Running 2/0
 ✔ Container pruebacentribal-backend-1   Created                                                                                                                0.0s 
 ✔ Container pruebacentribal-frontend-1  Created                                                                                                                0.0s 
Attaching to backend-1, frontend-1
backend-1   | 
backend-1   | > start
backend-1   | > json-server --watch db.json --port 3001
backend-1   |
frontend-1  | 
frontend-1  | > frontend@0.0.0 dev
frontend-1  | > vite
frontend-1  |
backend-1   | --watch/-w can be omitted, JSON Server 1+ watches for file changes by default
backend-1   | JSON Server started on PORT :3001
backend-1   | Press CTRL-C to stop
backend-1   | Watching db.json...
backend-1   | 
backend-1   | ♡⸜(˶˃ ᵕ ˂˶)⸝♡
backend-1   |
backend-1   | Index:
backend-1   | http://localhost:3001/
backend-1   |
backend-1   | Static files:
backend-1   | Serving ./public directory if it exists
backend-1   |
backend-1   | Endpoints:
backend-1   | http://localhost:3001/articles
backend-1   | http://localhost:3001/orders
frontend-1  | 
frontend-1  |   VITE v5.0.12  ready in 946 ms
frontend-1  |
frontend-1  |   ➜  Local:   http://localhost:8080/
frontend-1  |   ➜  Network: http://172.20.0.2:8080/
```

5. Abrir otra terminal, correr el comando:
```
docker-compose ps
```
- Resultado esperado, algo similar a:

```
PS C:\Users\Desktop\pruebacentribal> docker-compose ps
NAME                         IMAGE                      COMMAND                  SERVICE    CREATED       STATUS          PORTS
pruebacentribal-backend-1    pruebacentribal-backend    "docker-entrypoint.s…"   backend    5 hours ago   Up 16 seconds   0.0.0.0:3001->3001/tcp
pruebacentribal-frontend-1   pruebacentribal-frontend   "docker-entrypoint.s…"   frontend   4 hours ago   Up 16 seconds   0.0.0.0:8080->8080/tcp
```
6. Abrir en una ventana del navegador los siguientes Endpoints para corroborar el funcionamiento de json-server.
```
http://localhost:3001/articles
```
```
http://localhost:3001/orders
```
7. Abrir en una ventana del navegador el siguiente Endpoint para acceder a la aplicación en local.
```
 http://localhost:8080/
```
> ℹ  **_INFO_**  
>
> De forma opcional se puede realizar una prueba con jest a una base de datos de prueba a manera de ejercicio:
> 1. Utiliza el comando siguiente para verificar que el contenedor esté activo.
>```
> docker ps 
>```
> 2. Accede al shell del contenedor con el comando: 
> ```
> docker exec -it pruebacentribal-backend-1 /bin/bash
> ```
> 3. Accede al shell del contenedor con el comando: 
> ```
> npm test
> ```
>- Resultado esperado, algo similar a:
>
>```
> test
> jest
>
> PASS  test/dbMockController.test.js
>  Pruebas para las solicitudes GET
>    ✓ Obtiene la lista de artículos (34ms)                                                      
>Test Suites: 1 passed, 1 total
>Tests:       1 passed, 1 total
>Snapshots:   0 total
>Time:        3.069 s
>Ran all test suites.
>root@a769a8fe6cfa:/app# 
>```


8. Detener la aplicación en la terminal, presione tecla ctrl + c. Tiene como resultado esperado:
```
Gracefully stopping... (press Ctrl+C again to force)
[+] Stopping 1/2
 ✔ Container pruebacentribal-frontend-1  Stopped                                                                                                               10.6s 
[+] Stopping 2/2ebacentribal-backend-1   Stopping                                                                                                              10.6s 
 ✔ Container pruebacentribal-frontend-1  Stopped                                                                                                               10.6s 
 ✔ Container pruebacentribal-backend-1   Stopped                                                                                                               10.7s 
backend-1 exited with code 0
canceled
```
9. Remover los contenedores.
```
docker compose down
```
- Resultado esperado, algo similar a:
```
[+] Running 3/3
 ✔ Container pruebacentribal-frontend-1             Removed                                                                                                     0.0s 
 ✔ Container pruebacentribal-backend-1              Removed                                                                                                     0.0s 
 ✔ Network pruebacentribal_pruebacentribal-network  Removed                                                                                                     0.3s 
PS C:\Users\Desktop\pruebacentribal> 
```

# CENTRIBAL - Technical Test

#### Candidate: **Luis Eduardo Belisario**

**Requirements:**

It is required to implement an item and order management application; It must be able to inventory items that can be added to orders.

**Technical requirements:**

The application must be built in REACT, have a README.md with the explanation of the execution of the application.

[Expanded Requirements](https://res.cloudinary.com/dhw4kmb5x/image/upload/v1707142305/Centribal/requerimientospt_yowtdw.jpg)


## Desktop view of the application.

![](documents/desktop.gif)

## Mobile view of the application.

![](documents/mobile.gif)

**Done:**

A responsive item and order management application was developed built in React, said application is built with a hexagonal architecture pattern, which allows the components involved to be separated, uses json-server to provide a simple REST API that allows CRUD operations and It has a controller to make database changes. It should be noted that Docker was used to facilitate the deployment of the application and its implementation is detailed in this document.

The application is a SPA, where the proposed design is a navigation bar for the article and order pages, and at the bottom the main components are rendered.

The application starts in the Articles view, where you can see a table with the available articles and information requested for the challenge; From this page you can go to new views that allow you to create, edit and delete articles.

In the Orders view you can see a table with information on the orders placed, from there you can delete the orders and go to new views that allow you to create and edit orders.

Finally, the design of this app was inspired by Centribal's home page, which can be accessed from the image showing their logo in the navigation bar. The models of the application are in the documents folder with the names articles.drawio and orders.drawio, they can be viewed with the VSC Draw.io Integration extension, , a small query test was implemented with jest and supertest.

## FrameWork used

[Bootstrap](https://getbootstrap.com/), This framework gave me the possibility of creating a responsive project with fewer development hours and was perfectly adapted to the requirements of the application.

## Libraries used

- [Google Fonts](https://fonts.google.com/knowledge): This library provided the styles used in the fonts.

- [React-router-dom](https://reactrouter.com/en/main):  Allowed dynamic routing of the application.

- [React-spinners](https://www.npmjs.com/package/react-spinners): Insert an animation indicating that the site is working with a promise.

- [Axios](https://www.npmjs.com/package/axios): Allows you to make operations as an HTTP client simple.

- [uuid](https://www.npmjs.com/package/uuid): Generates a universally unique identifier.

- [json-server](https://www.npmjs.com/package/json-server): Simulates a RESTful API using a JSON file as a data source.

- [jest](https://jestjs.io/es-ES/docs/getting-started) and [supertest](https://www.npmjs.com/package/supertest): Perform unit testing.

### React application with a json-server REST API & Mock Data Base

Project structure:
```
.
├── backend
│   ├── ...
│   ├── Dockerfile
│   └── db.json
├── documents
├── frontend
│   ├── ...
│   ├── index.html
│   └── Dockerfile
├── docker-compose.yaml
└── README.md
```

## Use with Docker Development Environments

You can open this project in Docker Desktop version 4.26 or later.

1. Clone the repository

```
git clone https://github.com/Lebs87/pruebacentribal.git
```
2. You must have Docker installed and the engine running, to do this you must have Docker Desktop open.

3. Open the project in a code editor.

4. Open a terminal and run the following command:

```
docker-compose up --build
```
- Expected result, something similar to:

```
[+] Running 2/0
 ✔ Container pruebacentribal-backend-1   Created                                                                                                                0.0s 
 ✔ Container pruebacentribal-frontend-1  Created                                                                                                                0.0s 
Attaching to backend-1, frontend-1
backend-1   | 
backend-1   | > start
backend-1   | > json-server --watch db.json --port 3001
backend-1   |
frontend-1  | 
frontend-1  | > frontend@0.0.0 dev
frontend-1  | > vite
frontend-1  |
backend-1   | --watch/-w can be omitted, JSON Server 1+ watches for file changes by default
backend-1   | JSON Server started on PORT :3001
backend-1   | Press CTRL-C to stop
backend-1   | Watching db.json...
backend-1   | 
backend-1   | ♡⸜(˶˃ ᵕ ˂˶)⸝♡
backend-1   |
backend-1   | Index:
backend-1   | http://localhost:3001/
backend-1   |
backend-1   | Static files:
backend-1   | Serving ./public directory if it exists
backend-1   |
backend-1   | Endpoints:
backend-1   | http://localhost:3001/articles
backend-1   | http://localhost:3001/orders
frontend-1  | 
frontend-1  |   VITE v5.0.12  ready in 946 ms
frontend-1  |
frontend-1  |   ➜  Local:   http://localhost:8080/
frontend-1  |   ➜  Network: http://172.20.0.2:8080/
```
5. Open another terminal, run the command:
```
docker-compose ps
```
- Expected result, something similar to:
```
PS C:\Users\Desktop\pruebacentribal> docker-compose ps
NAME                         IMAGE                      COMMAND                  SERVICE    CREATED       STATUS          PORTS
pruebacentribal-backend-1    pruebacentribal-backend    "docker-entrypoint.s…"   backend    5 hours ago   Up 16 seconds   0.0.0.0:3001->3001/tcp
pruebacentribal-frontend-1   pruebacentribal-frontend   "docker-entrypoint.s…"   frontend   4 hours ago   Up 16 seconds   0.0.0.0:8080->8080/tcp
```
6. Open the following Endpoints in a browser window to verify the operation of json-server.
```
http://localhost:3001/articles
```
```
http://localhost:3001/orders
```
7. Open the following Endpoint in a browser window to access the application locally.
```
 http://localhost:8080/
```
> ℹ **_INFO_**
>
> Optionally you can perform a test with jest on a test database as an exercise:
> 1. Use the following command to verify that the container is active.
>```
> docker ps
>```
> 2. Access the container shell with the command:
> ```
> docker exec -it pruebacentribal-backend-1 /bin/bash
> ```
> 3. Access the container shell with the command:
> ```
> npm test
> ```
>- Expected result, something similar to:
>
>```
> test
> jest
>
> PASS  test/dbMockController.test.js
>  Pruebas para las solicitudes GET
>    ✓ Obtiene la lista de artículos (34ms)                                                      
>Test Suites: 1 passed, 1 total
>Tests:       1 passed, 1 total
>Snapshots:   0 total
>Time:        3.069 s
>Ran all test suites.
>root@a769a8fe6cfa:/app# 
>```

8. Stop the application in terminal, press ctrl + c key. It has the expected result:
```
Gracefully stopping... (press Ctrl+C again to force)
[+] Stopping 1/2
 ✔ Container pruebacentribal-frontend-1  Stopped                                                                                                               10.6s 
[+] Stopping 2/2ebacentribal-backend-1   Stopping                                                                                                              10.6s 
 ✔ Container pruebacentribal-frontend-1  Stopped                                                                                                               10.6s 
 ✔ Container pruebacentribal-backend-1   Stopped                                                                                                               10.7s 
backend-1 exited with code 0
canceled
```
9. Remove the containers.
```
docker compose down
```
- Expected result, something similar to:
```
[+] Running 3/3
 ✔ Container pruebacentribal-frontend-1             Removed                                                                                                     0.0s 
 ✔ Container pruebacentribal-backend-1              Removed                                                                                                     0.0s 
 ✔ Network pruebacentribal_pruebacentribal-network  Removed                                                                                                     0.3s 
PS C:\Users\Desktop\pruebacentribal> 
```
