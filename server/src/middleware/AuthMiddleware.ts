import 'dotenv/config';
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

function authMiddleware(request: any, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if (!authHeader) return response.status(401).send("No token");

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        request.user = decoded;
        next();
    } catch (err) {
        return response.status(403).send("Invalid token");
    }
}
