// 1- esquema para las reseñas, se necesita el animeId, el user, el rating que debe ser entre 1 y 5 (estrellas)
// y los comment que se les quitaran los espacios sobrantes al principio y al final
// 2- con timestamps marco cuando se creo y modificó la reseña
//3- luego se hace un indice para que el usuario solo pueda hacer un comentario o reseña por anime 
import mongoose from "mongoose";
//1
const reviewSchema= new mongoose.Schema({
    animeId:{ type: Number, require:true},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating:{
        type: Number,
        required:true,
        min:1,
        max:5,
    },
    comment:{
        type: String,
        required: true,
        trim: true,
    }
},{timestamps:true})//2

//3
reviewSchema.index({user:1, animeId:1}, {unique:true})

export const Review= mongoose.model("Review", reviewSchema);