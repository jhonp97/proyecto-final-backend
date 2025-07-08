
import jwt from "jsonwebtoken";
import { jwtSecret } from "../config/config.js";

export const authMiddleware = (req, res, next) => {
  try {
    console.log(" Verificando autenticación...");

    // Leer y limpiar el token
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ msg: "Acceso denegado. Token faltante" });
    }

    // Verificar token con tu jwtSecret
    const payload = jwt.verify(token, jwtSecret);
    console.log(" Token válido:", payload);

    // Guardar datos en req para usarlos en controladores
    req.userId = payload.id; // esto es lo que se guarda en el token en login
    next();

  } catch (e) {
    res.status(401).json({
      msg: "Acceso denegado. Token inválido o expirado",
      error: e.message,
    });
  }
};
