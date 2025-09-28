import { prisma } from "../../../prisma.client";
import type { User } from "@prisma/client";

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
}


