import fetch from 'node-fetch';
import { getToken } from './getToken.js';
import asyncHandler from 'express-async-handler'

export const getMeetings = asyncHandler(async (from, to) => {
    const endpoint = `https://api.zoom.us/v2/accounts/me/recordings?from=${from}${to ? `&to=${to}` : ""}`

    const token = await getToken()
    const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });

    if (!res.ok) {
        console.error("Get Meetings File Failed at response")
        return null;
    }
    const data = await res.json();
    return data.meetings || [];
})