import { getMeetings } from "./getMeetings.js";
import asyncHandler from "express-async-handler";

export const searchBackup = asyncHandler(async (student) => {
    const from = student.date;
    const to = student.date;
    //! Search Backup
    console.log(`Searching recordings for Duration: from ${from} to ${to} ...`);
    // Fetch All Lectures in Given Duration
    const meetings = await getMeetings(from, to);
    if (!meetings) {
        //! Code to mail that backup is not found
        console.log(`No matching recording found on ${from}`);
        return false;
    }
    // getBackup URL
    for (const meeting of meetings) {
        if (meeting.topic.toLowerCase().includes(student.batchName.toLowerCase())) {
            student.batchId = meeting.id

            let lecture = (meeting.recording_files || []).find(f => f.file_type === 'MP4' && f.status === 'completed');


            student.url = lecture.play_url
            student.meeting_id = encodeURIComponent(lecture.meeting_id);
            student.date = lecture.recording_start.substring(0, 10)
            console.log("Video URL is fetched ✅")
            return true;
        }
    }
    console.log(`No matching recording found on ${from}`);
    return false
})

