// YouTube/youtubeAutomation.js
import asyncHandler from "express-async-handler";
import { google } from "googleapis";


const CLIENT_ID = process.env.DRIVE_CLIENT_ID
const CLIENT_SECRET = process.env.DRIVE_CLIENT_SECRET
const REDIRECT_URI = process.env.DRIVE_REDIRECT_URI
const REFRESH_TOKEN = process.env.DRIVE_REFRESH_TOKEN

// 1. Auth using Service Account
const oauth2client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2client.setCredentials({ refresh_token: REFRESH_TOKEN })

// 2. Drive client
const drive = google.drive({
    version: "v3",
    auth: oauth2client,
});

const uploadStream = asyncHandler(async (videoStream, folderName, videoName) => {
    const folderId = await getOrCreateFolder(folderName, "1v-WbChMAQtV3eYRbizcyWGUCzm8_-E1b");

    const fileMetadata = {
        name: videoName + ".mp4",
        parents: [folderId],
    };

    const media = {
        mimeType: "video/mp4",
        body: videoStream
    };

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media,
        fields: "id, name",
    });

    console.log("File Name:", response.data.name);
});

//! Helper
const getOrCreateFolder = async (folderName, parentId) => {
    
    // 1. Check if folder already exists
    const res = await drive.files.list({
        q: `
            mimeType = 'application/vnd.google-apps.folder'
            and name = '${folderName}'
            and '${parentId}' in parents
            and trashed = false
        `,
        fields: "files(id, name)",
    });

    if (res.data.files.length > 0) {
        return res.data.files[0].id;
    }

    // 2. Create folder if not exists
    const folderMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentId],
    };

    const folder = await drive.files.create({
        requestBody: folderMetadata,
        fields: "id",
    });

    return folder.data.id;
};

export default uploadStream;