import express from "express";
const healthCheckRouter = express.Router();

healthCheckRouter.get("/", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "E2E Zoom Automation backend is running fine 🚀"
    });
});

export default healthCheckRouter;