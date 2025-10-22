import { google } from "googleapis";
import fs from "fs";
import { fileURLToPath } from "url";
import path from "path";

// ✅ Convert import.meta.url to __dirname (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function authorize() {
  // Pull in the full JSON string from GitHub Secrets
  // const raw = process.env.GOOGLE_CREDENTIALS;
  const tokenPath = path.join(__dirname, "token.json");
  const raw = fs.readFileSync(tokenPath, "utf8");
  if (!raw) {
    throw new Error("Missing env var GOOGLE_CREDENTIALS");
  }

  let credentials;
  try {
    credentials = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON in GOOGLE_CREDENTIALS:", err.message);
    throw err;
  }

  // Now build the client from that JSON
  const client = google.auth.fromJSON(credentials);
  client.scopes = ["https://www.googleapis.com/auth/youtube.force-ssl"];
  return client;
}

await authorize();