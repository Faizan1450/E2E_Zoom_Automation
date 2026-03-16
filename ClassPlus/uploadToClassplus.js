import { chromium } from 'playwright';

const uploadToClassplus = async (videoBuffer, date, goto) => {
    const base64Auth = process.env.PLAYWRIGHT_AUTH_BASE64
    if (!base64Auth) {
        throw new Error("PLAYWRIGHT_AUTH_BASE64 is missing in environment");
    }
    const storageState = JSON.parse(Buffer.from(base64Auth, "base64").toString("utf-8"));


    let browser;

    try {
        // 1. Launch browser
        browser = await chromium.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            slowMo: 0
        });

        const context = await browser.newContext({
            storageState
        });

        const page = await context.newPage();

        // 3. Go directly to upload page
        await page.goto(goto, {
            waitUntil: "domcontentloaded",
            timeout: 120000
        });

        const videoButton = page.getByRole("button", { name: "Video" });
        await videoButton.waitFor({ state: "visible", timeout: 120000 });
        await videoButton.click();

        // 5. Wait for upload modal
        await page.getByText("Upload Video(s)").waitFor({ timeout: 120000 });

        // 6. Handle file chooser
        const [fileChooser] = await Promise.all([
            page.waitForEvent("filechooser"),
            page.getByRole("button", { name: "Select File(s)" }).click()
        ]);

        // 7. Select video file
        await fileChooser.setFiles({
            name: `New Lecture (${date}).mp4`,
            mimeType: "video/mp4",   // change if your video is a different format
            buffer: videoBuffer
        });

        await page.getByRole("button", { name: "Done" }).click({ timeout: 300000 });
    } finally {
        if (browser) await browser.close();
    }
};

export default uploadToClassplus;