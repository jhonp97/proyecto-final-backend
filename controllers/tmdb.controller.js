
// import { tmdbKey, tmdbAccessToken } from "../config/config.js";

// const BASE_URL = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";


// //  FILTRAR películas por género, año, popularidad, calificación
// export const filtrarPeliculas = async (req, res, next) => {
//   try {
//     const { genero, anio, minRating, sortBy } = req.query;

//     const query = new URLSearchParams({
//       api_key: tmdbKey,
//       language: "es-ES",
//       sort_by: sortBy || "popularity.desc",
//       ...(genero && { with_genres: genero }),
//       ...(anio && { primary_release_year: anio }),
//       ...(minRating && { "vote_average.gte": minRating }),
//       page: 1
//     });

//     const url = `${BASE_URL}/discover/movie?${query.toString()}`;

//     const response = await fetch(url);
//     if (!response.ok) throw new Error(`Error ${response.status}`);

//     const data = await response.json();
//     res.json(data);
//   } catch (err) {
//     next(err);
//   }
// };




// // Películas populares
// export const getPeliculasPopulares = async (req, res, next) => {
//   try {
//     const params = new URLSearchParams({
//       api_key: tmdbKey,
//       language: "es-ES",
//       page: req.query.page || 1
//     });

//     const apiURL = `${BASE_URL}/movie/popular?${params.toString()}`;
//     const response = await fetch(apiURL);

//     if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (err) {
//     next(err);
//   }
// };

// // Detalle de una película
// export const getDetallePelicula = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     const apiURL = `${BASE_URL}/movie/${id}?api_key=${tmdbKey}&language=es-ES`;
//     const response = await fetch(apiURL);

//     if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (err) {
//     next(err);
//   }
// };

// // Buscar películas por título
// export const buscarPeliculas = async (req, res, next) => {
//   try {
//     const query = req.query.query;

//     if (!query) return res.status(400).json({ msg: "Debe enviar el parámetro 'query'" });

//     const apiURL = `${BASE_URL}/search/movie?api_key=${tmdbKey}&language=es-ES&query=${encodeURIComponent(query)}`;
//     const response = await fetch(apiURL);

//     if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);

//     const data = await response.json();
//     res.status(200).json(data);
//   } catch (err) {
//     next(err);
//   }
// };
