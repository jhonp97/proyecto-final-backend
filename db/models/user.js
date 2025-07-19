// creo el modelo del usuario que se guardara en la base de datos MongoDB 


import mongoose from "mongoose";

const options = {
  collection: "users", // nombre de la coleccion en MongoDB
  strict: true, // solo permite guardar los campor definidos en el eschema 
  timestamps: true, // agrega createdAt y updatedAt automaticamente
  collation: {
    locale: "es", // idioma de la coleccion
    strength: 1 // ignora mayusculas y minusculas
  }
}


const userSchema = new mongoose.Schema({


  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // para que tenga al menos 6 caracteres
  },
  bio: {
    type: String,
    maxlength: 160, // para que no tenga mas de 160 caracteres
    default: "Hola mundo de Aniverse", // mensaje por defecto
    trim: true,
  },
  fotoPerfil: {
    type: String,
    default: "/img/avatar1.PNG", // URL de la foto de perfil por defecto
  },
  favoritos: [{
    animeId: { type: Number, required: true }, // ID del anime favorito
    title: { type: String, required: true }, // Título del anime favorito
    image: { type: String, required: true }, // URL de la imagen del anime
    genero: { type: String}, // genero del anime
    score : { type: Number, default: 0}, // puntuación del anime
    fecha: { type: Date, default: Date.now }, // Fecha de adición del anime a favoritos

  }],

  listaPrivada: [{
    animeId: { type: Number, required: true },
    title: { type: String, required: true }, 
    image: { type: String, required: true },
  }],

  reseñas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Review', // referencia a la colección de reseñas
  }],

  amigos:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],

  solicitudAmistad: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],
}, options);


export const User = mongoose.model("User", userSchema);
