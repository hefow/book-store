import cloudinary from "../../config/cloudinery.js";
import Book from "../model/book.js";


export const createBook =async(req,res)=>{
    
    const {title,author, price,stock,image}=req.body;
    if(!title || !price==null) return res.status(422).json({message: "missing fields"});

    try {
        let imageUrl;

        // Check if a file was uploaded
        if (req.file) {
            // Encode the image to base64 format
            const encodeImage = `data:image/png;base64,${req.file.buffer.toString("base64")}`;
            // Upload the image to Cloudinary
            try {
            const cloudinaryUpload = await cloudinary.uploader.upload(encodeImage, {
                resource_type: "image", // Specify the type as an image
                encoding:'base64'
            });
            imageUrl = cloudinaryUpload.secure_url; // Use the URL of the uploaded image
            } catch (error) {
            return res.status(500).json({ message: "Error uploading image to Cloudinary.", error });
            }
        }
        const book = await Book.create({title,author,price,stock:stock | 0, image: imageUrl});
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
        console.log(id)
        const book = await Book.findByPk(id);
        if(!book) return res.status(404).json({message:"book not found"});

        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.price = req.body.price || book.price;
        book.stock = req.body.stock || book.stock;

        if (req.files && req.files.length > 0) {
            const imageUrls = [];

            for (const file of req.files) {
                // const encodeImage = `data:image/png;base64,${file.buffer.toString("base64")}`;
                const encodeImage = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;


                try {
                    const cloudinaryUpload = await cloudinary.uploader.upload(encodeImage, {
                        resource_type: "image",
                    });
                    imageUrls.push(cloudinaryUpload.secure_url);
                } catch (error) {
                    return res.status(500).json({ message: "Error uploading image to Cloudinary.", error });
                }
            }
            console.log(imageUrls);

            book.image = imageUrls;
        }

        await book.save();
        res.json(book)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }

}

export const deleteBook =async (req,res)=>{
    try {
        const {id}=req.params;

        const book = await Book.findByPk(id);
        if(!book) return res.status(404).json({message:"book not found"});

        await book.destroy();
        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"server error"})
    }

}