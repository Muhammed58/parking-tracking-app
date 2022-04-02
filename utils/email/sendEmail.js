import nodemailer from "nodemailer"
import handlebars from "handlebars"
import fs from "fs"
import path from "path"

export const sendEmail = async (email, subject, payload, template) => {
  try {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure:false,
      tls:{
        servername:process.env.SERVER_NAME
      },
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD, // naturally, replace both with your real credentials or an application-specific password
      },
    });
    const source = fs.readFileSync(template, "utf8");
    const compiledTemplate = handlebars.compile(source);
    const options = () => {
      return {
        from: process.env.FROM_EMAIL,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };
    // Send email
    transporter.sendMail(options(), (error, info) => {
      if (error) {
        console.log("this error", error)
        return error;
      } else {
        console.log(info)
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (error) {
    console.log(error)
    return error;
  }
};
