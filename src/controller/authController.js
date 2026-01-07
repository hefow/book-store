import bcrypt from "bcrypt"
import User from "../model/user.js";
import jwt from "jsonwebtoken"
import { Op } from "sequelize";
import { JWT_SECRET } from "../../config/config.js";
export const registerUser = async(req,res) => {
    const {username,password,role} = req.body;
    if(!username || !password) return res.status(404).json({message:"User Not Found"});

    try {
        const hashedPassword = await bcrypt.hash(password,10)
        const user = await User.create({username,password: hashedPassword,role});
        res.status(201).json({message:"User registered success.",user: {id: user.id,username: user.username,role: user.role}});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error."})
    }
}


export const loginUser = async (req,res) => {
    const {username,password}=req.body;

    if(!username || !password) return res.status(401).json({message:"invalid credintials"});

    try {
        const user = await User.findOne({where: {username}})
        if(!user) return res.status(401).json({message: "Invalid credentialls"});

        const validPass = await bcrypt.compare(password,user.password)
        if (!validPass) return res.status(401).json({ message: "Invalid credentials" });
        const token = jwt.sign({id: user.id,username: user.username, role:user.role},
            JWT_SECRET,
            {expiresIn: "1h"}
        )
        res.status(200).json({ message: "Login successful", token ,role: user.role});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}



export const getUsers =async (req,res) =>{
    try {
        const {page=1,limit=10,search="",}=req.query;
        const offset = (page - 1) * limit;

        const where = {};

        if(search){
            where.username ={[Op.iLike]:`&${search}&`}
        }
        if(search){
            where.email = {[Op.iLike]: `&${search}&`};
        }


        const {count, rows} = await User.findAndCountAll({where,limit: parseInt(limit),offset, order:[["createdAt","DESC"]]});

        res.status(200).json({
            totalUsers: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            users: rows,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, password, role } = req.body;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        if (username) user.username = username;
        if (password) user.password = await bcrypt.hash(password, 10);
        if (role) user.role = role;

        await user.save();
        res.status(200).json({ message: "User updated successfully", user: { id: user.id, username: user.username, role: user.role } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};
