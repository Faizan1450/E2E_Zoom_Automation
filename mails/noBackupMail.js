// noBackupMail.js
// noBackupMail.js
export const noBackupMail = async (student = {}) => {
  const name = student.name || "Student";
  const batchName = student.batchName || "your batch";
  const date = student.date || "";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Backup Recording Not Available</title>
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
                      <h1 style="margin:0 0 10px 0;font-size:20px;color:#111827;">Backup Recording Not Available</h1>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        Hi ${escapeHtml(name)},
                      </p>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        We couldn’t find any backup recording for <b>${escapeHtml(batchName)}</b>
                        ${date ? `on <b>${escapeHtml(date)}</b>` : ""}. This usually happens when the selected date does not correspond to a scheduled class day for that batch.
                      </p>

                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        Please verify the batch name and date you entered and try again. If you believe this is an error, contact the <b>SCALive Management Team</b> — we’ll be happy to investigate and assist.
                      </p>

                      <p style="margin:0 0 0 0;font-size:16px;color:#374151;">
                        📩 You can contact us at <b>scazoombackup@gmail.com</b> for any <b>backup-related queries</b>.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Action (optional) -->
                <tr>
                  <td align="left" style="padding:0 28px 8px 28px;">
                    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;font-size:14px;color:#374151;">
                      <small>Please refill the backup form with the <b>correct date</b> (and your registered email). You’ll receive the recording once validated.</small>
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
                      Thank you for your understanding.<br><br>
                      Best regards,<br>
                      <b>Team Sharma Computer Academy</b>
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