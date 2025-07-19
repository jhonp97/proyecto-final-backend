
import express from "express";

import { authMiddleware } from "../middleware/auth.middleware.js";
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from "../controllers/favoritos.controller.js";
// Controladores de autenticacion
import {registerUser,loginUser,getCurrentUser} from "../controllers/auth.controller.js";
import { updatePerfil } from "../controllers/user.controller.js";
import upload from "../middleware/upload.middleware.js";
import { ActualizarReseña, CrearReseña, EliminarReseña, ObtenerReseñas, verMisReseñas } from "../controllers/review.controller.js";
import { agregarAListaPrivada, obtenerFavoritosPriv } from "../controllers/privateList.controller.js";


const router = express.Router();


//  AUTENTICACIÓN
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getCurrentUser);


//RUTA BASE API



//  USUARIOS - RUTAS PROTEGIDAS
router.post("/favoritos", authMiddleware, agregarFavorito);
 router.put("/perfil", authMiddleware,upload.single("fotoPerfil"), updatePerfil);
 router.get("/favoritos", authMiddleware, obtenerFavoritos);
router.delete("/favoritos/:animeId", authMiddleware, eliminarFavorito)

// RESEÑAS
router.post('/reviews', authMiddleware, CrearReseña);
router.get('/reviews/my-reviews', authMiddleware, verMisReseñas);
router.get('/reviews/:animeId', ObtenerReseñas);
router.put('/reviews/:reviewId', authMiddleware, ActualizarReseña);
router.delete('/reviews/:reviewId', authMiddleware, EliminarReseña);

// LISTA PRIVADA
router.post('/listaPrivada', authMiddleware, agregarAListaPrivada);
router.get("/listaPrivada", authMiddleware, obtenerFavoritosPriv);
router.delete("/listaPrivada/", authMiddleware, eliminarFavorito)



export { router };
