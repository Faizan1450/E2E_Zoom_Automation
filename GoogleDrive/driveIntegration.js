// GoogleDrive/driveIntegration.js
import asyncHandler from "express-async-handler";
import { sendEmail } from "../mails/sendEmail.js";
import uploadStream from "./uploadStream.js";

const driveintegration = asyncHandler(async (webhookBody, videoStream) => {
    const payload = webhookBody?.payload;
    if (!payload?.object) throw new Error("Invalid webhook body: missing payload.object");

    // 1.) Prepare FileName metadata
    const topic = payload.object.topic || "Zoom Recording";
    const id = payload.object.id || "00000000";

    console.log(`🎬 Processing Drive automation for topic: "${topic}"`);
    let folderName = `${id} ${topic}`;
    let videoName;
    try {
        // 2.) Download Zoom MP4
        folderName = sanitizeDriveFolderName(folderName);
        const date = new Date(payload.object.start_time)
        videoName = date.toLocaleString("sv-SE", { timeZone: "Asia/Kolkata", hour12: false });

        // 3) Upload to Drive i.e scabhopal98@gmail.com
        await uploadStream(videoStream.data, folderName, videoName);
    } catch (error) {
        console.log("Error while uploading on drive")
        console.log(error.message)
        await sendEmail({ folderName, videoName }, "drive")
        return;
    }
});

const sanitizeDriveFolderName = (name) => {
    if (!name) return "Untitled Folder";

    return String(name)
        .replace(/[\u0000-\u001F\u007F]/g, "") // remove control chars
        .replace(/\s+/g, " ")                 // collapse spaces
        .replace(/'/g, "\\'")
        .trim();
}

export default driveintegration;