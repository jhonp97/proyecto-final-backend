
import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";

// Controladores de autenticacion
import {
  registerUser,
  loginUser,
  getCurrentUser
} from "../controllers/auth.controller.js";



const router = express.Router();


//  AUTENTICACIÓN
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getCurrentUser);


//PELICULAS RUTA BASE API
// router.use("/tmdb", tmdbRoutes); 


//  USUARIOS - RUTAS PROTEGIDAS
//  router.put("/perfil", authMiddleware, updatePerfil);
// router.post("/favoritos", authMiddleware, agregarFavorito);
//  router.get("/favoritos", authMiddleware, obtenerFavoritos);


// //  PELÍCULAS - RUTAS PÚBLICAS
// router.get("/peliculas/publica/:username", obtenerListaPublica);

export { router };
