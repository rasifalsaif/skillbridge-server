import { Request, Response } from "express";
import { bookingService } from "./booking.service";


const createBooking = async (req: Request, res: Response) => {
    try {
        // const userId = req.user!.id;
        const booking = await bookingService.createBooking(
            req.user!.id,
            req.body.tutorId
        );

        res.status(200).json({
            success: true,
            message: "Booking created successfully",
            data: booking,
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to create booking",
        });
    }
};

const getMyBookings = async (req: Request, res: Response) => {
    // const userId = req.user!.id;
    const bookings = await bookingService.getMyBookings(req.user!.id);

    res.status(200).json({
        success: true,
        data: bookings,
    });
};

const getBookingDetails = async (req: Request, res: Response) => {
    const booking = await bookingService.getBookingById(
        req.params.id as string,
        req.user!.id
    );

    if (!booking) {
        return res.status(404).json({
            success: false,
            message: "Booking not found",
        });
    }

    res.json({ success: true, data: booking });
};

const getAllTutors = async (req: Request, res: Response) => {
    const tutors = await bookingService.getAllTutors();

    res.status(200).json({
        success: true,
        message: "All Tutors retrieved successfully",
        data: tutors,
    });
};

const updateTutorProfile = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.id;

        const profile = await bookingService.updateProfile(userId, req.body);

        res.status(200).json({
            success: true,
            message: "Tutor profile updated successfully",
            data: profile,
        });
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to update tutor profile",
        });
    }
};
export const bookingController = {
    createBooking,
    getMyBookings,
    getBookingDetails,
    getAllTutors,
    updateTutorProfile,
}