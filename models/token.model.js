import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    token: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      expires: 3600,// this is the expiry time in seconds
    },
  });

const TokenSchema = mongoose.model('TokenSchema', tokenSchema);

export default TokenSchema;