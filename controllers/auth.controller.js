import { User } from "../db/models/user.js"; 

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { jwtSecret } from "../config/config.js";

const ResponseApi = {
  msg: "",
  status: "ok",
  data: {},
};


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ msg: "El usuario no existe" });
    }

    // Comparar contraseña
    const esCorrecta = await bcrypt.compare(password, existingUser.password);
    if (!esCorrecta) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    // Firmar el token
    const token = jwt.sign(
      {
        id: existingUser._id,
        username: existingUser.username,
      },
      jwtSecret,
      { expiresIn: "7d" });
       console.log("JWT_SECRET usado para verificar:", jwtSecret)
   
    ResponseApi.msg = "Inicio de sesión correcto";
    ResponseApi.data = {
      id: existingUser._id,
      email: existingUser.email,
      username: existingUser.username,
      token,
    };

    return res.status(200).json(ResponseApi);
  } catch (error) {
    next(error);
  }
};

//  REGISTRO
export const registerUser = async (req, res, next) => {
  try {
    const { email, password, username } = req.body;

    // Validar datos
    if (!email || !password || !username) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    // Verificar si ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        msg: "Ese correo ya está registrado. Inicia sesión.",
      });
    }

    // Hashear contraseña 
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const nuevoUsuario = new User({
      email,
      password: hashedPassword,
      username,
    });

    await nuevoUsuario.save();

    // Crear token
    const token = jwt.sign(
      {
        id: nuevoUsuario._id,
        username: nuevoUsuario.username,
      },
      jwtSecret,
      { expiresIn: "7d" }
    );

    // Preparar respuesta
    ResponseApi.msg = "Usuario registrado correctamente";
    ResponseApi.data = {
      id: nuevoUsuario._id,
      email: nuevoUsuario.email,
      username: nuevoUsuario.username,
      token,
    };

    return res.status(201).json(ResponseApi);
  } catch (error) {
    next(error);
  }
};

//  USUARIO ACTUAL
export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.userId; // Viene desde authMiddleware

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    ResponseApi.msg = "Datos del usuario encontrados";
    ResponseApi.data = user;

    return res.status(200).json(ResponseApi);
  } catch (error) {
    next(error);
  }
};
