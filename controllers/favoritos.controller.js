import { User } from "../db/models/user.js";

// aqui es para agregar los animes a favoritos
export const agregarFavorito = async (req, res, next) => {
  try {
    // mis datos del fronmtend
    const { animeId, title, image, genero } = req.body;
    //id del usuario
    const userId = req.userId; 
  
   const user = await User.findById(userId);
    if (!user) {
     return res.status(404).json({ msg: "Usuario no encontrado" });
     }
await User.updateOne(
  {_id: userId},
  // {$push: {favoritos: {animeId, title, image}}}
  // cambio $push por $addToSet para evitar duplicados porque al probarlo varias veces se agregaba el mismo anime
  { $addToSet: { favoritos: { animeId, title, image, genero, fecha:new Date() } } }
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

