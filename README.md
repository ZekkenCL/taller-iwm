### Taller Introduccion al desarrollo web y movil

Los sistemas de gestión de usuarios son fundamentales para las empresas que comienzan a dar sus primeros pasos en el mundo digital, es por eso por lo que la empresa Dumbo Supermercados Ltda. ha convocado a los estudiantes de Introducción al Desarrollo Web/Móvil de la Universidad Católica del Norte para realizar su nuevo sistema de gestión de clientes.

## Requisitos Previos

Para ejecutar este proyecto, necesitarás instalar algunas herramientas y tecnologías en tu máquina:

- [Python](https://www.python.org/downloads/): Lenguaje de programación usado para el backend.
- [Node.js y npm](https://nodejs.org/en/download/): Node.js es el entorno de ejecución para JavaScript y npm es el gestor de paquetes.
- [MySQL](https://dev.mysql.com/downloads/installer/): Sistema de gestión de bases de datos.
- [Visual Studio Code](https://code.visualstudio.com/download): Editor de codigo

## Configuración del Backend

1. Clona el repositorio del proyecto:

        git clone https://github.com/ZekkenCL/taller-iwm.git

2. Navega al directorio del backend:

        cd backend

3. Instala un entorno virtual:

        pip install virtualenv

        virtualenv -p python3 venv

4. Activa el entorno virtual:

        Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

        .\venv\Scripts\activate

5. Instala las dependencias:

        pip install -r requirements.txt

6. Inicializa la base de datos:

        flask db init

        flask db migrate

        flask db upgrade

7. Ejecuta el seeder:

        python seeder.py

8. Ejecuta el servidor de Flask:

        python run.py

El servidor backend debería estar ahora ejecutándose en `http://localhost:5000/`.

## Configuración del Frontend

1. Navega al directorio del frontend:

    abre una nueva terminal:

        cd frontend

2. Instala las dependencias de Node.js:

        npm install

3. Ejecuta el servidor de desarrollo de React:

        npm start

El servidor frontend debería estar ahora ejecutándose en `http://localhost:3000/login`.


    




