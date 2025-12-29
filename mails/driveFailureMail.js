export const driveFailure = async ({ folderName, videoName }) => {
  const safeFolder = escapeHtml(folderName ?? "Unknown Folder");
  const safeVideo = escapeHtml(videoName ?? "Unknown Video");

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="x-apple-disable-message-reformatting">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Drive Upload Failed</title>
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
    Drive upload failed for ${safeVideo}.
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fb;">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="640" cellpadding="0" cellspacing="0" style="max-width:100%;">
          
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
              <table width="100%" cellpadding="0" cellspacing="0">

                <tr>
                  <td style="padding:28px 28px 12px;">
                    <h1 style="margin:0 0 10px;font-size:20px;color:#b91c1c;">
                      Drive Upload Failed
                    </h1>

                    <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#374151;">
                      The system encountered an error while uploading a Zoom recording to <b>Google Drive</b>.
                    </p>

                    <p style="margin:0 0 10px;font-size:15px;color:#374151;">
                      <b>Folder:</b> ${safeFolder}
                    </p>

                    <p style="margin:0 0 16px;font-size:15px;color:#374151;">
                      <b>Video:</b> ${safeVideo}
                    </p>

                    <p class="muted" style="margin:0;font-size:14px;color:#6b7280;">
                      This failure may be due to a temporary Drive API issue, permission problem, or network interruption.
                    </p>
                  </td>
                </tr>

                <!-- Divider -->
                <tr>
                  <td style="padding:6px 28px;">
                    <hr style="border:none;border-top:1px solid #e5e7eb;margin:0;">
                  </td>
                </tr>

                <!-- Action Note -->
                <tr>
                  <td style="padding:16px 28px 28px;">
                    <p style="margin:0;font-size:14px;line-height:1.6;color:#374151;">
                      Please review logs and retry the upload manually if required.
                    </p>

                    <p style="margin:12px 0 0;font-weight:700;color:#111827;">
                      Backup Automation System
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:16px 8px 0;">
              <div class="muted" style="font-size:12px;color:#9ca3af;">
                This is an automated alert. No action is required if already resolved.
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