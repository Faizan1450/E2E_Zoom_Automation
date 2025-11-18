// YouTube/youtubeAutomation.js
import asyncHandler from "express-async-handler";
import downloadZoomVideo from "./downloadZoomVideo.js";
import uploadToYoutube from "./uploadToYoutube.js";
import { sendEmail } from "../mails/sendEmail.js";

const youtubeAutomation = asyncHandler(async (webhookBody) => {
    const payload = webhookBody?.payload;
    if (!payload?.object) throw new Error("Invalid webhook body: missing payload.object");

    // 1.) Prepare YouTube metadata
    const topic = payload.object.topic || "Zoom Recording";
    const allowedTopics = ["Java Full Stack with SpringBoot", "Java Full Stack Online (25-Oct)", "Sharma Computer Academy's Zoom Meeting", "Front-end", "Generative AI (14-Nov)", "GenAI (29-nov-25)"];

    // ✅ Process only specific topics
    if (!allowedTopics.some(t => topic.toLowerCase().includes(t.toLowerCase()))) {
        return; // exit without processing
    }

    console.log(`🎬 Processing YouTube automation for topic: "${topic}"`);

    // 2.) Download Zoom MP4
    const videoFile = await downloadZoomVideo(webhookBody);
    const date = payload.object.start_time.substring(0, 10);

    const title = `${topic} | ${date}`;
    const description = [
        "Auto-uploaded from Zoom",
        `Meeting ID: ${payload.object.id}`,
        `Date: ${date || ""}`,
        `Topic: ${topic}`
    ].join("\n");

    // 3) Upload to YouTube (unlisted)
    let youtubeURL;
    try {
        youtubeURL = await uploadToYoutube({
            videoFile,
            title,
            description,
            tags: ["Zoom", "Lecture", "SCA"],
            privacyStatus: "unlisted",
        });
    } catch (error) {
        console.log("Error while uploading on youtube")
        console.log(error)
        return;
    }

    await sendEmail({ title, date, youtubeURL }, "youtube")
});

export default youtubeAutomation;