
import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from "../controllers/favoritos.controller.js";
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


//RUTA BASE API



//  USUARIOS - RUTAS PROTEGIDAS
router.post("/favoritos", authMiddleware, agregarFavorito);
//  router.put("/perfil", authMiddleware, updatePerfil);
 router.get("/favoritos", authMiddleware, obtenerFavoritos);
router.delete("/favoritos/:animeId", authMiddleware, eliminarFavorito)

// RUTAS PÚBLICAS


export { router };
