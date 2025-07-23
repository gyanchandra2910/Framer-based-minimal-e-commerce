/**
 * Google Apps Script Webhook for F1 Streetwear E-commerce
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://script.google.com/
 * 2. Create a new project
 * 3. Replace the default code with this script
 * 4. Save the project with a name like "F1-Streetwear-Webhook"
 * 5. Click "Deploy" > "New deployment"
 * 6. Choose "Web app" as the type
 * 7. Set "Execute as" to "Me"
 * 8. Set "Who has access" to "Anyone"
 * 9. Click "Deploy" and copy the web app URL
 * 10. Replace GOOGLE_APPS_SCRIPT_WEBHOOK_URL in store.ts with your URL
 */

// The ID of your Google Sheet (get this from the URL)
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';

// The name of the worksheet tab
const SHEET_NAME = 'F1-Streetwear-Users';

/**
 * Main function that handles POST requests from Framer
 */
function doPost(e) {
  try {
    // Parse the incoming JSON data
    const data = JSON.parse(e.postData.contents);
    
    console.log('Received data:', data);
    
    // Validate required fields
    if (!data.email || !data.action || !data.timestamp) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: false,
          error: 'Missing required fields: email, action, timestamp'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Get or create the spreadsheet
    const sheet = getOrCreateSheet();
    
    // Add data to the sheet
    const result = addDataToSheet(sheet, data);
    
    if (result.success) {
      return ContentService
        .createTextOutput(JSON.stringify({
          success: true,
          message: 'Data added successfully',
          rowNumber: result.rowNumber
        }))
        .setMimeType(ContentService.MimeType.JSON);
    } else {
      throw new Error(result.error);
    }
    
  } catch (error) {
    console.error('Error processing request:', error);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
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
      status: 'F1 Streetwear Webhook Active',
      timestamp: new Date().toISOString(),
      message: 'Send POST requests with user data to log to Google Sheets'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Get existing sheet or create a new one
 */
function getOrCreateSheet() {
  try {
    // Try to open existing spreadsheet
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);
    
    // If sheet doesn't exist, create it
    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      setupSheetHeaders(sheet);
    }
    
    return sheet;
    
  } catch (error) {
    // If spreadsheet doesn't exist, create a new one
    console.log('Creating new spreadsheet...');
    const spreadsheet = SpreadsheetApp.create('F1 Streetwear User Data');
    const sheet = spreadsheet.getActiveSheet();
    sheet.setName(SHEET_NAME);
    setupSheetHeaders(sheet);
    
    console.log('New spreadsheet created with ID:', spreadsheet.getId());
    console.log('Please update SHEET_ID in this script with:', spreadsheet.getId());
    
    return sheet;
  }
}

/**
 * Set up column headers for the sheet
 */
function setupSheetHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Action',
    'Email',
    'First Name',
    'Last Name',
    'Date Added'
  ];
  
  // Add headers to the first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Format the header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#DC143C'); // F1 Racing Red
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(12);
  
  // Auto-resize columns
  sheet.autoResizeColumns(1, headers.length);
  
  console.log('Sheet headers set up successfully');
}

/**
 * Add data to the sheet
 */
function addDataToSheet(sheet, data) {
  try {
    // Prepare row data
    const rowData = [
      data.timestamp,
      data.action,
      data.email,
      data.firstName || '',
      data.lastName || '',
      new Date().toISOString()
    ];
    
    // Find the next empty row
    const lastRow = sheet.getLastRow();
    const nextRow = lastRow + 1;
    
    // Add the data
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    // Format the new row
    const newRowRange = sheet.getRange(nextRow, 1, 1, rowData.length);
    newRowRange.setBorder(true, true, true, true, false, false);
    
    // Color code based on action
    if (data.action === 'signup') {
      newRowRange.setBackground('#E8F5E8'); // Light green for signups
    } else if (data.action === 'password_reset') {
      newRowRange.setBackground('#FFF2E8'); // Light orange for password resets
    }
    
    console.log('Data added to row:', nextRow);
    
    return {
      success: true,
      rowNumber: nextRow
    };
    
  } catch (error) {
    console.error('Error adding data to sheet:', error);
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Test function to simulate webhook calls
 */
function testWebhook() {
  // Test signup data
  const signupData = {
    email: 'test@example.com',
    action: 'signup',
    timestamp: new Date().toISOString(),
    firstName: 'John',
    lastName: 'Doe'
  };
  
  // Test password reset data
  const resetData = {
    email: 'test@example.com',
    action: 'password_reset',
    timestamp: new Date().toISOString()
  };
  
  console.log('Testing signup...');
  const sheet = getOrCreateSheet();
  const signupResult = addDataToSheet(sheet, signupData);
  console.log('Signup test result:', signupResult);
  
  console.log('Testing password reset...');
  const resetResult = addDataToSheet(sheet, resetData);
  console.log('Reset test result:', resetResult);
}
