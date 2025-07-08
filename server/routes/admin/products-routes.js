import express from 'express';
import { upload } from '../../helpers/cloudinary.js';
import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUploadUtil}  from '../../controller/admin/products-controller.js';


const router = express.Router();

router.post('/image-upload', upload.single('my_file'), handleImageUploadUtil);
router.post('/add', addProduct);
router.put('/edit/:id', editProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/get', fetchAllProducts);

export default router;