import dotenv from 'dotenv';
dotenv.config();


 export const DOMAIN =process.env.DOMAIN || "http://localhost";
  export const port= process.env.PORT || 5000;
  export const urlJikan= process.env.URL_BASE_JIKAN || "https://api.jikan.moe/v4/anime"
  export const jwtSecret= process.env.JWT_SECRET ;
 export const  mongoURI= process.env.MONGO_URI || "mongodb+srv://usuario:contraseña@cluster.mongodb.net/"

    export const CLUSTER = process.env.CLUSTER || "aniverse"
 

