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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.resetPassword = exports.userData = exports.loginUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const passwordResetModel_1 = __importDefault(require("../model/passwordResetModel"));
const sendResetEmail_1 = __importDefault(require("../service/sendResetEmail"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const existingUser = yield userModel_1.default.findOne({ username });
        if (existingUser) {
            return res.json({
                success: false,
                message: "Name Exists",
            });
        }
        const existingEmail = yield userModel_1.default.findOne({ email });
        if (existingEmail) {
            return res.json({
                success: false,
                message: "Email Exists",
            });
        }
        const salt = yield bcrypt_1.default.genSalt(16);
        const hashPassword = yield bcrypt_1.default.hash(password, salt);
        const user = yield userModel_1.default.create({
            username,
            email,
            password: hashPassword,
        });
        yield user.save();
        return res.json({
            success: true,
            message: "User created successfully in typescript ",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered, please try again later",
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email"
            });
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Password"
            });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_PASSWORD, {
            expiresIn: "1d",
        });
        const _a = user.toObject(), { password: pass } = _a, rest = __rest(_a, ["password"]);
        return res
            .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            secure: false,
        })
            .json(Object.assign({ success: true, message: "Login", data: token }, rest));
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be login, pls try again later "
        });
    }
});
exports.loginUser = loginUser;
const userData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ _id: req.body.userId });
    try {
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user not exists",
            });
        }
        else {
            return res.json({
                success: true,
                data: user,
                message: "user exists",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something Wrong"
        });
    }
});
exports.userData = userData;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    const redirectUrl = "http://localhost:5173/reset-password";
    try {
        const user = yield userModel_1.default.findOne({ email });
        if (user) {
            yield (0, sendResetEmail_1.default)({ _id: user.id.toString(), email: user.email, username: user.username }, redirectUrl, res);
            return;
        }
        return res.json({
            success: false,
            message: "Email does not exist",
        });
    }
    catch (error) {
        console.error("Error in resetPassword:", error);
        return res.json({
            success: false,
            message: "Something went wrong",
        });
    }
});
exports.resetPassword = resetPassword;
const updatePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, resetString } = req.params;
    const { newPassword } = req.body;
    try {
        const resetRecords = yield passwordResetModel_1.default.find({ userId });
        if (resetRecords.length === 0) {
            return res.json({
                success: false,
                message: "Password link either doesn't exist or has expired.",
            });
        }
        const { expiresAt, resetString: hashedResetString } = resetRecords[0];
        if (expiresAt.getTime() < Date.now()) {
            yield passwordResetModel_1.default.deleteOne({ userId });
            return res.json({
                success: false,
                message: "Password reset link has expired",
            });
        }
        const isMatch = yield bcrypt_1.default.compare(resetString, hashedResetString);
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid password reset details passed.",
            });
        }
        const saltRounds = 10;
        const hashedNewPassword = yield bcrypt_1.default.hash(newPassword, saltRounds);
        yield userModel_1.default.updateOne({ _id: userId }, { password: hashedNewPassword });
        yield passwordResetModel_1.default.deleteOne({ userId });
        res.json({
            success: true,
            message: "Password has been reset successfully.",
        });
    }
    catch (error) {
        console.error("Error in updatePassword:", error);
        res.json({
            success: false,
            message: "An error occurred while resetting the password",
        });
    }
});
exports.updatePassword = updatePassword;
