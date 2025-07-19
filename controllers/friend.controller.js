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

    res.status(200).json({ msg: "Solicitud de amistad aceptada." });
  } catch (error) {
    next(error);
  }
};

//ACORDARME HACER LAS OTRAS FUNCIONES QUE FALTAN Y PROBAR QUE FUNCIONE