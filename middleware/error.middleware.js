
export const notFoundHandler= (req, res, next)=>{
    // ya pase por todos los paths, no encontre ninguno entonces tengpo que devolver 404
    const error = new Error("404 ruta no encontrada")
    res.status(404);
    next(error);
}


// middleware especiales de manejo de errores
export const errorHandler = (err, req, res, next)=>{

    // devolver statusCode de 500 o un previo de un controller
    const statusCode = res.statusCode ==200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        status: statusCode,
        msg: err.message,
        stack: process.env.NODE_ENV !== "production" ? "" : err.stack
    })
}
