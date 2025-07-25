import { Review } from "../db/models/review.js"
import { User } from "../db/models/user.js"

// CREAR RESEÑA
export const CrearReseña = async (req, res, next) => {
try{
    const {animeId, rating, comment, animeTitle, animeImage}= req.body;
    const userId= req.userId
    // creo la reseña en la base de datos 
    const newReview= await Review.create({
        animeId,
        user:userId, // se asocia al usuario 
        animeTitle,
        animeImage,
        rating,
        comment
    });

    //añado la referencia al usuario
    await User.findByIdAndUpdate(userId,{$push: {reseñas:newReview._id}})
    console.log("Nueva reseña creada:", newReview);
    res.status(201).json(newReview);
}catch(error){
    next(error);
}
}

// OBTENER RESEÑAS
export const ObtenerReseñas = async (req, res, next) => {
    try{
        const{animeId}=req.params;
        // busco todas las reseñas a un anime y populo los datos del usuario
        const reviews= await Review.find({animeId}).populate("user", "username fotoPerfil")
        console.log("Reseñas obtenidas:", reviews);
        res.status(200).json(reviews);
    }catch(error){
        next(error);
    }
}

// ACTUALIZAR RESEÑAS
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
    // actualizo los campos 
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    const updatedReview = await review.save();

    console.log("Reseña actualizada:", updatedReview);
    res.status(200).json(updatedReview);
  } catch (error) {
    next(error);
  }
}

// ELIMINAR RESEÑA
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
    console.log("Reseña eliminada:", reviewId);
    res.status(200).json({msg: "Reseña eliminada correctamente." });
  } catch (error) {
    next(error);
  }
}

export const verMisReseñas= async (req, res, next)=>{
  // esta funcion es para ver las reseñas del usuario logueado
  // se usa en el perfil del usuario
  // se ordenan por fecha de creacion
  try{
    const misReseñas= await Review.find({user: req.userId}).sort({createdAt: -1})

    console.log("Mis reseñas:", misReseñas);
    res.status(200).json(misReseñas)
  }catch(error){
    next(error);
  }
}