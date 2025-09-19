import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const User=sequelize.define("User",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    username:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    role:{
        type: DataTypes.ENUM("admin","user"),
        defaultValue: "user"
    }
})

export default User