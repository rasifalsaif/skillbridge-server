import { prisma } from "../../src/lib/prisma";

async function main() {

    // categories

    const math = await prisma.category.create({
        data: {
            name: "Mathematics"
        },
    });

    const physics = await prisma.category.create({
        data: {
            name: "Physics"
        },
    });

    const english = await prisma.category.create({
        data: {
            name: "English"
        },
    });

    // users

    const tutorUser = await prisma.user.create({
        data: {
            id: "tutor-user-1",
            name: "Md. Rahim",
            email: "tutor@test.com",
            role: "TUTOR",
        },
    });

    const studentUser = await prisma.user.create({
        data: {
            id: "student-user-1",
            name: "Md. Karim",
            email: "student@test.com",
            role: "STUDENT",
        },
    });

    // tutor profile

    await prisma.tutorProfile.create({
        data: {
            userId: tutorUser.id,
            bio: "Experienced math and physics tutor with 5+ years experience.",
            pricePerHr: 800,
            rating: 4.7,
            categories: {
                connect: [{ id: math.id }, { id: physics.id }],
            },
        }
    })

    console.log("Tutor Profile added");
}

main()

    .catch(console.error)
    .finally(() => prisma.$disconnect());