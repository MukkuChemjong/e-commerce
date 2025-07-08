import express from 'express';
import { addFeatureImages, deleteFeatureImage, getFeatureImages } from '../../controller/common/feature-controller.js';


const router = express.Router();

router.post('/add', addFeatureImages);
router.get('/get', getFeatureImages);
router.delete('/delete/:userId', deleteFeatureImage);

export default router;