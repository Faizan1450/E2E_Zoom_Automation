import express from "express";
const healthCheckRouter = express.Router();

healthCheckRouter.get("/", (req, res) => {
    console.log("Request Received on home Router")
    res.status(200).json({
        status: "success",
        message: "E2E Zoom Automation backend is running fine 🚀"
    });
    return;
});

export default healthCheckRouter;