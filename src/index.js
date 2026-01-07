import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import sequelize from '../config/db.js'
import bookRoutes from '../src/routes/bookRoutes.js'
import userRoutes from "../src/routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"

dotenv.config()

const app =express()
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cors())

app.get('/',(req,res)=>{
    res.send("Bookstore Inventory API is running 🚀")
})

const PORT= process.env.PORT | 4000;

 app.use("/api/books",bookRoutes);
 app.use("/api/users",userRoutes);
 app.use("/api/orders",orderRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log(" Database connected successfully!")

        await sequelize.sync({alter:true})
        console.log("All tables synced!")

        app.listen(PORT, ()=>{
            console.log(`🚀 Server running on http://localhost:${PORT}`)
        })
       
    } catch (error) {
        console.log("Failed to start server:", error)
    }
})();
