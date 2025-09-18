import { createBook, deleteBook, getBookById, updateBook } from "../controller/booksController.js"
import express from 'express'

const router = express.Router()
 
router.post("/create",createBook),
router.get("/:id",getBookById),
router.put("/:id",updateBook),
router.delete("/:id",deleteBook)

export default router