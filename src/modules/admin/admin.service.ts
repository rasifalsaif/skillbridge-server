import { prisma } from "../../lib/prisma"

const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isBanned: true,
        },
    });
};

const getAllBookings = async () => {
    return await prisma.booking.findMany({
        select: {
            id: true,
            studentId: true,
            tutorId: true,
            status: true,
            createdAt: true,
        },
    });
};

const updateUserStatus = async (id: string, isBanned: boolean) => {
    return await prisma.user.update({
        where: { id },
        data: { isBanned }
    });
};

export const adminService = {
    getAllUsers,
    getAllBookings,
    updateUserStatus,
}