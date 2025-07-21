
 import { urlJikan } from "../config/config.js";
// variables para guardar los resultados por un tiempo para que no me bloquee 
// la api y no me carguen los animes
// he hecho dos pares de variables que hacen lo  mismo, las repito porque si dejo solo un par 
// los datos de ese par de variables en un controlador me sobrescriben los datos del otro controlador

// para la pagina de inicio
let guardarAnimes= null
let tiempoGuardado= 0;



export const obtenerAnimesPopulares= async (req, res, next)=>{
    const ahora= Date.now() // fecha actual
    const diezMin= 10*60*1000; 
     if(ahora - tiempoGuardado < diezMin && guardarAnimes){
         return res.status(200).json({data: guardarAnimes})
     }
    try{
        // pego la llamada a la api que tenia en mi frontend
        const response = await fetch("https://api.jikan.moe/v4/top/anime?limit=8")

        console.log("estado de Jikan:", response.status);

        if (!response.ok) {
            throw new Error("Error al obtener datos de Jikan");
    }
        const data = await response.json();
        guardarAnimes= Array.isArray(data.data) ? data.data : [];
        tiempoGuardado= ahora

        //envio los datos al front
        res.status(200).json({data: data.data})
    } catch(error){
        next(error)
    }
       
 }

//para la pagina de filtros
let guardarAnimesFiltro= null
let tiempoGuardadoFiltro= 0;

 export const FiltroAnimes= async (req, res, next)=>{
    let guardarAnimesFiltro= null
    let tiempoGuardadoFiltro= 0;
    const ahora= Date.now() // fecha actual
    const diezMin= 10*60*1000; 

     if(ahora - tiempoGuardadoFiltro < diezMin && guardarAnimesFiltro){
         return res.status(200).json({data: guardarAnimesFiltro})
     }
    try{
        const params = new URLSearchParams(req.query)
         const response = await fetch(`${urlJikan}?${params.toString()}`);

         if (!response.ok) {
            throw new Error("Error al obtener datos de Jikan");
    }
        const data = await response.json();
        guardarAnimesFiltro= Array.isArray(data.data) ? data.data : [];
        tiempoGuardadoFiltro= ahora

        //envio los datos al front
        res.status(200).json({data: data.data, pagination: data.pagination})
    }catch(error){
        next(error)
    }
 }