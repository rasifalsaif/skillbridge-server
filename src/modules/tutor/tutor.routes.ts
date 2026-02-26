import  auth, { UserRole } from '../../middlewares/auth';
import express, { Router } from "express";
import { tutorController } from "./tutor.controller";


const router = express.Router();

// get the public routes
router.get("/", tutorController.listTutors);

router.get("/:id", tutorController.tutorDetails);


// get the private routes
router.get("/", auth(UserRole.TUTOR), tutorController.getTutorDashboard)

router.get("/availability", auth(UserRole.TUTOR), tutorController.getAvailability);

router.post("/profile", auth(UserRole.TUTOR), tutorController.createTutorProfile)

router.put("/profile", auth(UserRole.TUTOR), tutorController.updateTutorProfile)

router.put("/availability", auth(UserRole.TUTOR), tutorController.setAvailability)



export const tutorRouter: Router = router;
