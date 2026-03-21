import asyncHandler from "express-async-handler";
import axios from "axios";
import { sendEmail } from "../mails/sendEmail.js";

const appIntegration = asyncHandler(async (webhookBody) => {
    const classplusIntegrationEndpoint = process.env.CLASSPLUS_INTEGRATION
    try {
        const response = await axios.post(
            classplusIntegrationEndpoint,
            webhookBody,
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        if (response.data?.isIgnore) return;
        let message = response.data?.message;
        let batchName = response.data?.payload?.batchName;
        let date = response.data?.payload?.date;
        let url = response.data?.payload?.url;

        await sendEmail({ batchName, date, url, message }, "classplus_success");

    } catch (error) {
        let message = error.response?.data?.message;
        let batchName = error.response?.data?.payload?.batchName || "Unknown";
        let date = error.response?.data?.payload?.date || new Date().toLocaleString("en-IN", {timeZone: "Asia/Kolkata"});
        let url = error.response?.data?.payload?.url;

        await sendEmail({ batchName, date, url, message }, "classplus_failure");
        console.log("API Error:", message || error.message);
    }

});

export default appIntegration;