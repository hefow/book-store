import { createBook, deleteBook, getBookById, getBooks, updateBook } from "../controller/booksController.js"
import express from 'express'
import { isAdmin, protect } from "../middleware/auth.js"
import upload from "../middleware/upload.js";

const router = express.Router()
 
router.post("/create",protect,upload.single("image"),createBook),
router.get("/all",getBooks);
router.get("/:id",getBookById),
router.put("/:id",upload.single("image"),updateBook),
router.delete("/:id",deleteBook)

export default router