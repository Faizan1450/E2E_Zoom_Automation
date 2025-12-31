import asyncHandler from "express-async-handler";
import { sendEmail } from "../mails/sendEmail.js";
import { getPasscode } from "../utils/getPasscode.js";
import { searchBackup } from "../utils/searchBackup.js";
import { verifyEnrollment } from "../utils/verifyEnrollment.js";

const sendBackup = asyncHandler(async (req, resp) => {
    //! Verify Student Object
    const student = req.body;
    student.date = convertDateFormat(student.date)

    const verifiedMails = [
        "syedfaizanali1450@gmail.com",
        "jshruti123sjp@gmail.com",
        "scalive4u@gmail.com",
        "scazoombackup@gmail.com",
        "scabhopal98@gmail.com",
        "ksachin95@gmail.com",
        "sharma.computer.academy@gmail.com",
        "ajaydhangar0101@gmail.com"
    ]
    let isVerified = verifiedMails.find(mail => mail.toLowerCase() === student.email.toLowerCase())
    if (!isVerified && student.count >= 2) {
        console.log(`${student.name} already Received ${student.count} Backups in Last 7 Days`)
        const mailResponse = await sendEmail(student, "multipleBackups");
        resp.status(200).json({
            status: "Failed",
            message: `${mailResponse.message}\nAlready Received ${student.count} Backups in Last 7 Days`
        });
        return 
    }

    //! Search Backup for that date
    let result = await searchBackup(student) //append batchID, messageID, url
    if (!result) {
        const mailResponse = await sendEmail(student, "noBackup")
        resp.status(200).json({
            status: "Failed",
            message: `${mailResponse.message}\nNo Backup Found`
        });
        return;
    }

    //! Student Verification
    if (!isVerified) isVerified = await verifyEnrollment(student)
    if (!isVerified) {
        console.log(`${student.name} is not registered for ${student.batchName} batch`)
        const mailResponse = await sendEmail(student, "notRegistered")
        resp.status(200).json({
            status: "Failed",
            message: `${mailResponse.message}\nStudent is not registered`
        });
        return
    }

    //! check/update the passcode
    student.passcode = await getPasscode(student)
    console.log(`Passcode is fetched for ${student.email}`)

    //! code to send mail
    const mailResponse = await sendEmail(student, "success")
    resp.status(200).json({
        status: mailResponse.status,
        message: `${mailResponse.message}\nBackup Sent`
    });
})

function convertDateFormat(dateStr) {
    // Split the input string by '/'
    const [month, day, year] = dateStr.split('/');

    // Return in YYYY-MM-DD format with zero padding if necessary
    const formattedMonth = month.padStart(2, '0');
    const formattedDay = day.padStart(2, '0');

    return `${year}-${formattedMonth}-${formattedDay}`;
}

export default sendBackup
