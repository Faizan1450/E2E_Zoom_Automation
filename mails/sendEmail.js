// mails/sendEmail.js
import 'dotenv/config';
import { Resend } from 'resend';
import asyncHandler from 'express-async-handler';

import { successMail } from './successMail.js';
import { notRegisteredMail } from './notRegisterMail.js';
import { noBackupMail } from './noBackupMail.js';
import { resetSuccess } from './resetSuccessMail.js';
import { youtubeSuccess } from './youtubeSuccessMail.js';
import { multipleBackupsMail } from './multipleBackupsMail.js';

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = asyncHandler(async (student, status) => {
    let mailHTML = '';
    let subject = '';
    let receiver = student?.email;

    // 🧠 Choose the correct mail template
    if (status === 'success') {
        mailHTML = await successMail(student);
        subject = `Backup Recording – ${student.batchName || 'Class'} (${student.date})`;
    } else if (status === 'noBackup') {
        mailHTML = await noBackupMail(student);
        subject = `Backup Not Found for ${student.batchName} ${student.date ? `on ${student.date}` : ''}`;
    } else if (status === 'notRegistered') {
        mailHTML = await notRegisteredMail(student);
        subject = `Looks Like You’re Not Registered for ${student.batchName}`;
    } else if (status === 'resetSuccess') {
        mailHTML = await resetSuccess(student);
        subject = `🔐 Auto Reset Success - New Passcodes Generated for All Recordings`;
        receiver = 'scalive4u@gmail.com';
    } else if (status === 'youtube') {
        mailHTML = await youtubeSuccess(student);
        subject = `✅ YouTube Recording Uploaded – ${student.title} | ${student.date}`;
        receiver = 'scalive4u@gmail.com';
    } else if (status === 'multipleBackups') {
        mailHTML = await multipleBackupsMail(student);
        subject = `Backup Request Limit Reached for ${student.batchName}`;
    }

    let attempt = 0;
    let maxAttempt = 2;
    while (true) {
        try {
            const res = await resend.emails.send({
                from: 'SCALive <no-reply@scalive.in>', // use verified sender later
                to: receiver,
                subject,
                html: mailHTML,
            });

            // Log everything you get back
            if (res?.error) {
                throw res.error
            }
            console.log(`✅ Email sent successfully to ${receiver}`);
            return { status: 'Success', message: '' };
        } catch (error) {
            attempt++;
            if (attempt < maxAttempt) {
                console.error('❌ Error in Send Email File:', error.message);
                console.error('Retrying Attempt');
                await sleep(1000);
                continue;
            }
            console.error('❌ Error in Send Email File:', error.message);
            return { status: 'Failed', message: error.message };
        }
    }
});

const sleep = ms => new Promise(res => setTimeout(res, ms));