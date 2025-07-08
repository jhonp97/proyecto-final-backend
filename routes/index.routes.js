
import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";

// Controladores de autenticacion
import {
  loginUser,
  registerUser,
  getCurrentUser
} from "../controllers/auth.controller.js";

// Controladores de peliculas
// import {
//   agregarPeliculaVista,
//   obtenerPeliculasVistas,
//   calificarPelicula,
//   obtenerListaPublica
// } from "../controllers/movie.controller.js";

// import tmdbRoutes from "./tmdb.routes.js";


const router = express.Router();


//  AUTENTICACIÓN
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getCurrentUser);


//PELICULAS RUTA BASE API
// router.use("/tmdb", tmdbRoutes); 


//  PELÍCULAS - RUTAS PROTEGIDAS
// router.get("/peliculas/mis-peliculas", authMiddleware, obtenerPeliculasVistas);
// router.post("/peliculas/agregar", authMiddleware, agregarPeliculaVista);
// router.patch("/peliculas/calificar/:id", authMiddleware, calificarPelicula);


// //  PELÍCULAS - RUTAS PÚBLICAS
// router.get("/peliculas/publica/:username", obtenerListaPublica);

export { router };
