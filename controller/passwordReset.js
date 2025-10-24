import { updateRecordingSettings, getRecordingSettings } from "../utils/recordingSetting.js"
import asyncHandler from "express-async-handler"
import { getMeetings } from "../utils/getMeetings.js";
import { sendEmail } from "../mails/sendEmail.js";

export const passwordReset = asyncHandler(async (req, resp) => {
    let {from, to} = req.body;

    if (isNaN(from) || isNaN(to)) {
        resp.status(400).json({ status: "Failed", message: "Invalid 'from' or 'to' value" });
        return 
    } 

    from = Number(from)
    to = Number(to)

    if(from < to) {
        resp.status(400).json({ status: "Failed", message: "'from' should be greater or equal to 'to'" });
        return 
    }

    from = getDateAgo(from)
    to = getDateAgo(to)

    const meetings = await getMeetings(from, to);
    if (!meetings) {
        //! Code to mail that backup is not found
        console.error(`Something went wrong in autoResetPassword file's API call `);
        return false;
    }
    const tracking = [];
    for (const meeting of meetings) {
        let lecture = (meeting.recording_files || []).find(f => f.file_type === 'MP4' && f.status === 'completed');
        if (!lecture) {
            console.log(`MP4 File with completed status not found for ${meeting.topic}and ${meeting.start_time.substring(0, 10)}`)
            continue;
        }
        const settings = await getRecordingSettings(lecture.meeting_id)
        tracking.push({
            topic: meeting.topic,
            date: meeting.start_time.substring(0, 10),
            meeting_id: lecture.meeting_id,
            url: lecture.play_url,
            oldPasscode: settings.password,
            newPasscode: await updateRecordingSettings(lecture.meeting_id)
        })
    }

    const mailResponse = await sendEmail(tracking, "resetSuccess")
    console.log(`🔐 Auto Reset Success - New Passcodes Generated for All Recordings`);
    resp.status(200).json({
        status: mailResponse.status,
        message: `${mailResponse.message} 🔐 New Passcodes Generated for All Recordings`
    });
})

function getDateAgo(daysAgo = 0) {
    const dateObj = new Date()
    // If daysAgo is provided, subtract that many days
    if (daysAgo && typeof daysAgo === "number") {
        dateObj.setDate(dateObj.getDate() - daysAgo);
    }

    // Extract year, month, and day
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // months are 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');

    // Return formatted date
    return `${year}-${month}-${day}`;
}