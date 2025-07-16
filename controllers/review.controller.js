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
     try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const userId = req.userId;
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ msg: "Reseña no encontrada." });
    }
    //se verifica que el usuario que actualiza es el autor de la reseña para que sea aun mas seguro
    if (review.user.toString() !== userId) {
      return res.status(403).json({ msg: "No autorizado para editar esta reseña." });
    }
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
}

export const EliminarReseña = async (req, res, next) => {
    try {
    const { reviewId } = req.params;
    const userId = req.userId;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ msg: "Reseña no encontrada." });
    }
    //se verifica que el usuario que actualiza es el autor de la reseña para que sea aun mas seguro
    if (review.user.toString() !== userId) {
      return res.status(403).json({ msg: "No autorizado para editar esta reseña." });
    }
    await review.deleteOne()
    //se elimina la referencua del array del usuario
    await User.findByIdAndUpdate(userId, { $pull: { reseñas: reviewId } });
    res.status(200).json({msg: "Reseña eliminada correctamente." });
  } catch (error) {
    next(error);
  }
}