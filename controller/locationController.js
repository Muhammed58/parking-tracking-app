import asyncHandler from 'express-async-handler';
import Location from '../models/locationModel.js';
import User from '../models/userModel.js'

//save location coordinate
export const saveLocation = asyncHandler(async(req, res)=>{
    const { locationInfo } = req.body;

    const user = await User.findById(req.user._id);

    const location = await Location.create({
            userID: user._id,
            location: locationInfo
        })

    if(location){
        res.status(201).json({
            _id: location._id,
            userID: user._id,
            location: locationInfo,
        })
    }else {
        res.status(400);
        throw new Error("Invalid location data")
    }
})


/**
 * Get the last location coordinate
 * Access protect, admin
**/

export const getLocationList = asyncHandler(async(req, res) =>{
    try {
        const location = await Location.find({userID: req.user._id})
        res.json(location);
        
    } catch (error) {
        res.json(error)
    }
});

/**
 * Get the last location coordinate
 * Access protect, admin
**/

export const getLastLocation = asyncHandler(async(req, res) =>{
    try {
        const location = await Location.findOne({userID: req.user._id}).sort({createdAt:-1}).limit(1)
        res.json(location);
        
    } catch (error) {
        res.json(error)
    }
});
