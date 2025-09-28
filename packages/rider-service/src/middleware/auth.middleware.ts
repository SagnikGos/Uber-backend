import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { User } from "@prisma/client";
import { prisma } from "../../prisma.client";

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

