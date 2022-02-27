import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { saveLocation, getLastLocation, getLocationList } from '../controller/locationController.js';


const locationRouter = express.Router();
 

//create location
locationRouter.route('/').post(protect, saveLocation);

//get last location of the user
locationRouter.route('/getLast').get(protect, getLastLocation)

//get location list
locationRouter.route('/list').get(protect, getLocationList)




export default locationRouter;