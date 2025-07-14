import { User } from "../db/models/user";

export const updatePerfil = async(req, res, next) => {
try{
    const user = await User.findById(req.userId)
    if(!user){
        return res.status(404).json({msg: "usuario no encontrado"})
    }
    user.username= req.body.username || user.username;
    user.bio = req.body.bio || user.bio;
    //acordarme de poner el codigo para la foto
    
    const updateUser= awaituser.save();
    res.status(200).json(updateUser) 
} catch(error){
    next(error)
} }
 
