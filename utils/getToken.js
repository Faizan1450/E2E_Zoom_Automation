import asyncHandler from "express-async-handler";
import 'dotenv/config';
const {
    ZOOM_ACCOUNT_ID,
    ZOOM_CLIENT_ID,
    ZOOM_CLIENT_SECRET,
} = process.env;

if (!ZOOM_ACCOUNT_ID || !ZOOM_CLIENT_ID || !ZOOM_CLIENT_SECRET) {
    console.error("Missing Zoom creds in .env");
    process.exit(1);
} 

let token = ""

export const getToken = asyncHandler(async() => {
    if(token) return token

    const url = `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(ZOOM_ACCOUNT_ID)}`;

    const auth = Buffer.from(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`).toString('base64');
    const response = await fetch(
        url, 
        {
            method: 'POST', 
            headers: {
                Authorization: `Basic ${auth}`
            } 
        }
    );
    
    if (!response?.ok) throw new Error(`Token error ${response?.status}`);
    const data = await response.json();
    token = data.access_token;
    return token
})