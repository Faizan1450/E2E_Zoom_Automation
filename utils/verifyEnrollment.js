import fetch from 'node-fetch';
import { getToken } from './getToken.js';
import asyncHandler from "express-async-handler";

export const verifyEnrollment = asyncHandler(async (student) => {
    const endpoint = `https://api.zoom.us/v2/meetings/${student.batchId}/registrants?page_size=500`
    const token = await getToken()
    const res = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
    if (!res.ok) {
        console.log("VerifyEnrolment File Failed at response")
        return false;
    }

    const data = await res.json();
    const registrants = data.registrants || []
    const registrant = registrants.find(registrant => registrant.email == student.email)
    if (registrant?.status == "approved") {
        console.log(`${student.name} is Approved for ${student.batchName} batch`)
        return true;
    }
    console.log(`${student.name} is NOT approved for ${student.batchName} batch`)
    return false;
    // return true
})