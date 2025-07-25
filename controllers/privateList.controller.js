import { User } from "../db/models/user.js";

// añadir un anime a la lista privada
export const agregarAListaPrivada= async (req, res, next) => {
  try {
    // obtengo los datos del anime desde el front
    const { animeId, title, image, score, genero} = req.body;
    await User.updateOne(
  {_id: req.userId},
  { $addToSet: { listaPrivada: { animeId, title, image, score, genero }}}
)
res.status(200).json({msg: "Anime añadido a la lista privada"})
  } catch (error) {
    next(error);
   }
};

//obtener favoritos
export const obtenerFavoritosPriv = async (req, res, next) => {
  try {
    //busco el usuario por su Id y selecciono el campo de listaPrivada
    const user = await User.findById(req.userId).select('listaPrivada');
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    res.status(200).json(user.listaPrivada); // envio el resultado a listatPrivada
  } catch (error) {
    next(error);
  }
};

//eliminar favorito
export const eliminarFavoritoPriv= async (req, res, next)=>{
  try{
    const {animeId}= req.params //se obtiene el ID del anime del link
    const userId =req.userId;
    // aqui uso $pull para quitar el objeto de la loista de favortiros al desmarcar el boton de favoritos
    await User.updateOne(
      {_id: userId},
      {$pull: {listaPrivada:{animeId:Number(animeId)}}}
    )
    res.status(200).json({msg:"Se eliminó el anime de la lista privada"})
  }catch(error){
    next(error);
  }
}

