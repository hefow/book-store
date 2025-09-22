import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controller/booksController.js"
import express from 'express'
import { isAdmin, protect } from "../middleware/auth.js"

const router = express.Router()
 
router.post("/create",protect,isAdmin,createBook),
router.get("/all",getBooks);
router.get("/:id",getBookById),
router.put("/:id",updateBook),
router.delete("/:id",deleteBook)

export default router