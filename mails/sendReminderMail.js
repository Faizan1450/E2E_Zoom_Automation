export const sendReminderMail = async ({ topic, date }) => {
  const safeTopic = escapeHtml(topic ?? "Session");
  const safeDate = escapeHtml(date ?? "");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="x-apple-disable-message-reformatting">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Meeting Completed</title>
<style>
  @media (prefers-color-scheme: dark) {
    body { background:#0b0e14 !important; }
    .card { background:#121826 !important; color:#e5e7eb !important; }
    .muted { color:#9ca3af !important; }
  }
</style>
</head>

<body style="margin:0;padding:0;background:#f5f7fb;">
  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">
    ${safeTopic} meeting completed. Recording ready for upload.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:100%;">

          <!-- Header -->
          <tr>
            <td align="center" style="padding:12px 8px;">
              <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
                          font-size:14px;color:#6b7280;">
                Sharma Computer Academy
              </div>
            </td>
          </tr>

          <!-- Card -->
          <tr>
            <td class="card" style="background:#ffffff;border-radius:14px;
                                    border:1px solid #e5e7eb;
                                    box-shadow:0 6px 20px rgba(17,24,39,0.08);">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

                <!-- Content -->
                <tr>
                  <td style="padding:28px;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                      <h1 style="margin:0 0 12px 0;font-size:20px;color:#111827;">
                        Meeting Completed Successfully
                      </h1>

                      <p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;color:#374151;">
                        The meeting on <b>${safeTopic}</b> has been successfully completed.
                      </p>

                      ${safeDate
      ? `<p style="margin:0 0 14px 0;font-size:15px;line-height:1.6;color:#374151;">
                               <b>Date:</b> ${safeDate}
                             </p>`
      : ``
    }

                      <p style="margin:0 0 14px 0;font-size:16px;line-height:1.6;color:#374151;">
                        The recording is available in the <b>Drive</b>.  
                        Please check the Drive, download the video, and upload it on the
                        <b>SCALive application</b>.
                      </p>

                      <p class="muted" style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">
                        If you face any issue while accessing the Drive or during the upload,
                        please let <b>Faizan Sir</b> know.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:0 28px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;">
                  </td>
                </tr>

                <!-- Sign-off -->
                <tr>
                  <td style="padding:16px 28px 28px 28px;">
                    <p style="margin:0 0 8px 0;font-size:15px;color:#374151;
                              font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                      Thanks,
                    </p>
                    <p style="margin:0;font-weight:700;color:#111827;
                              font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                      Automation System
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 8px 0 8px;">
              <div class="muted" style="font-size:12px;color:#9ca3af;
                                        font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                This is an automated notification. No reply required.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};


function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}