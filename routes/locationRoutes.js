import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { saveLocation, getLastLocation, getLocationList, deleteLocation } from '../controller/locationController.js';


const locationRouter = express.Router();
 

//create location
locationRouter.route('/').post(protect, saveLocation);

//get last location of the user
locationRouter.route('/getLast').get(protect, getLastLocation)

//get location list
locationRouter.route('/list').get(protect, getLocationList)

//delete a location
locationRouter.route('/:id').delete(protect, deleteLocation);



export default locationRouter;