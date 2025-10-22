export const successMail = async (student) => {
    const name = student.name
    const passcode = escapeHtml(student.passcode)
    const date = student.date
    const batchName = student.batchName
    const url = student.url
    
  return `<!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8">
        <meta name="x-apple-disable-message-reformatting">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Backup Recording</title>
        <style>
            /* Dark mode tweaks (many clients ignore <style>, but harmless) */
            @media (prefers-color-scheme: dark) {
            body { background:#0b0e14 !important; }
            .card { background:#121826 !important; color:#e5e7eb !important; }
            .muted { color:#9ca3af !important; }
            }
        </style>
        </head>
        <body style="margin:0;padding:0;background:#f5f7fb;">
        <!-- Preheader (hidden preview text) -->
        <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
            Your backup recording for ${batchName || "the class"} held on ${
            date
        }.
        </div>

        <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f5f7fb;">
            <tr>
            <td align="center" style="padding:24px 12px;">
                <!-- Container -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="640" style="width:640px;max-width:100%;">
                <!-- Header -->
                <tr>
                    <td align="center" style="padding:12px 8px;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#6b7280;">
                        Sharma Computer Academy
                    </div>
                    </td>
                </tr>

                <!-- Card -->
                <tr>
                    <td class="card" style="background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;box-shadow:0 6px 20px rgba(17,24,39,0.08);">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%">
                        <tr>
                        <td style="padding:28px 28px 12px 28px;">
                            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                            <h1 style="margin:0 0 10px 0;font-size:20px;line-height:1.3;color:#111827;">
                                Backup Recording Ready
                            </h1>
                            <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#374151;">
                                Hi ${name || "there"},
                            </p>
                            <p style="margin:0 0 16px 0;font-size:16px;line-height:1.6;color:#374151;">
                                Here is the backup for <b>${
                                batchName || "the class"
                                }</b>
                                held on <b>${
                                date
                                }</b>. Please find your <b>backup recording</b> below:
                            </p>
                            </div>
                        </td>
                        </tr>

                        <!-- CTA Button -->
                        <tr>
                        <td align="left" style="padding:0 28px 8px 28px;">
                            <!--[if mso]>
                            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" href="${
                            student.url
                            }" arcsize="12%" strokecolor="#2563eb" fillcolor="#2563eb" style="height:44px;v-text-anchor:middle;width:230px;">
                            <w:anchorlock/>
                            <center style="color:#ffffff;font-family:Segoe UI,Arial,sans-serif;font-size:16px;font-weight:600;">
                                ▶︎ Watch Recording
                            </center>
                            </v:roundrect>
                            <![endif]-->
                            <!--[if !mso]><!-- -->
                            <a href="${url}"
                            style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;
                            padding:12px 18px;border-radius:8px;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
                            font-size:16px;font-weight:600;border:1px solid #2563eb;">
                            ▶︎ Watch Recording
                            </a>
                            <!--<![endif]-->
                        </td>
                        </tr>

                        <!-- Passcode block -->
                        <tr>
                        <td style="padding:8px 28px 4px 28px;">
                            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#374151;margin-bottom:10px;">
                            <b>Passcode:</b>
                            </div>
                            <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
                                        font-size:16px;letter-spacing:0.4px;color:#111827;background:#f3f4f6;
                                        border:1px solid #e5e7eb;border-radius:8px;padding:10px 12px;display:inline-block;"> <pre style="margin:0;">${passcode}</pre>
                            </div>
                        </td>
                        </tr>

                        <!-- Note -->
                        <tr>
                        <td style="padding:10px 28px 16px 28px;">
                            <p class="muted" style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:13px;color:#6b7280;">
                            Note: This link may expire soon. Please watch it within the next 24 hours.
                            </p>
                        </td>
                        </tr>

                        <!-- Divider -->
                        <tr>
                        <td style="padding:6px 28px;">
                            <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;">
                        </td>
                        </tr>

                        <!-- Sign-off -->
                        <tr>
                        <td style="padding:16px 28px 28px 28px;">
                            <p style="margin:0 0 12px 0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;color:#374151;">
                            Thank you for choosing us.<br>
                            Happy Coding!
                            </p>
                            <p style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-weight:700;color:#111827;">
                            Sharma Computer Academy
                            </p>
                        </td>
                        </tr>

                    </table>
                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td align="center" style="padding:16px 8px 0 8px;">
                    <div class="muted" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:12px;color:#9ca3af;line-height:1.6;">
                        If you didn’t expect this email, you can ignore it.
                    </div>
                    </td>
                </tr>
                <tr><td style="height:24px;font-size:0;line-height:0;">&nbsp;</td></tr>
                </table>
            </td>
            </tr>
        </table>
        </body>
        </html>`;
};

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
