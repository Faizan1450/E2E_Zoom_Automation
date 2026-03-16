import asyncHandler from "express-async-handler"
import { sendEmail } from "../mails/sendEmail.js";
import appIntegration from "../ClassPlus/appIntegration.js";
import {CLASSPLUS_BATCHES } from "../ClassPlus/classplusBatches.js";

export const sendReminder = asyncHandler(async (webhookBody) => {
    const payload = webhookBody?.payload;
    if (!payload?.object) throw new Error("Invalid webhook body: missing payload.object");

    // 1.) Prepare metadata
    const date = convertDateFormat(payload.object.start_time);
    const topic = payload.object.topic || "Zoom Recording";

    // ✅ Process only specific topics
    if (!CLASSPLUS_BATCHES.some(t => t.toLowerCase().trim() === topic.toLowerCase().trim())) {
        return; // exit without processing
    }

    // Here I need code to upload on ClassPlus
    const status = await appIntegration(webhookBody, topic, date);
    const statusConstant = status ? "classplus_success" : "classplus_failure"
    await sendEmail({ topic, date, url }, statusConstant);
})

function convertDateFormat(dateStr) {
    // Input: "2026-03-14T15:38:21Z" (UTC)
    const utcDate = new Date(dateStr);

    // Convert to IST (UTC + 5:30)
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));

    const day = String(istDate.getUTCDate()).padStart(2, "0");
    const month = String(istDate.getUTCMonth() + 1).padStart(2, "0");
    const year = istDate.getUTCFullYear();
    const hours = String(istDate.getUTCHours()).padStart(2, "0");
    const minutes = String(istDate.getUTCMinutes()).padStart(2, "0");
    const seconds = String(istDate.getUTCSeconds()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}