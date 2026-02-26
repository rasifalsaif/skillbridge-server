import "dotenv/config";
import { auth } from "../lib/auth";

async function testSignUp() {
    try {
        const user = await auth.api.signUpEmail({
            name: "Rasif Saif",
            email: "rasifalsaif@gmail.com",
            password: "securePassword@123",
        });
        console.log("Sign‑up succeeded:", user);
    } catch (err: any) {
        console.error("Sign‑up failed:", err?.message || err);
    }
}

testSignUp();
