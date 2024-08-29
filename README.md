# Tertulia Literaria API

La **API de Tertulia Literaria** está construida utilizando [NestJS](https://nestjs.com/) y está diseñada para servir a la comunidad de Tertulia Literaria en Discord. Proporciona varios endpoints para gestionar contenido relacionado con la literatura y facilitar el intercambio de conocimiento.

## Descripción del Proyecto

Esta API ofrece funcionalidades para la gestión de eventos, publicaciones y otros contenidos relacionados con la literatura y el conocimiento dentro de la comunidad de Tertulia Literaria. Se ha implementado con una arquitectura modular utilizando NestJS, con soporte para bases de datos relacionales mediante TypeORM y PostgreSQL. También incluye documentación generada automáticamente con Swagger y pruebas automatizadas con Jest.

### Tecnologías Utilizadas

- **NestJS**: Un framework para construir aplicaciones del lado del servidor de manera eficiente.
- **TypeORM**: ORM que facilita la interacción con bases de datos.
- **PostgreSQL**: Base de datos relacional.
- **Swagger**: Generación automática de documentación de la API.
- **Jest**: Marco de pruebas para Node.js.

## Documentación de la API

La documentación completa de la API está disponible en el siguiente enlace:

[https://tertulialiteraria-api-zlkelu7v2a-uc.a.run.app/api](https://tertulialiteraria-api-zlkelu7v2a-uc.a.run.app/api)

## Primeros Pasos

### Requisitos Previos

- Node.js >= 14.x
- npm >= 6.x o yarn >= 1.x
- PostgreSQL

### Instalación

1. Clona el repositorio:

    ```bash
    git clone https://github.com/stevenvo780/tertulialiteraria-api.git
    cd tertulia-literaria-api
    ```

2. Instala las dependencias:

    ```bash
    npm install
    ```

    o

    ```bash
    yarn install
    ```

3. Configura las variables de entorno creando un archivo `.env` en el directorio raíz del proyecto. Asegúrate de incluir la configuración de tu base de datos PostgreSQL y otras variables necesarias:

    ```bash
    DATABASE_URL=postgres://user:password@localhost:5432/tertulialiteraria
    ```

### Ejecutando la Aplicación

Puedes ejecutar la aplicación en diferentes modos según tu necesidad:

```bash
# Modo de desarrollo
npm run start

# Modo watch (con recarga automática)
npm run start:dev

# Modo de producción
npm run start:prod
```

### Usando Docker (Opcional)

Si prefieres usar Docker, asegúrate de tener Docker instalado y sigue estos pasos:

1. Construye la imagen de Docker:

    ```bash
    docker build -t tertulia-literaria-api .
    ```

2. Ejecuta el contenedor:

    ```bash
    docker run -p 3000:3000 tertulia-literaria-api
    ```

3. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación corriendo en Docker.

## Pruebas

La API incluye pruebas automatizadas. Puedes ejecutarlas utilizando los siguientes comandos:

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end (e2e)
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## Contribuciones

Este proyecto es de código abierto y está abierto a contribuciones de la comunidad. Si estás interesado en contribuir, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un nuevo Pull Request

## Soporte

Si encuentras útil la API de Tertulia Literaria, considera apoyar el proyecto contribuyendo con código, reportando issues o difundiendo el proyecto.

## Documentación API

https://tertulialiteraria-api-zlkelu7v2a-uc.a.run.app/api

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.