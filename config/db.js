import { Sequelize } from "sequelize";
import { DB_URL } from "./config.js";


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
