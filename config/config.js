import dotenv from "dotenv";

dotenv.config();

export const JWT_SECRET = process.env.JWT;
export const DB_URL = process.env.DB_URL;
export const PORT = process.env.PORT || 5000;
export const CLOUD_NAME = process.env.CLOUD_NAME;
export const CLOUDINARY_API = process.env.CLOUDINARY_API;
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;


