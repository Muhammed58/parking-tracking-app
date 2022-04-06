import User from "../models/userModel.js";
import TokenSchema from "../models/token.model.js";
import { sendEmail } from "../utils/email/sendEmail.js";
import bcrypt from "bcryptjs";
import crypto from "crypto"

export const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await TokenSchema.findOne({ userId });
    if (!passwordResetToken) {
      throw new Error("Invalid or expired password reset token");
    }
    const isValid = await bcrypt.compare(token, passwordResetToken.token);
    if (!isValid) {
      throw new Error("Invalid or expired password reset token");
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.updateOne(
      { _id: userId },
      { $set: { password: hash } },
      { new: true }
    );
    const user = await User.findById({ _id: userId });
    sendEmail(
      user.email,
      "Password Reset Successfully",
      {
        name: user.name,
      },
      "./template/resetPassword.handlebars"
    );
    await passwordResetToken.deleteOne();
    return true;
  };



  export const requestPasswordReset = async (email) => {

    const user = await User.findOne({ email });
  
    if (!user) throw new Error("User does not exist");
    let token = await TokenSchema.findOne({ userId: user._id });
    if (token) await token.deleteOne();
    let resetToken = crypto.randomBytes(32).toString("hex");
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(resetToken, salt);
  
    await new TokenSchema({
      userId: user._id,
      token: hash,
      createdAt: Date.now(),
    }).save();
  
    const link = `${process.env.CLIENT_URL}/passwordReset?token=${resetToken}&id=${user._id}`;
    sendEmail(
        user.email,
        "Password Reset Request",
        {
          name: user.name,
          link: link,
        },
        "./utils/template/requestResetPassword.handlebars"
      ).then((res)=>console.log(res)).catch(err=>console.log(err))

    return link;
  };
