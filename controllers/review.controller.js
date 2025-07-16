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
    next(error);
}
}

export const ObtenerReseñas = async (req, res, next) => {
    try{
        const{animeId}=req.params;
        const reviews= await Review.find({animeId}).populate("user", "username fotoPerfil")
        res.status(200).json(reviews);
    }catch(error){
        next(error);
    }
}

export const ActualizarReseña = async (req, res, next) => {
}

export const EliminarReseña = async (req, res, next) => {
}