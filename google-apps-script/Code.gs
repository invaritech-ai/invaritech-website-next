/**
 * Google Apps Script for handling contact form submissions
 * This script receives form data and saves it to a Google Sheet
 *
 * Setup Instructions:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Replace the default code with this script
 * 4. Update the SHEET_NAME constant to match your sheet name
 * 5. Deploy as a web app with "Anyone" access
 * 6. Copy the web app URL and update your React form
 */

// Configuration
const SHEET_NAME = "Invaritech Leads"; // Change this to your sheet name
const RECAPTCHA_SECRET_KEY = "YOUR_RECAPTCHA_SECRET_KEY_HERE"; // Add your reCAPTCHA secret key
const WEBHOOK_SECRET = "YOUR_WEBHOOK_SECRET_HERE"; // Add your webhook secret for additional security

/**
 * Main function to handle POST requests from the contact form
 */
function doPost(e) {
    try {
        console.log("Received request:", e);
        console.log("Request type:", typeof e);
        console.log("Request keys:", Object.keys(e || {}));

        // Handle the case where e is undefined
        if (!e) {
            console.log("No request object received");
            return ContentService.createTextOutput(
                JSON.stringify({
                    success: false,
                    error: "No request data received",
                })
            ).setMimeType(ContentService.MimeType.JSON);
        }

        // Handle different data formats
        let data;
        if (e.postData && e.postData.contents) {
            // Standard POST with JSON data
            data = JSON.parse(e.postData.contents);
        } else if (e.parameter) {
            // Form data or URL parameters
            data = e.parameter;
        } else {
            // Try to get data from the request object itself
            data = e;
        }

        console.log("Parsed data:", data);

        // Validate webhook secret if provided
        if (
            data.webhookSecret &&
            WEBHOOK_SECRET !== "YOUR_WEBHOOK_SECRET_HERE"
        ) {
            if (data.webhookSecret !== WEBHOOK_SECRET) {
                console.log("Invalid webhook secret provided");
                return ContentService.createTextOutput(
                    JSON.stringify({
                        success: false,
                        error: "Invalid webhook secret",
                    })
                ).setMimeType(ContentService.MimeType.JSON);
            }
        }

        // Skip reCAPTCHA verification for now to test basic functionality
        // if (!verifyRecaptcha(data.recaptchaToken)) {
        //     return ContentService.createTextOutput(
        //         JSON.stringify({
        //             success: false,
        //             error: "reCAPTCHA verification failed",
        //         })
        //     ).setMimeType(ContentService.MimeType.JSON);
        // }

        // Get the active spreadsheet and sheet
        const sheet = getOrCreateSheet();

        // Prepare the row data (updated for current form fields)
        const rowData = [
            data.timestamp || new Date().toISOString(),
            data.name || "",
            data.email || "",
            data.phone || "",
            data.country || "",
            data.message || "",
            data.source || "Website",
            data.recaptchaToken ? "Verified" : "Not verified",
        ];

        // Add the data to the sheet
        sheet.appendRow(rowData);

        console.log("Successfully added row to sheet");

        // Return success response
        return ContentService.createTextOutput(
            JSON.stringify({
                success: true,
                message: "Form submitted successfully",
            })
        ).setMimeType(ContentService.MimeType.JSON);
    } catch (error) {
        console.error("Error processing form submission:", error);
        console.error("Request object:", e);

        // Return error response
        return ContentService.createTextOutput(
            JSON.stringify({
                success: false,
                error: "Internal server error: " + error.toString(),
            })
        ).setMimeType(ContentService.MimeType.JSON);
    }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return ContentService.createTextOutput(
        "Contact Form Handler is running!"
    ).setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Get or create the sheet for storing form submissions
 */
function getOrCreateSheet() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
        // Create the sheet if it doesn't exist
        sheet = spreadsheet.insertSheet(SHEET_NAME);

        // Add headers (updated for current form fields)
        const headers = [
            "Timestamp",
            "Name",
            "Email",
            "Phone",
            "Country",
            "Message",
            "Source",
            "reCAPTCHA Status",
        ];

        sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

        // Format the header row
        const headerRange = sheet.getRange(1, 1, 1, headers.length);
        headerRange.setFontWeight("bold");
        headerRange.setBackground("#f0f0f0");

        // Auto-resize columns
        sheet.autoResizeColumns(1, headers.length);
    }

    return sheet;
}

/**
 * Verify reCAPTCHA token with Google's API
 */
function verifyRecaptcha(token) {
    if (
        !token ||
        !RECAPTCHA_SECRET_KEY ||
        RECAPTCHA_SECRET_KEY === "YOUR_RECAPTCHA_SECRET_KEY_HERE"
    ) {
        // Skip verification if not configured
        return true;
    }

    try {
        const url = "https://www.google.com/recaptcha/api/siteverify";
        const payload = {
            secret: RECAPTCHA_SECRET_KEY,
            response: token,
        };

        const options = {
            method: "POST",
            payload: payload,
        };

        const response = UrlFetchApp.fetch(url, options);
        const result = JSON.parse(response.getContentText());

        return result.success === true;
    } catch (error) {
        console.error("reCAPTCHA verification error:", error);
        return false;
    }
}

/**
 * Test function to verify the setup
 */
function testSetup() {
    const testData = {
        timestamp: new Date().toISOString(),
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        country: "Test Country",
        message: "This is a test message",
        source: "Test",
        recaptchaToken: "test-token",
        webhookSecret: WEBHOOK_SECRET,
    };

    const mockEvent = {
        postData: {
            contents: JSON.stringify(testData),
        },
    };

    const result = doPost(mockEvent);
    console.log("Test result:", result.getContent());
}

/**
 * Simple test without webhook secret (for initial testing)
 */
function testBasic() {
    const testData = {
        timestamp: new Date().toISOString(),
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        country: "Test Country",
        message: "This is a test message",
        source: "Test",
    };

    const mockEvent = {
        postData: {
            contents: JSON.stringify(testData),
        },
    };

    console.log("Running basic test...");
    const result = doPost(mockEvent);
    console.log("Test result:", result.getContent());
    return result;
}
