import { adminRouter } from './modules/admin/admin.routes';
import { reviewRouter } from './modules/review/review.routes';
import { bookingRouter } from './modules/booking/booking.routes';
import { categoryRouter } from './modules/category/category.routes';
import { tutorRouter } from './modules/tutor/tutor.routes';
import { authRouter } from './modules/auth/auth.routes';

import express, { type Application } from "express";
import cors from "cors";

import { toNodeHandler } from "better-auth/node";

import { auth } from "./lib/auth";

import errorHandler from "./middlewares/globalErrorHandling";
import { notFound } from "./middlewares/notFound";

const app: Application = express();

// app.use(cors({
//     origin: process.env.APP_URL || "http://localhost:3000",
//     credentials: true
// }))

app.use(cors({
    origin: process.env.APP_URL || "https://skillbridge-server-liart.vercel.app",
    credentials: true
}))

app.use(express.json());

app.use("/api/auth", toNodeHandler(auth))

// app.use("/api/auth", authRouter); // Remark: Better Auth handles /api/auth/* automatically. 
// If you want custom routes, use a different path or mount them before the handler.
app.use("/api/tutors", tutorRouter);
app.use("/categories", categoryRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/admin", adminRouter);

app.get("/", (req, res) => {
    res.send("SkillBridge is Running!")
})

app.use(notFound);

app.use(errorHandler);

export default app;
