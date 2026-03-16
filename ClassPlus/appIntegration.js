import downloadZoomVideo from "../YouTube/downloadZoomVideo.js";
import uploadToClassplus from "./uploadToClassplus.js";
import { CLASSPLUS_URLS } from "./classplusBatches.js";
import asyncHandler from "express-async-handler";

const appIntegration = asyncHandler(async (webhookBody, batchName, date) => {
    date = date.split(" ")[0];
    console.log("Classplas App Integration")
    console.log(`Request Received for: ${batchName} + ( ${date} )`)

    const resp = await downloadZoomVideo(webhookBody);
    const chunks = [];
    for await (const chunk of resp.data) {
        chunks.push(chunk);
    }
    const videoBuffer = Buffer.concat(chunks);
    if (!videoBuffer) {
        console.log("Video Buffer is required", batchName);
        return;
    }
    
    const classplusBaseURL = process.env.CLASSPLUS_BASE_URL
    const url = CLASSPLUS_URLS[batchName.toLowerCase()];
    if (!url) {
        console.log("No URL found for batch:", batchName);
        return;
    }
    let gotoUrl = classplusBaseURL + url

    try {
        await uploadToClassplus(videoBuffer, date, gotoUrl)
    } catch (error) {
        console.log(error.message);
    }
    return;
});

export default appIntegration;