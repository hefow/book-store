import Book from "../model/book.js";
import Order from "../model/order.js";


export const makeOrder = async (req,res) => {
    const {bookId,quantity} = req.body;
    if(!bookId || !quantity){
        return res.status(422).json({message:"Book ID and quantity are required"});
    }

    try {
        const book = await Book.findByPk(bookId);
        if(!book) return res.status(404).json({message:"Book not found"});

        if(book.stock < quantity){
            return res.status(400).json({message:"Not enough stock"});
        }

        const totalPrice = (parseFloat(book.price)* quantity).toFixed(2);

        const order = await Order.create({
            userId: req.user.id,
            bookId,
            quantity,
            totalPrice
        });

        await book.update({stock: book.stock - quantity});

        res.status(200).json(order)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server Error"});
    }
};

export const getAllOrders = async(req,res) => {
    try {
        if(req.user.role == "admin"){
            const orders = await Order.findAll({include: ["User","Book"]});
            res.status(200).json(orders);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
};

export const getOrders =async (req,res) => {
    try {
        const order =await Order.findAll({where: {userId: req.user.id}, include: ["Book"]})
        res.status(200).json(order);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

