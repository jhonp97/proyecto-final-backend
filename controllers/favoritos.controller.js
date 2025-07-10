import { User } from "../db/models/user.js";
import { listaFavoritose } from "../db/models/listaFavoritos.js";

// aqui es para agregar los animes a favoritos
export const agregarFavorito = async (req, res, next) => {
  try {
    const { animeId } = req.body;
    const usuarioId = req.userId; // viene del middleware
  
    // const yaExiste = await WatchedMovie.findOne({ usuarioId, tmdbId });
    // if (yaExiste) {
    //   return res.status(400).json({ msg: "Ya habías agregado esta película" });
    // }

//     const nuevaPelicula = new WatchedMovie({
//       usuarioId,
//       tmdbId,
//       titulo,
//       poster,
//       calificacion,
//     });

//     await nuevaPelicula.save();
//     res.status(201).json({ msg: "Película agregada", pelicula: nuevaPelicula });

  } catch (error) {
    next(error);
   }
};

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
