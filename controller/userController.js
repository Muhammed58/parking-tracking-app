import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// Generate Token 

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{
        expiresIn: '1d',
    });
};

/**
 * 
 *  Register a new user 
 *  Public access
 * 
 **/

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if(userExists){
        res.status(400);
        throw new Error('User already exists'); 
    }

    const user = await User.create({
        name,
        email,
        password,
    });
    
    if(user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});


/**
 * Auth user & get token
 * Public access
**/

export const authUser = asyncHandler(async (req, res) =>{
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if ( user && (await user.matchPassword(password))) {
        res.json({
            userID:user._id,
            token: generateToken(user._id),
        });
    }   else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

/** 
 * Get user profile
 * Protect access
**/

export const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * Update user profile
 * Access protect 
 **/

export const updateUserProfile = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        if(req.body.password) {
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.json({
            _id: updateUser._id,
            name: updateUser.name,
            email: updateUser.email,
            isAdmin: updateUser.isAdmin,
            token: generateToken(updateUser._id),
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * Get all users
 * Access protect, admin
**/

export const getUsers = asyncHandler(async(req, res) =>{
    const users = await User.find({});

    res.json(users);
});


/**
 * Delete a user
 * Access project, admin
**/

export const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if(user) {
        await user.remove();
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

/**
 * Get user by ID
 * Access protect, admin
**/

export const getUserById  = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id).select('-password');
    if(user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error ('User not found');
    }
});


/**
 * Update user
 * Access protect, admin
**/

export const updateUser = asyncHandler(async (req, res) =>{
    const user = await User.findById(req.params.id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.isAdmin = req.body.isAdmin;

        const updatedUser = await user.save();
        
        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});