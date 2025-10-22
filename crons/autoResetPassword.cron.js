import cron from "node-cron";
import { autoResetPassword } from "../utils/autoResetPassword.js";
import { sendEmail } from "../mails/sendEmail.js";
// 0 3 */3 * *
cron.schedule("0 5 */3 * *", async () => {
    const today = new Date();
    console.log("⏱️ Running Auto Reset Password job at", today.toLocaleString());
    try {
        const tracking = await autoResetPassword();
        await sendEmail(tracking, "resetSuccess")
        console.log("✅ Job completed successfully");
    } catch (error) {
        console.error("❌ Job failed:", error.message);
    }
});