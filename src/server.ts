import { prisma } from "../src/lib/prisma";

import app from "./app";

async function main() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    } catch (error) {
        console.error("An error occurred:", error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "production") {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error);
    }
}

export default app;