import type { Request, Response } from "express";
import { UserService } from "./user.service";
// import { prisma } from "../../../prisma.client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UserController {
    public static async registerRider(req: Request, res: Response) {
        try {
        const { phoneNumber, email, firstName, lastName } = req.body;

        if (!phoneNumber) {
            return res.status(400).json({ message: "Phone number is required" });
        }

        const existingUser = await UserService.findByPhoneNumber(phoneNumber);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newRider = await UserService.createRider({ phoneNumber, email, firstName, lastName });
        res.status(201).json({
            message: "Rider registered successfully",
                data: newRider
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
 
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return res.status(400).json({ message: "Phone number or email already exists" });
                }
            }
        }
    }

    public static async loginRider(req: Request, res: Response) {
        try {
            const { phoneNumber } = req.body;
            if (!phoneNumber) {
                return res.status(400).json({ message: "Phone number is required" });
            }
            const rider = await UserService.findByPhoneNumber(phoneNumber);
            if (!rider) {
                return res.status(400).json({ message: "Rider not found" });
            }
            const token = await UserService.generateAuthToken(rider.id);
            res.status(200).json({
                message: "Rider logged in successfully",
                data: {
                    token
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    public static async getMyProfile(req: Request, res: Response): Promise<Response> {
        if (req.user) {
          return res.status(200).json({
            message: 'Profile retrieved successfully.',
            data: req.user,
          });
        }

        return res.status(401).json({ message: 'Not authorized.' });
    }
}