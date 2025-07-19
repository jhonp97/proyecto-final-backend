
import express from "express";

//middlewares
import { authMiddleware } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

// Controladores de autenticacion
import { agregarFavorito, eliminarFavorito, obtenerFavoritos } from "../controllers/favoritos.controller.js";
import {registerUser,loginUser,getCurrentUser} from "../controllers/auth.controller.js";
import { updatePerfil } from "../controllers/user.controller.js";
import { ActualizarReseña, CrearReseña, EliminarReseña, ObtenerReseñas, verMisReseñas } from "../controllers/review.controller.js";
import { agregarAListaPrivada, eliminarFavoritoPriv, obtenerFavoritosPriv } from "../controllers/privateList.controller.js";


const router = express.Router();


//  AUTENTICACIÓN
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.get("/auth/me", authMiddleware, getCurrentUser);


//  RUTA DE PERFIL DE USUARIO (PROTEGIDA) 
router.put("/perfil", authMiddleware,upload.single("fotoPerfil"), updatePerfil);



//  FAVORITOS - RUTAS PROTEGIDAS
router.get("/favoritos", authMiddleware, obtenerFavoritos);
router.post("/favoritos", authMiddleware, agregarFavorito);
router.delete("/favoritos/:animeId", authMiddleware, eliminarFavorito)

// RESEÑAS
router.post('/reviews', authMiddleware, CrearReseña);
router.get('/reviews/my-reviews', authMiddleware, verMisReseñas);
router.get('/reviews/:animeId', ObtenerReseñas);
router.put('/reviews/:reviewId', authMiddleware, ActualizarReseña);
router.delete('/reviews/:reviewId', authMiddleware, EliminarReseña);

// LISTA PRIVADA
router.get("/listaPrivada", authMiddleware, obtenerFavoritosPriv);
router.post('/listaPrivada', authMiddleware, agregarAListaPrivada);
router.delete("/listaPrivada/:animeId", authMiddleware, eliminarFavoritoPriv)



export { router };
