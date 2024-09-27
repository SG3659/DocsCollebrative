import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



export interface CustomRequest extends Request {
 userId: string | JwtPayload;
}

 const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token,process.env.JWT_PASSWORD as any);
   (req as CustomRequest).userId = decoded;

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};
export default authMiddleware;