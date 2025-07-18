
import mongoose from "mongoose";
import { DOMAIN, port, jwtSecret, mongoURI, CLUSTER} from "../config/config.js";

export const conectarDB = async () => {
    const url = mongoURI+CLUSTER;
    console.log("mi base de datos es " + url)
  try {
    await mongoose.connect(url);
    console.log(" Conexión a MongoDB compass exitosa");
    
        // pedir a mongoose que me diga las conexiones disponibles
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("colecciones disponibles:", collections.map(c => c.name));
  } catch (error) {
    console.error(" Error al conectar con MongoDB:", error.message);
    process.exit(1);
  }
};
