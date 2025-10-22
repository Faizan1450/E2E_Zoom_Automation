// multipleBackupsMail.js
export const multipleBackupsMail = async (student = {}) => {
    const name = student.name || "Student";
    const batchName = student.batchName || "your batch";

    return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Multiple Backup Requests Detected</title>
  <style>
    @media (prefers-color-scheme: dark) {
      body { background:#0b0e14 !important; }
      .card { background:#121826 !important; color:#e5e7eb !important; }
      .muted { color:#9ca3af !important; }
    }
    a { color:#2563eb; text-decoration:none; }
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

                <!-- Title & message -->
                <tr>
                  <td style="padding:28px 28px 12px 28px;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
                      <h1 style="margin:0 0 10px 0;font-size:20px;color:#111827;">Multiple Backup Requests Detected</h1>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        Hi ${escapeHtml(name)},
                      </p>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        We noticed that you’ve already requested <strong>multiple backups for ${escapeHtml(batchName)}</strong> within the past 7 days. As per our policy, we can only provide a limited number of backup recordings during this period.
                      </p>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        We kindly request you to <strong>contact the SCALive Management Team</strong> for further assistance or clarification regarding your backup requests.
                      </p>

                      <p style="margin:0 0 0 0;font-size:16px;color:#374151;">
                        📩 You can reach us at <strong>scazoombackup@gmail.com</strong> for any <strong>backup-related queries</strong>.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Note -->
                <tr>
                  <td align="left" style="padding:0 28px 8px 28px;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#374151;">
                      <small>Please avoid submitting additional backup requests for the same batch or date until advised by management. This helps us maintain a fair and smooth process for all students.</small>
                    </div>
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
                      Thank you for your understanding and cooperation.<br><br>
                      Best regards,<br>
                      <strong>Team Sharma Computer Academy</strong>
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
                If you’re already in touch with support, kindly ignore this message.
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