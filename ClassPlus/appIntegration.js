import asyncHandler from "express-async-handler";
import axios from "axios";
import { sendEmail } from "../mails/sendEmail.js";

const appIntegration = asyncHandler(async (webhookBody) => {
    console.log(`🎬 ClassPlus App Integration`);

    const payload = webhookBody?.payload;

    // ✅ Validation
    if (!payload?.object) {
        console.error("Invalid webhook body: missing payload.object")
        return 
    }

    const date = convertDateFormat(payload.object.start_time);
    const batchName = payload.object.topic?.trim() || "Zoom Recording";

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

        let message = response.data?.message;
        // let batchName = response.data?.payload?.batchName;
        // let date = response.data?.payload?.date;
        let url = response.data?.payload?.url;

        await sendEmail({ batchName, date, url, message }, "classplus_success");

    } catch (error) {
        if (error.response?.data?.isIgnore) return;
        let message = error.response?.data?.message || error.message;;
        let url = error.response?.data?.payload?.url;

        await sendEmail({ batchName, date, url, message }, "classplus_failure");
        console.log("API Error:", message || error.message);
    }

});

function convertDateFormat(dateStr) {
    const options = {
        timeZone: "Asia/Kolkata",
        hour12: false,
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    };

    const parts = new Intl.DateTimeFormat("en-GB", options).formatToParts(new Date(dateStr));

    const map = {};
    parts.forEach(p => map[p.type] = p.value);

    return `${map.day}-${map.month}-${map.year} ${map.hour}:${map.minute}:${map.second}`;
}

export default appIntegration;