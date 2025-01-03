import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../model/userModel"; // Adjust the import path as necessary

declare module "express-serve-static-core" {
  interface Request {
    auth?: any;
  }
}

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization");
    // const token = req.cookies.token; // Uncomment if using cookies

    if (!token) {
      return res.status(401).json({ message: "Please login or Register." });
    }

    const tokenWithoutBearer = token.replace("Bearer ", "");

    const verified = jwt.verify(
      tokenWithoutBearer,
      process.env.JWT_PASSWORD as string
    ) as { userId: string };

    const user = await User.findById(verified.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    req.auth = user;
    next();
  } catch (error: any) {
    console.error(error.message);
    return res
      .status(401)
      .json({ message: "Token expired. Please log in again." });
  }
};

export default AuthMiddleware;
