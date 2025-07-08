import express from 'express';
import { createOrder, captureOrder, getAllOrdersByUser, getOrderDetails } from '../../controller/shop/order-controller.js';


const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', captureOrder);
router.get('/list/:userId', getAllOrdersByUser);
router.get('/details/:id', getOrderDetails);

export default router;
