import Book from "../model/book.js";


export const createBook =async(req,res)=>{
    const {title,author, price,stock}=req.body
    if(!title || price==null) return res.status(422).json({message: "missing fields"});

    try {
        const book = await Book.create({title,author,price,stock:stock | 0});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message:"internal server errror:",error})
    }
};

export const getBookById = async(req,res)=>{
    try {
        const {id}=req.params;

        const book = await Book.findByPk(id)
        if(!book) return res.status(404).json({message:"book not found"});
        res.json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }
};

export const updateBook =async (req,res)=>{
    try {
        const {id}=req.params;

        const book = await book.findByPk(id);
        if(!book) return res.status(404).json({message:"book not found"});

        const {title,author,price,stock}=req.body;
        await book.update({title,author,price,stock})
        res.json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }

}

export const deleteBook =async (req,res)=>{
    try {
        const {id}=req.params;

        const book = await book.findByPk(id);
        if(!book) return res.status(404).json({message:"book not found"});

        await book.destroy();
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }

}