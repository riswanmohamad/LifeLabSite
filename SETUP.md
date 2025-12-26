# SkillsLab - Google Sheets Integration Setup Guide

This guide will help you connect the registration form to a Google Sheet to store all submissions.

---

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it **"SkillsLab Registrations"** (or any name you prefer)
4. In **Row 1**, add these column headers:
   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Name | Telephone | Status | Languages |

5. **Copy the Sheet ID** from the URL:
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Example: `1abc123xyz456...`

---

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code in the editor
3. **Copy and paste** the following code:

```javascript
/**
 * SkillsLab Registration Form Handler
 * This script receives form submissions and saves them to the Google Sheet
 */

// IMPORTANT: Replace with your actual Sheet ID
const SHEET_ID = 'YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1'; // Change if your sheet has a different name

/**
 * Handle POST requests from the registration form
 */
function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Open the spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // Format timestamp for readability
    const timestamp = new Date(data.timestamp).toLocaleString('en-US', {
      timeZone: 'Asia/Colombo', // Sri Lanka timezone - change as needed
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Append the data as a new row
    sheet.appendRow([
      timestamp,
      data.name,
      data.telephone,
      data.status,
      data.languages
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'success', 
        message: 'Registration saved successfully' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log the error and return error response
    console.error('Error processing registration:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'SkillsLab Registration API is running!' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Test function - run this to verify setup
 */
function testSetup() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  // Add a test row
  sheet.appendRow([
    new Date().toLocaleString(),
    'Test User',
    '0771234567',
    'school_10_13',
    'English, Tamil'
  ]);
  
  console.log('Test row added successfully!');
}
```

4. **Replace `YOUR_SHEET_ID_HERE`** with your actual Sheet ID from Step 1

5. Click **💾 Save** (or Ctrl+S)

6. Name the project: **"SkillsLab Form Handler"**

---

## Step 3: Deploy as Web App

1. Click **Deploy → New deployment**

2. Click the **⚙️ gear icon** next to "Select type" and choose **Web app**

3. Configure the deployment:
  - **Description**: "SkillsLab Registration Form Handler"
   - **Execute as**: "Me" (your email)
   - **Who has access**: **"Anyone"** ⚠️ (Important!)

4. Click **Deploy**

5. **Authorize the app** when prompted:
   - Click "Authorize access"
   - Choose your Google account
  - Click "Advanced" → "Go to SkillsLab Form Handler (unsafe)"
   - Click "Allow"

6. **Copy the Web App URL** that appears:
   - It looks like: `https://script.google.com/macros/s/AKfycb.../exec`

---

## Step 4: Update Your Website

1. Open **`js/data.js`** in your project

2. Find the `googleSheetConfig` section (around line 150):

```javascript
googleSheetConfig: {
    webAppUrl: "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE",
    isConfigured: false
}
```

3. **Replace** with your actual Web App URL and set `isConfigured` to `true`:

```javascript
googleSheetConfig: {
    webAppUrl: "https://script.google.com/macros/s/AKfycb.../exec",
    isConfigured: true
}
```

4. **Save the file**

---

## Step 5: Test the Integration

1. Open your website in a browser
2. Fill out the registration form with test data
3. Submit the form
4. Check your Google Sheet - a new row should appear!

---

## Troubleshooting

### Form submits but no data appears in Sheet

1. **Check the Web App URL** - Make sure it's correctly copied to `data.js`
2. **Check `isConfigured`** - Must be set to `true`
3. **Check Sheet ID** in Apps Script - Must match your actual sheet
4. **Check Sheet Name** - Default is "Sheet1", update if different

### "Authorization required" error

1. Run the `testSetup()` function in Apps Script first
2. Re-authorize if prompted
3. Re-deploy the web app

### CORS errors in browser console

This is normal when using `mode: 'no-cors'`. The form should still work - check if data appears in the sheet.

### Changes not taking effect

After modifying the Apps Script code:
1. Click **Deploy → Manage deployments**
2. Click the **✏️ edit** icon on your deployment
3. Change version to **"New version"**
4. Click **Deploy**

---

## Security Notes

- The Web App URL is public but only accepts POST data in a specific format
- Consider adding additional validation in the Apps Script
- You can add email notifications by modifying the script
- Regularly backup your Google Sheet data

---

## Optional: Email Notifications

Add this code to your Apps Script to receive email notifications for new registrations:

```javascript
function sendEmailNotification(data) {
  const recipient = 'your-email@example.com'; // Change this
  const subject = '🎓 New SkillsLab Registration: ' + data.name;
  const body = `
New registration received!

Name: ${data.name}
Phone: ${data.telephone}
Status: ${data.status}
Languages: ${data.languages}
Time: ${data.timestamp}

Check the spreadsheet for full details.
  `;
  
  MailApp.sendEmail(recipient, subject, body);
}
```

Then add this line in your `doPost` function after appending the row:
```javascript
sendEmailNotification(data);
```

---

## Need Help?

If you encounter issues:
1. Check the browser's Developer Console (F12) for errors
2. Check the Apps Script execution log: **View → Executions**
3. Verify all URLs and IDs are correct
4. Make sure the Google Sheet has the correct column headers

---

**Setup Complete! 🎉**

Your SkillsLab registration form is now connected to Google Sheets.
