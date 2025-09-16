/**
 * Google Apps Script for Lead Capture
 * This script receives form submissions and writes them to a Google Sheet
 */

// Configuration - Update these with your actual values
const CONFIG = {
    SPREADSHEET_ID: "YOUR_SPREADSHEET_ID_HERE", // Replace with your Google Sheet ID
    SHEET_NAME: "Leads", // Name of the sheet tab
    WEBHOOK_SECRET: "YOUR_WEBHOOK_SECRET_HERE", // Optional: for additional security
    RECAPTCHA_SECRET_KEY: "YOUR_RECAPTCHA_SECRET_KEY_HERE", // reCAPTCHA v3 secret key
    RECAPTCHA_MIN_SCORE: 0.5, // Minimum score for reCAPTCHA v3 (0.0 to 1.0)
};

/**
 * Main function to handle POST requests
 * This function will be called when the web app receives a POST request
 */
function doPost(e) {
    try {
        // Parse the incoming data
        const data = JSON.parse(e.postData.contents);

        // Validate the data
        if (!validateFormData(data)) {
            return createResponse(400, { error: "Invalid form data" });
        }

        // Validate reCAPTCHA if token is provided
        if (data.recaptchaToken) {
            const recaptchaValid = validateRecaptcha(data.recaptchaToken);
            if (!recaptchaValid) {
                return createResponse(400, {
                    error: "reCAPTCHA verification failed",
                });
            }
        }

        // Write to Google Sheet
        const result = writeToSheet(data);

        if (result.success) {
            return createResponse(200, {
                message: "Lead captured successfully",
                id: result.id,
            });
        } else {
            return createResponse(500, { error: "Failed to save lead" });
        }
    } catch (error) {
        console.error("Error processing form submission:", error);
        return createResponse(500, { error: "Internal server error" });
    }
}

/**
 * Handle GET requests (for testing)
 */
function doGet(e) {
    return createResponse(200, {
        message: "Google Apps Script endpoint is working",
        timestamp: new Date().toISOString(),
    });
}

/**
 * Validate form data
 */
function validateFormData(data) {
    const requiredFields = ["name", "email"];

    for (const field of requiredFields) {
        if (!data[field] || data[field].trim() === "") {
            return false;
        }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        return false;
    }

    return true;
}

/**
 * Validate reCAPTCHA token
 */
function validateRecaptcha(token) {
    try {
        if (
            !CONFIG.RECAPTCHA_SECRET_KEY ||
            CONFIG.RECAPTCHA_SECRET_KEY === "YOUR_RECAPTCHA_SECRET_KEY_HERE"
        ) {
            console.log(
                "reCAPTCHA secret key not configured, skipping validation"
            );
            return true; // Skip validation if not configured
        }

        const url = "https://www.google.com/recaptcha/api/siteverify";
        const payload = {
            secret: CONFIG.RECAPTCHA_SECRET_KEY,
            response: token,
        };

        const options = {
            method: "POST",
            payload: Object.keys(payload)
                .map((key) => key + "=" + encodeURIComponent(payload[key]))
                .join("&"),
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        };

        const response = UrlFetchApp.fetch(url, options);
        const result = JSON.parse(response.getContentText());

        console.log("reCAPTCHA validation result:", result);

        if (result.success && result.score >= CONFIG.RECAPTCHA_MIN_SCORE) {
            return true;
        } else {
            console.log("reCAPTCHA validation failed:", result);
            return false;
        }
    } catch (error) {
        console.error("Error validating reCAPTCHA:", error);
        return false;
    }
}

/**
 * Write form data to Google Sheet
 */
function writeToSheet(data) {
    try {
        const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
        let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

        // Create sheet if it doesn't exist
        if (!sheet) {
            sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
            // Add headers
            const headers = [
                "Timestamp",
                "Name",
                "Email",
                "Phone",
                "Company",
                "Message",
                "Source",
            ];
            sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
            sheet.getRange(1, 1, 1, headers.length).setFontWeight("bold");
        }

        // Prepare row data
        const timestamp = new Date();
        const rowData = [
            timestamp,
            data.name || "",
            data.email || "",
            data.phone || "",
            data.company || "",
            data.message || "",
            data.source || "Website",
        ];

        // Add the new row
        sheet.appendRow(rowData);

        // Auto-resize columns
        sheet.autoResizeColumns(1, rowData.length);

        return { success: true, id: timestamp.getTime() };
    } catch (error) {
        console.error("Error writing to sheet:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Create HTTP response
 */
function createResponse(statusCode, data) {
    return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
        ContentService.MimeType.JSON
    );
}

/**
 * Test function to verify the setup
 */
function testSetup() {
    const testData = {
        name: "Test User",
        email: "test@example.com",
        phone: "123-456-7890",
        company: "Test Company",
        message: "This is a test message",
        source: "Test",
        recaptchaToken: "test-token", // This will be skipped in validation
    };

    const result = writeToSheet(testData);
    console.log("Test result:", result);
    return result;
}

/**
 * Test reCAPTCHA validation function
 */
function testRecaptchaValidation() {
    const testToken = "test-token";
    const result = validateRecaptcha(testToken);
    console.log("reCAPTCHA test result:", result);
    return result;
}
