import bcrypt from "bcrypt"
import User from "../model/user.js";
import jwt from "jsonwebtoken"
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
            process.env.JWT,
            {expiresIn: "1h"}
        )
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Server Error"});
    }
}
