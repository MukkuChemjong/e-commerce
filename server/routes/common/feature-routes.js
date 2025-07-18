import express from 'express';
import { addFeatureImage, deleteFeatureImage, getFeatureImages } from '../../controllers/common/feature-controller.js';


const router = express.Router();

router.post('/add', addFeatureImage);
router.get('/get', getFeatureImages);
router.delete('/delete/:userId', deleteFeatureImage);

export default router;