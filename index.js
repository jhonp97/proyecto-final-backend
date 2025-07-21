import express from "express"
import 'dotenv/config';
import cors from "cors"
 import { DOMAIN, port } from "./config/config.js"
import { router } from "./routes/index.routes.js"
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

 import { conectarDB } from "./db/mongoose.js"

const app= express()


//middlewares
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:3000" })) // permite conecvtar front y back sin errores de cors
app.use(express.json())
app.use(express.urlencoded({extended:true})) // leer los datos de formularios html
app.use("/", express.static("public"))


// llamar a la funcion  de conexion de Mongoose
 conectarDB()

//ruta por defecto
app.get("/", (req, res)=>{
    res.status(200).json({msg:"bienvenidos a mi api de Aniverse con MongoDB"})
})

// rutas
app.use("/api/v1", router);


// middlewares de manejo de errores
 app.use(notFoundHandler)
 app.use(errorHandler)

app.listen(port,()=>{
    console.log(`mi servidor se esta ejecutando correctamente en ${DOMAIN}:${port}`)
})