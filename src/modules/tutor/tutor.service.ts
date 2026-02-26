import { prisma } from "../../lib/prisma"

// public routes
const getTutors = (filters: any) => {
    const where: any = {};

    if (filters?.price) {
        where.pricePerHr = {
            lte: Number(filters.price),
        };
    }

    if (filters?.rating) {
        where.rating = {
            gte: Number(filters.rating),
        };
    }

    if (filters?.category) {
        where.categories = {
            some: {
                name: filters.category,
            },
        };
    }

    return prisma.tutorProfile.findMany({
        where,
        include: {
            user: true,
            categories: true,
        },
    });
};


const getTutorById = (id: string) => {
    return prisma.tutorProfile.findUnique({
        where: { id },
        include: {
            user: true,
            categories: true,
            availability: true,
            reviews: true,
        },
    });
};

// private route

const createProfile = async (userId: string, data: any) => {
    // Check user exists
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Prevent duplicate tutor profile
    const existingProfile = await prisma.tutorProfile.findUnique({
        where: { userId },
    });

    if (existingProfile) {
        throw new Error("Tutor profile already exists");
    }

    // Validate categories
    if (!data.categoryIds || data.categoryIds.length === 0) {
        throw new Error("At least one category is required");
    }

    const categories = await prisma.category.findMany({
        where: {
            id: { in: data.categoryIds },
        },
    });

    if (categories.length !== data.categoryIds.length) {
        throw new Error("One or more categories not found");
    }

    // Create tutor profile
    return prisma.tutorProfile.create({
        data: {
            userId,
            bio: data.bio,
            pricePerHr: Number(data.pricePerHr),
            categories: {
                connect: data.categoryIds.map((id: string) => ({ id })),
            },
        },
        include: {
            categories: true,
            user: true,
        },
    });
};

const updateProfile = (userId: string, data: any) => {
    return prisma.tutorProfile.update({
        where: { userId },
        data: {
            bio: data.bio,
            pricePerHr: data.pricePerHr,
            categories: {
                set: data.categoryIds.map((id: string) =>
                    ({ id })) || [],
            },

        },
    });
};

const setAvailability = async (userId: string, slots: any[]) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: {
            userId
        },
    });

    await prisma.availability.deleteMany({
        where: { tutorId: tutor!.id },
    });

    return prisma.availability.createMany({
        data: slots.map((slot) => ({
            tutorId: tutor!.id,
            day: slot.day,
            startTime: slot.startTime,
            endTime: slot.endTime,
        })),
    });
};

const getAvailability = async (userId: string) => {
    const tutor = await prisma.tutorProfile.findUnique({
        where: { userId },
    });

    if (!tutor) throw new Error("Tutor not found");

    return prisma.availability.findMany({
        where: { tutorId: tutor.id },
        orderBy: [
            { day: 'asc' },
            { startTime: 'asc' }
        ],
    });
}

const getTutorDashboard = async () => {
    return await prisma.tutorProfile.findMany({
        select: {
            userId: true,
            id: true,
            bio: true,
            pricePerHr: true,
            rating: true,
            user: {
                select: {
                    name: true,
                    email: true,
                    image: true
                }
            }
        },

    });
};

export const tutorService = {
    getTutors,
    getTutorById,
    createProfile,
    updateProfile,
    setAvailability,
    getAvailability,
    getTutorDashboard,

}