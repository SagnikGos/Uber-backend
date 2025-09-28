import { prisma } from "../../../prisma.client";
import type { User } from "@prisma/client";
import jwt from "jsonwebtoken";

export interface createRiderDTO {
    phoneNumber: string;
    email?: string;
    firstName?: string;
    lastName?: string;
}


export class UserService {
    public static async findByPhoneNumber(phoneNumber: string): Promise<User | null> {
        return prisma.user.findUnique({
            where: {
                phoneNumber
            }
        });
    }

    public static async createRider(data: createRiderDTO): Promise<User> {
        return prisma.user.create({
            data: {
                ...data,
                role: 'RIDER'
            }
        });
    }

    public static async generateAuthToken(userId: string): Promise<string> {
        return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: '1d' });
    }
}


