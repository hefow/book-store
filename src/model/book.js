import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const Book = sequelize.define("Book",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    title:{
        type: DataTypes.STRING,
        allowNull:false
    },
    author:{
        type:DataTypes.STRING
    },
    price:{
        type: DataTypes.DECIMAL(10,2),
        defaultValue: 0.0
    },
    stock:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

export default Book