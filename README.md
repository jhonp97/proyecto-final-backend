# proyecto-final-backend

# Aniverse API - El Backend

### Sobre que trata?

Éste proyecto es como el cerebro de mi web, se encarga de:
* Registar y loguear usuarios de forma segura con contraseñas hasheadas
* Conectarse a una base de datos en mongoDB para guardar toda la informacion del usuario
* gestionar las listas tanto de favoritos como de privados de cada usuario
* Manejar un sistema de comentarios o reseñas y de solicitudes para los amigos
* obtener info de los demas perfiles de otros usuarios para poder visitar su perfil publico
* Obtener los animes desde la Api de Jikan para mostrarlos en el front

### Estructura del proyecto

```bash
+---config
|       config.js
|       
+---controllers
|       animes.controller.js
|       auth.controller.js
|       favoritos.controller.js
|       friend.controller.js
|       privateList.controller.js
|       review.controller.js
|       user.controller.js
|       
+---db
|   |   mongoose.js
|   |   
|   \---models
|           review.js
|           user.js
|           
+---middleware
|       auth.middleware.js
|       error.middleware.js
|       upload.middleware.js
|       
|           
+---public
|   \---uploads
|           fotoPerfil-1752605921942.jpeg
|           fotoPerfil-1752695395840.webp
|           
\---routes
|       index.routes.js
|
|   .env.example
|   index.js
|   package-lock.json
|   package.json
|   PRUEBAS.REST
|_  README.md
```



### Mis dependencias fueron:

* **Node y Express:** para montar el servidor
* **MongoDB:** como base de datos, con mongoose y aparte compass para visualizar mejor la BD
* **bcrypt:** para que las contraseñas sea seguras
* **Multer:** para poder subir fotos para ponerlas de perfil en este caso
* **Dotenv:** para guardar las claves secretas y que no se vean en el codigo
* **Cors:** para que se pueda comunicar correctamente con el front

### Instalación:

1. Clonar el repositorio desde github (github desktop)
2. Instalar las dependecias: `npm install`
3. Crear un archivo `.env` y rellenarlo con el ejemplo del archivo `.env.example`
4. Ejecutarlo con `npm run dev`

El servidor deberia estar corriendo en `http://localhost:5000`
