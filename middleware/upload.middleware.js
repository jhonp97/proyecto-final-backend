import multer from "multer";

// hago la configuracion para guardar un archivo en la carpeta de uploads
const storage= multer.diskStorage({
    // esto es el destino donde se guarda el archivo
    destination: function (req, file,cb){
        cb(null, "public/uploads/") //carpeta del front(corregido, tiene que ser en el back)
    }, filename: function (req,file, cb){
        //creo el nombre del archivo para que sea unico (nombre-fecha-.formato)
        const  nombreArchivo = file.fieldname + "-" + Date.now()+"."+file.mimetype.split("/")[1];
        cb(null, nombreArchivo )
    }
})
const upload= multer({storage:storage})
export default upload;