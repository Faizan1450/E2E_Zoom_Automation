export const resetSuccess = async (tracking = {}) => {
    const today = new Date().toLocaleString();
    const nextRun = new Date();
    nextRun.setDate(nextRun.getDate() + 3);   // ✅ add 3 days
    nextRun.setHours(3, 0, 0, 0);  

    const meetingRows = tracking
        .map(
            (m) => `
      <tr>
        <td style="padding:12px 0;">
          <div style="font-size:16px;font-weight:600;color:#111827;">📚 ${escapeHtml(
                m.topic
            )}</div>
          <div style="font-size:15px;color:#374151;">📅 Date: ${escapeHtml(
                m.date
            )}</div>
          <div style="font-size:15px;color:#374151;">🔗 <a href="${escapeHtml(
                m.url
            )}" target="_blank">View Recording</a></div>
          <div style="font-size:15px;color:#374151;">🔑 Old Passcode: <code>${escapeHtml(
                m.oldPasscode
            )}</code></div>
          <div style="font-size:15px;color:#374151;">🔐 New Passcode: <code>${escapeHtml(
                m.newPasscode
            )}</code></div>
        </td>
      </tr>
      <tr><td style="padding:6px 0;"><hr style="border:none;border-top:1px solid #e5e7eb;"></td></tr>
    `
        )
        .join("");

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Passcodes Updated Successfully</title>
  <style>
    @media (prefers-color-scheme: dark) {
      body { background:#0b0e14 !important; }
      .card { background:#121826 !important; color:#e5e7eb !important; }
      .muted { color:#9ca3af !important; }
    }
    a { color:#2563eb; text-decoration:none; }
    code { background:#f3f4f6; padding:2px 4px; border-radius:4px; }
  </style>
</head>
<body style="margin:0;padding:0;background:#f5f7fb;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f5f7fb;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:640px;max-width:100%;">

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
            <td class="card" style="background:#ffffff;border-radius:14px;border:1px solid #e5e7eb;
                                   box-shadow:0 6px 20px rgba(17,24,39,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">

                <!-- Title -->
                <tr>
                  <td style="padding:28px 28px 12px 28px;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                      <h1 style="margin:0 0 10px 0;font-size:20px;color:#111827;">✅ Password Rotation Completed</h1>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        Hello Sharma Computer Academy,
                      </p>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        📅 Today: <b>${escapeHtml(today)}</b>
                      </p>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        Great news — your <b>automated password rotation</b> job has successfully completed.  
                        All relevant Zoom recordings now have fresh passcodes for improved security and controlled access.
                      </p>

                      <p style="margin:0 0 20px 0;font-size:16px;color:#374151;">
                        🔐 Below is the summary of the updated recordings:
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Meeting rows -->
                <tr>
                  <td style="padding:0 28px 12px 28px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      ${meetingRows}
                    </table>
                  </td>
                </tr>

                <!-- Next Schedule -->
                <tr>
                  <td style="padding:12px 28px 12px 28px;">
                    <p style="margin:0;font-size:16px;color:#374151;">
                      📌 <b>Next scheduled rotation:</b> ${escapeHtml(nextRun)}
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
                    <p style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:15px;color:#374151;">
                      Our recordings are now secured through our internal auto-reset system.<br><br>
                      Best regards,<br>
                      <b>Auto Reset System 🤖</b><br>
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
                This is an automated email. No action is required unless further support is needed.
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