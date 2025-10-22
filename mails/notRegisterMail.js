export const notRegisteredMail = async (student) => {
  const name = student.name || "Student";
  const batchName = student.batchName || "your batch";

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Registration Required to Access ${batchName} Lectures</title>
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
              <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
                          font-size:14px;color:#6b7280;">
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
                      <h1 style="margin:0 0 10px 0;font-size:20px;color:#111827;">Registration Needed</h1>
                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        Hi ${name},
                      </p>
                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        We noticed that your email address is not registered for the <b>${batchName}</b> batch. Please note that <b>only registered (paid) students</b> are eligible to access the recorded lectures.
                      </p>
                      <p style="margin:0 0 16px 0;font-size:16px;color:#374151;">
                        If you believe this is an error, kindly refill the backup form using your <b>registered email ID</b> or reach out to the <b>SCALive Management Team</b> for further assistance.
                      </p>
                      <p style="margin:0 0 0 0;font-size:16px;color:#374151;">
                        📩 You can contact us at <b>scazoombackup@gmail.com</b> for any <b>backup-related queries</b>.
                      </p>
                    </div>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:6px 28px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;">
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="padding:16px 28px 28px 28px;">
                    <p style="margin:0;font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
                              font-size:15px;color:#374151;">
                      Thank you for your understanding.<br>
                      <br>
                      Best regards,<br>
                      <b>Team Sharma Computer Academy</b>
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer Info -->
          <tr>
            <td align="center" style="padding:16px 8px 0 8px;">
              <div class="muted" style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
                                        font-size:12px;color:#9ca3af;line-height:1.6;">
                If you’re already registered, kindly ignore this message.
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