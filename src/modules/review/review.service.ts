import { prisma } from "../../lib/prisma"

const createReview = async (studentId: string, tutorId: string, rating: number, comment: string) => {
    return await prisma.review.create({
        data: {
            studentId,
            tutorId,
            rating,
            comment,
        },
    });
};

export const reviewService = {
    createReview,
}