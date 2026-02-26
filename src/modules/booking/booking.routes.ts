import express, { Router } from "express";
import  auth, { UserRole } from '../../middlewares/auth';
import { bookingController } from "./booking.controller";

const router = express.Router();

// get the private routes

router.get("/", auth(UserRole.STUDENT), bookingController.getMyBookings);

router.get("/:id", auth(UserRole.STUDENT), bookingController.getBookingDetails);

router.get("/", auth(UserRole.STUDENT), bookingController.getAllTutors);

router.post("/", auth(UserRole.STUDENT), bookingController.createBooking);

router.put("/profiles", auth(UserRole.STUDENT), bookingController.updateTutorProfile);


export const bookingRouter: Router = router;