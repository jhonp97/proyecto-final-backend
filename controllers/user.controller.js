import { User } from "../db/models/user.js";

export const updatePerfil = async(req, res, next) => {
try{
    // 1-busco el usuario por el id del token
    const user = await User.findById(req.userId)
    if(!user){
        return res.status(404).json({msg: "usuario no encontrado"})
    }
    // 2-actualizo los input para editar
    user.username= req.body.username || user.username;
    user.bio = req.body.bio || user.bio;

    //3-subida de foto de perfil
    //esta parte la he investigado para poder hacerla con multer
    if(req.file){
        console.log("archivo recibido: ", req.file);
       user.fotoPerfil=`/uploads/${req.file.filename}`
    }
    //4- guardo el usuario actualizado en la base de datos
    const updateUser= await user.save();
    //5- devuelvo el usuario actualizado
    res.status(200).json(updateUser) 
} catch(error){
    next(error)
} }
 
//PERFIL PUBLICO
export const getPublicProfile = async (req, res, next) => {
  try {
    const { username } = req.params;
    const userProfile = await User.findOne({ username })
      .select('username fotoPerfil bio favoritos reseñas'); // Solo los campos públicos
    
    if (!userProfile) {
      return res.status(404).json({ msg: "Usuario no encontrado." });
    }
    // console.log("")
    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};