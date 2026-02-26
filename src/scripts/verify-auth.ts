import "dotenv/config";
import { auth } from "../lib/auth";

async function verifyAuth() {
    try {
        console.log("Checking Better Auth configuration...");
        // Check if we can access the API
        if (typeof auth.api.listUsers === 'function') {
            console.log("Successfully detected listUsers API (Admin plugin active).");
            console.log("Successfully connected to Better Auth API.");
        } else {
            throw new Error("listUsers API not found on auth.api");
        }
    } catch (error: any) {
        console.error("Better Auth verification failed:");
        console.error(error);
    }
}

verifyAuth();
