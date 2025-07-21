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
    console.log(`mis amigos son ${user.amigos.length} y mis solicitudes son ${user.solicitudAmistad.length}`)
  } catch (error) {
    next(error);
  }
};

// Aceptar una solicitud
export const AceptarSolicitudAmigo = async (req, res, next) => {
  try {
    const { usuarioQueEnvia} = req.params; // ID del usuario que envió la solicitud
    const usuarioQueRecibe= req.userId; // ID del usuario actual

    // Añadir amigo a ambas listas
    await User.findByIdAndUpdate(usuarioQueRecibe, {
      $pull: { solicitudAmistad: usuarioQueEnvia },
      $addToSet: { amigos: usuarioQueEnvia }
    });
    await User.findByIdAndUpdate(usuarioQueEnvia, {
      $addToSet: { amigos: usuarioQueRecibe }
    });

    console.log(`nuevo amigo agregado, total: ${amigos.length} amigos y mis solicitudes son ${solicitudes.length}`)
    res.status(200).json({ msg: "Solicitud de amistad aceptada." });
  } catch (error) {
    next(error);
  }
};

//ENVIAR SOLICITUD 
export const enviarSolicitud=async(req, res, next )=>{
    try{
        const {usuarioQueRecibe} =req.params; //Id del ususario que recibe la solicitud
        const usuarioQueEnvia= req.userId//Id del usuario que la envia

        if(usuarioQueRecibe=== usuarioQueEnvia){
          return res.status(400).json({msg:"no te puedes enviar la solicitud"})
        }

        // añado mi Id a la lista de solicitudes del otro ususario
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
      $pull: { solicitudAmistad: usuarioQueEnvia},
    });

    console.log(`se ha rechazado la solicitud de ${usuarioQueEnvia}`)
    res.status(200).json({ msg: "Solicitud de amistad rechazada." });
  } catch (error) {
    next(error);
  }
};