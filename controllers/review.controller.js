import { Review } from "../db/models/review"
import { User } from "../db/models/user"


export const CrearReseña = async (req, res, next) => {
try{
    const {animeId, rating, comment}= req.body;
    const userId= req.userId
    // creo la reseña
    const newReview= await Review.create({
        animeId,
        user:userId,
        rating,
        comment
    });

    //añado la referencia al usuario
    await User.findByIdAndUpdate(userId,{$push: {reseñas:newReview._id}})
    res.status(201).json(newReview);
}catch(error){
    // manejo el error si el usuario ya ha hecho reseña a este anime
    res.status(400).json({msg: "Ya has puesto una reseña"})
    
}next(error);
}

export const ObtenerReseñas = async (req, res, next) => {
}

export const ActualizarReseña = async (req, res, next) => {
}

export const EliminarReseña = async (req, res, next) => {
}