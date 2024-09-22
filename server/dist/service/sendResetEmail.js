"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passwordResetModel_1 = __importDefault(require("../model/passwordResetModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const uuid_1 = require("uuid");
const transporter = nodemailer_1.default.createTransport({
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
    }
    else {
        console.log("Email transporter ready for messages:", success);
    }
});
const sendResetEmail = (_a, redirectUrl_1, res_1) => __awaiter(void 0, [_a, redirectUrl_1, res_1], void 0, function* ({ _id, email, username }, redirectUrl, res) {
    const resetString = (0, uuid_1.v4)() + _id;
    try {
        yield passwordResetModel_1.default.deleteMany({ userId: _id });
        const hashedResetString = yield bcryptjs_1.default.hash(resetString, 10);
        const newPasswordReset = new passwordResetModel_1.default({
            userId: _id,
            resetString: hashedResetString,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000, // 1 hour
        });
        yield newPasswordReset.save();
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
        yield transporter.sendMail(mailOptions);
        res.status(200).json({
            success: true,
            message: "sent successfully",
        });
    }
    catch (error) {
        console.error("Error in sendResetEmail:", error);
        res.json({
            success: false,
            message: "An error occurred while sending the password reset email",
        });
    }
});
exports.default = sendResetEmail;
