import Book from "../model/book.js";


export const createBook =async(req,res)=>{
    const {title,author, price,stock}=req.body;
    if(!title || !price==null) return res.status(422).json({message: "missing fields"});

    try {
        const book = await Book.create({title,author,price,stock:stock | 0});
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({message:"internal server errror:",error})
    }
};

export const getBooks =async (req,res) =>{
    try {
        const {page=1,limit=10,search="",author,minPrice,maxPrice}=req.query;
        const offset = (page - 1) * limit;

        const where = {};

        if(search){
            where.title ={[Op.iLike]:`&${search}&`}
        }
        if(author){
            where.author = {[Op.iLike]: `&${author}&`};
        }

        if(minPrice || maxPrice){
            where.price ={};
            if(minPrice) where.price[Op.gte] = parseFloat(minPrice);
            if(maxPrice) where.price[Op.lte]= parseFloat(maxPrice);
        }

        const {count, rows} = await Book.findAndCountAll({where,limit: parseInt(limit),offset, order:[["createdAt","DESC"]]});

        res.status(200).json({
            totalBooks: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page),
            books: rows,
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Server error"});
    }
}

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