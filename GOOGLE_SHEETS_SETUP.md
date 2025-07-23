# Google Sheets Integration for F1 Streetwear E-commerce

This guide will help you set up Google Sheets integration to automatically log user signups and password resets from your Framer application.

## 📋 Overview

When users successfully sign up or reset their password, the application will automatically send their data to a Google Sheet via a Google Apps Script webhook.

## 🚀 Setup Instructions

### Step 1: Create Google Apps Script Webhook

1. **Go to Google Apps Script**
   - Visit [https://script.google.com/](https://script.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "New project"
   - Give it a name like "F1-Streetwear-Webhook"

3. **Add the Webhook Code**
   - Replace the default `Code.gs` content with the code from `webhook.gs`
   - Update the `SHEET_ID` variable (see Step 2 below)

4. **Save and Deploy**
   - Save the project (Ctrl+S)
   - Click "Deploy" → "New deployment"
   - Choose "Web app" as the type
   - Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone"
   - Click "Deploy"
   - **Copy the web app URL** (you'll need this for Step 3)

### Step 2: Create or Use Existing Google Sheet

**Option A: Create New Sheet**
1. The script will automatically create a new sheet on first run
2. Check the logs for the new Sheet ID
3. Update the `SHEET_ID` in your Apps Script

**Option B: Use Existing Sheet**
1. Open your Google Sheet
2. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
3. Update the `SHEET_ID` variable in the Apps Script

### Step 3: Update Framer Application

1. **Update the Webhook URL**
   - Open `src/code/store.ts`
   - Replace `YOUR_SCRIPT_ID` in the `GOOGLE_APPS_SCRIPT_WEBHOOK_URL` with your actual webhook URL

```typescript
const GOOGLE_APPS_SCRIPT_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec"
```

## 📊 Data Structure

The Google Sheet will contain the following columns:

| Column | Description | Example |
|--------|-------------|---------|
| Timestamp | ISO timestamp from client | 2025-01-23T10:30:00Z |
| Action | Type of action | signup, password_reset |
| Email | User's email address | john.doe@example.com |
| First Name | User's first name (signup only) | John |
| Last Name | User's last name (signup only) | Doe |
| Date Added | Server timestamp | 2025-01-23T10:30:15Z |

## 🎨 Sheet Formatting

The script automatically formats the sheet with:
- **Header row**: F1 Racing Red background (#DC143C) with white text
- **Signup rows**: Light green background (#E8F5E8)
- **Password reset rows**: Light orange background (#FFF2E8)
- **Auto-resized columns** for better readability

## 🧪 Testing the Integration

### Test from Framer Application
1. Go to the Sign Up page
2. Fill out the form and submit
3. Check your Google Sheet for the new entry
4. Try the Forgot Password flow
5. Verify both actions appear in the sheet

### Test Google Apps Script Directly
1. In the Apps Script editor, run the `testWebhook()` function
2. Check the execution log for any errors
3. Verify test data appears in your sheet

## 🔧 Troubleshooting

### Common Issues

**1. "Script not found" error**
- Verify the webhook URL is correct
- Make sure the deployment is set to "Anyone" access

**2. "Permission denied" error**
- Check that "Execute as" is set to "Me"
- Verify you have edit access to the target Google Sheet

**3. "Sheet not found" error**
- Verify the `SHEET_ID` is correct
- Make sure the sheet exists and is accessible

**4. No data appearing in sheet**
- Check the Apps Script execution log for errors
- Verify the webhook URL in `store.ts` is correct
- Open browser dev tools and check for network errors

### Debug Steps

1. **Check Browser Console**
   ```javascript
   // Open browser dev tools and look for:
   console.log("📊 Sending data to Google Sheets:", data)
   console.log("✅ Data sent to Google Sheets successfully")
   ```

2. **Check Apps Script Logs**
   - Go to your Apps Script project
   - Click "Executions" to see recent runs
   - Check for any error messages

3. **Test Manual Request**
   ```bash
   curl -X POST "YOUR_WEBHOOK_URL" \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","action":"signup","timestamp":"2025-01-23T10:30:00Z","firstName":"Test","lastName":"User"}'
   ```

## 🔒 Security Considerations

- The webhook is publicly accessible but only accepts specific data formats
- No sensitive data (passwords) is transmitted
- All data is logged with timestamps for audit purposes
- Consider adding authentication tokens for production use

## 📈 Analytics Ideas

With the data in Google Sheets, you can:

1. **Track User Growth**
   - Count signups by day/week/month
   - Identify peak registration times

2. **Monitor Password Reset Frequency**
   - Track how often users forget passwords
   - Identify patterns that might indicate UX issues

3. **Create Dashboards**
   - Use Google Sheets charts
   - Connect to Google Data Studio
   - Export to other analytics tools

## 🎯 Next Steps

1. Set up the integration following the steps above
2. Test with a few test accounts
3. Monitor the sheet for a few days
4. Consider adding more data points as needed
5. Set up Google Sheets notifications for new entries

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the Apps Script execution logs
3. Verify all URLs and IDs are correct
4. Test with the provided `testWebhook()` function

---

**Happy tracking! 🏎️**
