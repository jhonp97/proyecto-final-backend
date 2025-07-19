import { User } from '../db/models/user.js';

//ver amigos y solicitudes
export const obtenerDatosAmigos = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId)
      .populate('amigos', 'username fotoPerfil')
      .populate('solicitudAmistad', 'username fotoPerfil');

    res.status(200).json({
      amigos: user.amigos,
      solicitudes: user.solicitudAmistad
    });
    console.log(`mis amigos son ${amigos.lenght} y mis solicitudes son ${solicitudes.lenght}`)
  } catch (error) {
    next(error);
  }
};

// Aceptar una solicitud
export const AceptarSolicitudAmigo = async (req, res, next) => {
  try {
    const { requestId } = req.params; // ID del usuario que envió la solicitud
    const userId = req.userId; // ID del usuario actual

    // Añadir amigo a ambas listas
    await User.findByIdAndUpdate(userId, {
      $pull: { solicitudAmistad: requestId },
      $addToSet: { amigos: requestId }
    });
    await User.findByIdAndUpdate(requestId, {
      $addToSet: { amigos: userId }
    });

    console.log(`nuevo amigo agregado, total: ${amigos.lenght} amigos y mis solicitudes son ${solicitudes.lenght}`)
    res.status(200).json({ msg: "Solicitud de amistad aceptada." });
  } catch (error) {
    next(error);
  }
};

//ENVIAR SOLICITUD 
export const enviarSolicitud=async(req, res, next )=>{
    try{
        const {usuarioQueRecibe} =req.params; //Id del ususario que recibe la solicitud
        const usuarioQueEnvia= req.userId //Id del usuario que la envia

        await User.findByIdAndUpdate(usuarioQueRecibe,{
            $addToSet: {solicitudAmistad: usuarioQueEnvia}
        })

        console.log(`solicitud enviada a ${usuarioQueRecibe}`)
        res.status(200).json({ msg: "Solicitud de amistad enviada." });
    } catch(error){
        next(error)
    }
}


//RECHAZAR SOLICITUD
export const rechazarSolicitudAmistad = async (req, res, next) => {
  try {
      const {usuarioQueEnvia} = req.params; 
    const  usuarioQueRecibe = req.userId; 

    // la elimin0 de la lista de solicitudes
    await User.findByIdAndUpdate(usuarioQueRecibe, {
      $pull: { solicitudAmistad: usuarioQueEnvia}
    });

    console.log(`se ha rechazado la solicitud de ${usuarioQueEnvia}`)
    res.status(200).json({ msg: "Solicitud de amistad rechazada." });
  } catch (error) {
    next(error);
  }
};