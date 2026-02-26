import { Request, Response } from "express";
import { reviewService } from "./review.service";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
            }
        }
    }
}

const createReview = async (req: Request, res: Response) => {
    try {
        const { tutorId, rating, comment } = req.body;

        const review = await reviewService.createReview(
            req.user!.id,
            tutorId,
            rating,
            comment
        );

        res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            data: review,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error?.message || "Failed to submit review",
        });
    }
};

export const reviewController = {
    createReview,
}