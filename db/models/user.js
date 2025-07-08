import mongoose from "mongoose";

const options = {
    collection: "users", // nombre de la coleccion en MongoDB
    strict: true, // solo permite guardar los campor definidos en el eschema 
    collation: {
        locale: "es", // idioma de la coleccion
        strength: 1 // ignora mayusculas y minusculas
    }
}


const userSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    minlength: 3, // para que tenga al menos 3 caracteres
    maxlength: 30, // para que no tenga mas de 30 caracteres

  },
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3, 
    maxlength: 30, 
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // para que tenga al menos 6 caracteres
  },
  bio:{
    type: String,
    maxlength: 160, // para que no tenga mas de 160 caracteres
    default: ""
  },
  fotoPerfil:{
    type: String,
    default: "/img/avatar1.PNG" // URL de la foto de perfil por defecto
  },
  createdAt:{
        type: Date,
        default: Date.now
    }
},  options );

export const User = mongoose.model("User", userSchema);
