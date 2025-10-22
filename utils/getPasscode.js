import 'dotenv/config';
import { updateRecordingSettings, getRecordingSettings } from "./recordingSetting.js"
import asyncHandler from "express-async-handler"


export const getPasscode = asyncHandler(async (student) => {
    const meeting_id = student.meeting_id
    console.log("Fetching Video Settings")
    let settings = await getRecordingSettings(meeting_id)
    if (settings.recording_authentication) {
        console.log("Updating Settings")
        await updateRecordingSettings(meeting_id)
        settings = await getRecordingSettings(meeting_id)
    }

    return settings.password
})