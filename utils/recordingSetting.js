import { generateZoomPasscode } from "./generateZoomPasscode.js"
import { getToken } from "./getToken.js"
import asyncHandler from 'express-async-handler'

export const getRecordingSettings = asyncHandler (async (meetingId) => {
    const token = await getToken()
    const data = await fetch(`https://api.zoom.us/v2/meetings/${meetingId}/recordings/settings`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return await data.json()
})

export const updateRecordingSettings = asyncHandler(async (meetingId) => {
    const token = await getToken()
    const passcode = generateZoomPasscode()
    await fetch(`https://api.zoom.us/v2/meetings/${meetingId}/recordings/settings`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
            share_recording: 'publicly',
            recording_authentication: false,
            viewer_download: false,
            on_demand: false,
            password: passcode,
            send_email_to_host: false,
            show_social_share_buttons: false
        })
    })

    return passcode;
})