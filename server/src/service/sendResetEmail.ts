import { Request, Response } from "express";
import PasswordReset from '../model/passwordResetModel';
import bcrypt from "bcryptjs"
import nodemailer,{createTransport} from"nodemailer"
import {v4 as uuidv4} from "uuid"


const transporter = nodemailer.createTransport({
   service: "gmail",
   auth: {
     user: process.env.EMAIL,
     pass: process.env.PASSWORD,
   },
 });
 
 // Verify the transporter configuration
 transporter.verify((error, success) => {
   if (error) {
     console.log("Error setting up email transporter:", error);
   } else {
     console.log("Email transporter ready for messages:", success);
   }
 });

const sendResetEmail = async (
   { _id, email, username }: { _id: string; email: string; username: string },
   redirectUrl: string,
   res: Response
 ): Promise<void> => {
   const resetString = uuidv4() + _id;
    try {
      
   
     await PasswordReset.deleteMany({ userId:_id });
 
     const hashedResetString = await bcrypt.hash(resetString, 10);
 
     const newPasswordReset = new PasswordReset({
       userId: _id,
       resetString: hashedResetString,
       createdAt: Date.now(),
       expiresAt: Date.now() + 3600000, // 1 hour
     });
 
     await newPasswordReset.save();
 
     const mailOptions = {
       from: process.env.EMAIL,
       to: email,
       subject: "Password Reset",
       html: `
         Hello ${username},
         <br/><br/>
         Please click on the link below to reset your password.
         <br/><br/>
         <a href="${redirectUrl}/${_id}/${resetString}">Reset Password</a>
         <br/><br/>
         The link will expire in 1 hour.
         <br/><br/>
         If you did not request this, please ignore this email.
         <br/><br/>
         Thank you.
       `,
     };
 
     await transporter.sendMail(mailOptions);
     res.status(200).json({
      success: true,
      message: "sent successfully",
    })
   

  } catch (error) {
    console.error("Error in sendResetEmail:", error);
    res.json({
      success: false,
      message: "An error occurred while sending the password reset email",
    });
  }
     
 };

export default sendResetEmail