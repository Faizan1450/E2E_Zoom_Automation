// YouTube/uploadToYouTube.js
import fs from "fs";
import { google } from "googleapis";
import { authorize } from "./auth.js";

export default async function uploadToYoutube(opts) {
    const {videoFile, title, description, tags = [],privacyStatus = "unlisted"} = opts;

    const auth = await authorize();

    if (!auth) throw new Error("uploadToYouTube: missing auth client");
    if (!videoFile) throw new Error("uploadToYouTube: missing videoFile");

    const youtube = google.youtube({ version: "v3", auth });

    const res = await youtube.videos.insert({
        part: ["snippet", "status"],
        requestBody: {
            snippet: { title, description, tags },
            status: { privacyStatus },
        },
        media: { body: videoFile.data },
    });

    const videoId = res?.data?.id;
    if (!videoId) throw new Error("YouTube upload failed: no video id returned.");

    return `https://youtu.be/${videoId}`;
}