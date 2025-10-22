import asyncHandler from "express-async-handler";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Required if you're using ES Modules — to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const addStudents = asyncHandler(async (req, res) => {
    try {
        // ✅ Validate body before writing
        if (!req.body) {
            return res.status(400).json({ status: "Failed", message: "No student data provided" });
        }

        // ✅ Safely convert data
        const studentsData = JSON.stringify(req.body, null, 4);

        // ✅ Create proper file path
        const filePath = path.resolve(__dirname, "../Students/dailyBackupStudents.json");

        // ✅ Write the data to file
        await fs.writeFile(filePath, studentsData, "utf-8");

        console.log("✅ Successfully updated the students file");
        res.json({ status: "Success", message: "Successfully updated the students file" });
    } catch (error) {
        console.error("❌ Failed to write students details:", error.message);
        res.status(500).json({ status: "Failed", message: error.message });
    }
});

export default addStudents;