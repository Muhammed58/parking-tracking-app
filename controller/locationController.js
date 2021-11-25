import asyncHandler from 'express-async-handler';
import Location from '../models/locationModel.js';
import User from '../models/userModel.js'


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