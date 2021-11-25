import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { saveLocation } from '../controller/locationController.js';



const locationRouter = express.Router();
 

//create location
locationRouter.route('/').post(protect, saveLocation);

export default locationRouter;