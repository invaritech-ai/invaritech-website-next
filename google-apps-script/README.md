# Google Apps Script Setup for Lead Capture

This directory contains the Google Apps Script code that will handle form submissions from your website and write them to a Google Sheet.

## Setup Instructions

### 1. Create a Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the contents of `Code.gs`
4. Save the project with a descriptive name (e.g., "Invaritech Lead Capture")

### 2. Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Invaritech Leads" (or your preferred name)
4. Copy the Spreadsheet ID from the URL (the long string between `/d/` and `/edit`)
5. Update the `SPREADSHEET_ID` in the `Code.gs` file

### 3. Configure the Script

1. In your Google Apps Script project, update the `CONFIG` object:

    ```javascript
    const CONFIG = {
        SPREADSHEET_ID: "your-actual-spreadsheet-id-here",
        SHEET_NAME: "Leads",
        WEBHOOK_SECRET: "your-secret-key-here", // Optional
        RECAPTCHA_SECRET_KEY: "your-recaptcha-secret-key-here", // reCAPTCHA v3 secret key
        RECAPTCHA_MIN_SCORE: 0.5, // Minimum score for reCAPTCHA v3 (0.0 to 1.0)
    };
    ```

2. Save the script

### 4. Deploy as Web App

1. In your Google Apps Script project, click "Deploy" → "New deployment"
2. Choose "Web app" as the type
3. Set the following options:
    - **Execute as**: Me
    - **Who has access**: Anyone
4. Click "Deploy"
5. Copy the web app URL - this will be your form submission endpoint

### 5. Test the Setup

1. In your Google Apps Script project, run the `testSetup()` function
2. Check your Google Sheet to verify the test data was added
3. Test the web app URL with a GET request to ensure it's working

## Form Data Structure

The script expects the following JSON structure:

```json
{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "123-456-7890",
    "company": "Example Corp",
    "message": "I'm interested in your services",
    "source": "Website",
    "recaptchaToken": "recaptcha-token-from-frontend"
}
```

### Required Fields

-   `name`: Full name of the lead
-   `email`: Valid email address

### Optional Fields

-   `phone`: Phone number
-   `company`: Company name
-   `message`: Additional message
-   `source`: Source of the lead (defaults to "Website")
-   `recaptchaToken`: reCAPTCHA v3 token for spam protection

## Security Considerations

1. **reCAPTCHA Protection**: The script validates reCAPTCHA v3 tokens to prevent spam
2. **Webhook Secret**: Consider implementing a webhook secret for additional security
3. **Rate Limiting**: Google Apps Script has execution limits
4. **Data Validation**: The script validates email format and required fields
5. **Error Handling**: Comprehensive error handling is included

## Troubleshooting

### Common Issues

1. **Permission Errors**: Ensure the script has permission to access your Google Sheet
2. **Invalid Spreadsheet ID**: Double-check the Spreadsheet ID in the CONFIG
3. **Sheet Not Found**: The script will create a "Leads" sheet if it doesn't exist
4. **Execution Timeout**: For high-volume sites, consider implementing batch processing

### Testing

Use the `testSetup()` function to verify everything is working correctly. You can also test the web app URL directly:

```bash
curl -X GET "YOUR_WEB_APP_URL"
```

## Integration with Website

The web app URL will be used in your website's form submission. Add it to your environment variables:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=your-web-app-url-here
```
