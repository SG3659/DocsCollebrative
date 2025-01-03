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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel")); // Adjust the import path as necessary
const AuthMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.header("Authorization");
        // const token = req.cookies.token; // Uncomment if using cookies
        if (!token) {
            return res.status(401).json({ message: "Please login or Register." });
        }
        const tokenWithoutBearer = token.replace("Bearer ", "");
        const verified = jsonwebtoken_1.default.verify(tokenWithoutBearer, process.env.JWT_PASSWORD);
        const user = yield userModel_1.default.findById(verified.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        req.auth = user;
        next();
    }
    catch (error) {
        console.error(error.message);
        return res
            .status(401)
            .json({ message: "Token expired. Please log in again." });
    }
});
exports.default = AuthMiddleware;
