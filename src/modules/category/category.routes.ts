import express, { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma";
import auth, { UserRole } from '../../middlewares/auth';

const router = express.Router();

router.get("/", auth(UserRole.ADMIN), async (req: Request, res: Response) => {
    const categories = await prisma.category.findMany();
    res.json({
        success: true,
        data: categories
    });
});

export const categoryRouter: Router = router;