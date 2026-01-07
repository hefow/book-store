import express from "express"
import { isAdmin, protect } from "../middleware/auth.js";
import { getAllOrders, getOrders, makeOrder } from "../controller/orderController.js";

const router = express.Router();

router.post("/",protect,makeOrder);
router.get("/all",protect,getAllOrders);
router.get("/:id",protect,getOrders);

export default router;