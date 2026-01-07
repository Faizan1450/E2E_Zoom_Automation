import asyncHandler from "express-async-handler"
import { sendEmail } from "../mails/sendEmail.js";

export const sendReminder = asyncHandler(async (webhookBody) => {
    const payload = webhookBody?.payload;
    if (!payload?.object) throw new Error("Invalid webhook body: missing payload.object");

    // 1.) Prepare metadata
    const date = payload.object.start_time.replace(/T/g, " ").replace(/Z/g, "");
    const topic = payload.object.topic || "Zoom Recording";
    const allowedTopics = [
        "Java Full Stack with SpringBoot",
        "Front-end",
        "Generative AI",
        "SpringBoot Project (17-DEC)"
    ];
    // "Sharma Computer Academy's Zoom Meeting"

    // ✅ Process only specific topics
    if (!allowedTopics.some(t => topic.toLowerCase().includes(t.toLowerCase()))) {
        return; // exit without processing
    }

    await sendEmail({ topic, date }, "reminder")
})