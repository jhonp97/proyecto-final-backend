import dotenv from 'dotenv';
dotenv.config();


 export const DOMAIN =process.env.DOMAIN || "http://localhost";
  export const port= process.env.PORT || 5000;
  export const jwtSecret= process.env.JWT_SECRET ;
 export const  mongoURI= process.env.MONGO_URI;
    export const CLUSTER = process.env.CLUSTER 
 

