import asyncHandler from "express-async-handler";
import crypto from "crypto";
import fs from "fs/promises";
import path from "path";
import { sendEmail } from "../mails/sendEmail.js";
import { getPasscode } from "../utils/getPasscode.js";
import { fileURLToPath } from "url";
import youtubeAutomation from "../YouTube/youtubeAutomation.js";

// ✅ Required if you're using ES Modules — to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sendDailyBackup = asyncHandler(async (req, resp) => {
    const event = req.body.event

    // ✅ Step 1: Handle Zoom URL validation
    if (event === "endpoint.url_validation") {
        const plainToken = req.body.payload.plainToken;
        const secretToken = process.env.ZOOM_WEBHOOK_SECRET; // same as in Zoom app

        // Create encryptedToken
        const encryptedToken = crypto
            .createHmac("sha256", secretToken)
            .update(plainToken)
            .digest("hex");

        return resp.status(200).json({
            plainToken: plainToken,
            encryptedToken: encryptedToken
        });
    }

    // --- Ack immediately for real events (very important) ---
    resp.sendStatus(200);


    if (event === "recording.completed") {
        try {
            // Stopping youtube automation, as its not required after classplus update
            // youtubeAutomation(req.body)
            // Meting topic
            const topic = req.body.payload.object.topic.trim().toLowerCase()
            // Find students
            const filePath = path.resolve(__dirname, "../Students/dailyBackupStudents.json");
            const raw = await fs.readFile(filePath, "utf-8")
            let students = JSON.parse(raw)

            students = students.filter(student => {
                return student.batchName.trim().toLowerCase() === topic
            })

            if (students.length === 0) {
                console.warn(`⚠️ No students matched topic "${topic}"`);
                return;
            }

            // Require Variables
            let lecture = (req.body.payload.object.recording_files || []).find(f => f.file_type === 'MP4' && f.status === 'completed');
            const date = (lecture.recording_start || req.body.payload?.object?.start_time || "").slice(0, 10);

            // Passcode
            const passcode = await getPasscode({meeting_id: lecture.meeting_id});

            for(const student of students) {
                console.log("Entered in promise")
                student.url = lecture.play_url
                student.meeting_id = lecture.meeting_id
                student.date = date

                // ensure passcode
                student.passcode = passcode

                console.log(`✅ Prepared backup for ${student.email} (${student.batchName})`);
                await sendEmail(student, "success");
                await sleep(1000);
            }
        } catch (error) {
            console.log(error)
            return error
        }
    }
})

const sleep = ms => new Promise(res => setTimeout(res, ms));

export default sendDailyBackup
