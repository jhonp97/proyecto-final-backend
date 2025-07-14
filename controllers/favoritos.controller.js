import { User } from "../db/models/user.js";

// aqui es para agregar los animes a favoritos
export const agregarFavorito = async (req, res, next) => {
  try {
    // mis datos del fronmtend
    const { animeId, title, image } = req.body;
    //id del usuario
    const userId = req.userId; 
  
   const user = await User.findById(userId);
    if (!user) {
     return res.status(404).json({ msg: "Usuario no encontrado" });
     }
await User.updateOne(
  {_id: userId},
  {$push: {favoritos: {animeId, title, image}}}
)
res.status(200).json({msg: "Anime añadido a favoritos"})
  } catch (error) {
    next(error);
   }
};

//obtener favoritos
export const obtenerFavoritos = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('favoritos');
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json(user.favoritos);
  } catch (error) {
    next(error);
  }
};

//eliminar favorito
export const eliminarFavorito= async (req, res, next)=>{
  try{
    const {animeId}= req.params //se obtiene el ID del anime del link
    const userId =req.userId;
    // aqui uso $pull para quitar el objeto de la loista de favortiros al desmarcar el boton de favoritos
    await User.updateOne(
      {_id: userId},
      {$pull: {favoritos:{animeId:Number(animeId)}}}
    )
    res.status(200).json({msg:"se eliminó el anime"})
  }catch(error){
    next(error);
  }
}

//     const nuevaPelicula = new WatchedMovie({
//       usuarioId,
//       tmdbId,
//       titulo,
//       poster,
//       calificacion,
//     });

//     await nuevaPelicula.save();
//     res.status(201).json({ msg: "Película agregada", pelicula: nuevaPelicula });


// // Ver las  peliculas vistas del usuario autenticado
// export const obtenerPeliculasVistas = async (req, res, next) => {
//   try {
//     const usuarioId = req.userId;

//     const peliculas = await WatchedMovie.find({ usuarioId }).sort({ createdAt: -1 });
//     res.json({ peliculas });
//   } catch (error) {
//     next(error);
//   }
// };

// // Modificar calificación de una película
// export const calificarPelicula = async (req, res, next) => {
//   try {
//     const usuarioId = req.userId;
//     const { id } = req.params;
//     const { calificacion } = req.body;

//     const pelicula = await WatchedMovie.findOne({ _id: id, usuarioId });
//     if (!pelicula) {
//       return res.status(404).json({ msg: "Película no encontrada" });
//     }

//     pelicula.calificacion = calificacion;
//     await pelicula.save();

//     res.json({ msg: "Calificación actualizada", pelicula });
//   } catch (error) {
//     next(error);
//   }
// };



// export const obtenerListaPublica = async (req, res, next) => {
//   try {
//     const { username } = req.params;

//     const usuario = await User.findOne({ username });
//     if (!usuario) {
//       return res.status(404).json({ msg: "Usuario no encontrado" });
//     }

//     const peliculas = await WatchedMovie.find({ usuarioId: usuario._id }).sort({ createdAt: -1 });
//     res.json({ username, peliculas });
//   } catch (error) {
//     next(error);
//   }
// };
