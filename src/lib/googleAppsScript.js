/**
 * lib/googleAppsScript.js
 *
 * Submits the contact form to a Google Apps Script Web App, which appends
 * the entry to a Google Spreadsheet. No backend server required.
 *
 * SETUP:
 * 1. Create a Google Sheet with columns: Timestamp | Name | Email | Subject | Message
 * 2. Extensions > Apps Script, paste:
 *
 *    function doPost(e) {
 *      const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
 *      const data = JSON.parse(e.postData.contents);
 *      sheet.appendRow([new Date(), data.name, data.email, data.subject, data.message]);
 *      return ContentService.createTextOutput(JSON.stringify({ result: 'success' }))
 *        .setMimeType(ContentService.MimeType.JSON);
 *    }
 *
 * 3. Deploy > New deployment > Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the deployment URL into VITE_GOOGLE_SCRIPT_URL in your .env file.
 */

const SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

export async function submitContactForm(payload) {
  if (!SCRIPT_URL) {
    throw new Error(
      'Contact form is not configured yet. Set VITE_GOOGLE_SCRIPT_URL in your .env file.'
    );
  }

  const res = await fetch(SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors', // Apps Script doesn't return CORS headers by default
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  // With mode: 'no-cors' the response is opaque, so we optimistically
  // assume success if no network error was thrown.
  return res;
}
