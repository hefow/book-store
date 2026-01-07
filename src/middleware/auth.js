import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import { JWT_SECRET } from "../../config/config.js";

dotenv.config();
export  const  protect = async (req,res,next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided." });

    try {
        const decoded = jwt.verify(token,JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};

export const isAdmin = async (req,res,next) => {
    if(req.user.role !== "admin")
        return res.status(403).json({ message: "Forbidden: Admins only" });
    next();
};