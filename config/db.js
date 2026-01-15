import { Sequelize } from "sequelize";
import dotenv from 'dotenv'
import { DB_URL } from "./config";

dotenv.config()

const sequelize =new Sequelize(DB_URL,{
    dialect:"postgres",
    protocol:"postgres",
    dialectOptions:{
        ssl:{
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: false

});





export default sequelize;
