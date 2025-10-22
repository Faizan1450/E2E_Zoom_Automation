import nodemailer from 'nodemailer';

// Use dotenv to load environment variables from the .env file
import 'dotenv/config';
import { successMail } from './successMail.js';
import { notRegisteredMail } from './notRegisterMail.js';
import {noBackupMail} from './noBackupMail.js'
import asyncHandler from 'express-async-handler'
import { resetSuccess } from './resetSuccessMail.js';
import { youtubeSuccess } from './youtubeSuccessMail.js';
import { multipleBackupsMail } from './multipleBackupsMail.js';

// 1. Create a "transporter" object
// This is the object that will actually send the email.
// We configure it to use Gmail's SMTP server.
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use the built-in Gmail service
    auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from .env file
        pass: process.env.EMAIL_PASS, // Your App Password from .env file
    },
});


export const sendEmail = asyncHandler(async (student, status) => {
    // 2. Define the email options
    // This is the content of the email you want to send.
    let mailHTML = ""
    let subject = ""
    let receiver = student?.email;
    if(status == "success") {
        mailHTML = await successMail(student)
        subject = `Backup Recording – ${student.batchName || "Class"} (${student.date})`
    } else if(status == "noBackup") {
        mailHTML = await noBackupMail(student)
        subject = `Backup Not Found for ${student.batchName} ${student.date ? `on ${student.date }` : ""} `
    } else if(status == "notRegistered") {
        mailHTML = await notRegisteredMail(student)
        subject = `Looks Like You’re Not Registered for ${student.batchName}`
    } else if (status == "resetSuccess") {
        mailHTML = await resetSuccess(student)
        subject = `🔐 Auto Reset Success - : New Passcodes Generated for All Recordings`
        receiver = `scalive4u@gmail.com`
    } else if(status == "youtube") {
        mailHTML = await youtubeSuccess(student)
        subject = `✅ YouTube Recording Uploaded – ${student.title} | ${student.date}`
        receiver = `scalive4u@gmail.com`
    } else if (status == "multipleBackups") {
        mailHTML = await multipleBackupsMail(student)
        subject = `Backup Request Limit Reached for ${student.batchName}`
    }
    const mailOptions = {
        from: `SCALive <${process.env.EMAIL_USER}>`, // Sender address
        to: receiver, // List of receivers
        subject: subject, // Subject line
        html: mailHTML,
    };

    // 3. Send the email
    // The sendMail method takes the mailOptions and a callback function.
    console.log(`Sending email to ${receiver}`);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(`Error in Send Email File: ${error}`);
            throw error;
        }
        console.log(`Email sent successfully to ${receiver}`);
        return { status: "Success", message: "Mail Sent", info }
    });
})