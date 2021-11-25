import mongoose from "mongoose";

const locationSchema = mongoose.Schema(
    {
        userID:{
            type: String,
            required: true
        },
        location:{
            type: [Number],
            required: true
        }
    },
    {
        timestamps: true,
    }
)


const Location = mongoose.model('Location', locationSchema);

export default Location;