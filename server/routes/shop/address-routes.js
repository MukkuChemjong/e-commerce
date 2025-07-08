import express from "express";
import {
  addAddress,
  deleteAnAddress,
  editAnAddress,
  fetchAllAddress,
} from "../../controller/shop/address-controller.js";

const router = express.Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAllAddress);
router.put("/update/:userId/:addressId", editAnAddress);
router.delete("/delete/:userId/:addressId", deleteAnAddress);

export default router;
