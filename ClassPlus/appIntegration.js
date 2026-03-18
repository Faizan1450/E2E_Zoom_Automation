import fs from "fs";
import path from "path";
import { pipeline } from "stream/promises";
import uploadToClassplus from "./uploadToClassplus.js";
import { CLASSPLUS_URLS } from "./classplusBatches.js";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../mails/sendEmail.js";

const TEMP_DIR = "/tmp";

const appIntegration = asyncHandler(async (webhookBody, videoStream) => {
    const payload = webhookBody?.payload;
    if (!payload?.object) throw new Error("Invalid webhook body: missing payload.object");

    // 1.) Prepare metadata
    const date = convertDateFormat(payload.object.start_time);
    const batchName = payload.object.topic || "Zoom Recording";

    // 1. Get ClassPlus mapping for this batch
    const batch = CLASSPLUS_URLS[batchName.toLowerCase()];
    if (!batch) return;

    console.log(`🎬 ClassPlus App Integration: ${batchName}`);
    
    // 2. Download Zoom video → stream directly to disk (memory-safe)
    const tempFile = path.join(TEMP_DIR, `lecture_${Date.now()}.mp4`);
    const url = `${process.env.CLASSPLUS_BASE_URL}${batch.folderId}?id=${batch.courseId}`;
    try {
        const writer = fs.createWriteStream(tempFile);
        await pipeline(videoStream.data, writer);

        const fileSize = fs.statSync(tempFile).size;
        if (fileSize === 0) {
            console.log("❌ Downloaded file is empty for:", batchName);
            await sendEmail({ batchName, date, url, error:"Downloaded file is empty"}, "classplus_failure");
            return;
        }

        // 3. Upload to ClassPlus via API (reads from disk, not memory)
        await uploadToClassplus(tempFile, date.split(" ")[0], batch.folderId, batch.courseId);
        console.log(`✅ Lecture uploaded on SCALive application: ${batchName}`);
        await sendEmail({ batchName, date, url}, "classplus_success");
    } catch (error) {
        console.log("❌ ClassPlus Upload Error:", error.message);
        await sendEmail({ batchName, date, url, error: error.message }, "classplus_failure");
    } finally {
        // 4. Always cleanup temp file
        if (fs.existsSync(tempFile)) {
            fs.unlinkSync(tempFile);
        }
    }
    return;
});

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

export default appIntegration;