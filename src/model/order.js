import sequelize from "../../config/db.js";
import { DataTypes } from "sequelize";
import User from "./user.js";
import Book from "./book.js";


const Order = sequelize.define("Order",{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    totalPrice:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:false
    }
});

User.hasMany(Order,{foreignKey: "userId"});
Order.belongsTo(User,{foreignKey: "userId"});

Book.hasMany(Order,{foreignKey: "bookId"});
Order.belongsTo(Book, {foreignKey: "bookId"});

export default Order