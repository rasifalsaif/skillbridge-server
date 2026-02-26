import { prisma } from "../../lib/prisma"

const getAllUsers = async () => {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            banned: true,
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

const updateUserStatus = async (id: string, banned: boolean) => {
    return await prisma.user.update({
        where: { id },
        data: { banned }
    });
};

export const adminService = {
    getAllUsers,
    getAllBookings,
    updateUserStatus,
}