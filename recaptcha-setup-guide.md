# reCAPTCHA Setup Guide

This guide will walk you through setting up reCAPTCHA v3 protection for your lead capture form.

## What is reCAPTCHA v3?

reCAPTCHA v3 is Google's latest version that runs in the background and provides a risk score (0.0 to 1.0) for each request without user interaction. It's invisible to users and provides better user experience while maintaining security.

## Step 1: Create reCAPTCHA Keys

1. **Go to Google reCAPTCHA Admin Console**

    - Visit [https://www.google.com/recaptcha/admin](https://www.google.com/recaptcha/admin)
    - Sign in with your Google account

2. **Create a New Site**

    - Click the "+" button to create a new site
    - Fill in the following information:
        - **Label**: "Invaritech Lead Capture" (or your preferred name)
        - **reCAPTCHA type**: Select "reCAPTCHA v3"
        - **Domains**: Add your domain(s):
            - `localhost` (for development)
            - `yourdomain.com` (your production domain)
            - `www.yourdomain.com` (if you use www)
        - **Accept the Terms of Service**
        - Click "Submit"

3. **Get Your Keys**
    - After creating the site, you'll see two keys:
        - **Site Key** (public): This goes in your frontend code
        - **Secret Key** (private): This goes in your Google Apps Script

## Step 2: Configure Frontend (Next.js)

1. **Add Environment Variables**

    - Copy `env.example` to `.env.local`
    - Add your reCAPTCHA site key:
        ```env
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key-here
        ```

2. **The Form is Already Configured**
    - The lead capture form automatically includes reCAPTCHA protection
    - No additional frontend configuration needed

## Step 3: Configure Backend (Google Apps Script)

1. **Update Google Apps Script Configuration**

    - Open your Google Apps Script project
    - Update the `CONFIG` object with your secret key:
        ```javascript
        const CONFIG = {
            SPREADSHEET_ID: "your-spreadsheet-id",
            SHEET_NAME: "Leads",
            WEBHOOK_SECRET: "your-webhook-secret",
            RECAPTCHA_SECRET_KEY: "your-secret-key-here",
            RECAPTCHA_MIN_SCORE: 0.5, // Adjust as needed
        };
        ```

2. **Deploy Updated Script**
    - Save the script
    - Redeploy as a web app if needed

## Step 4: Test the Setup

1. **Test reCAPTCHA Validation**

    - In your Google Apps Script project, run the `testRecaptchaValidation()` function
    - Check the logs to ensure the function works

2. **Test Form Submission**
    - Submit a test form on your website
    - Check your Google Sheet to verify the data was captured
    - Check Google Apps Script logs for reCAPTCHA validation results

## reCAPTCHA Score Configuration

The `RECAPTCHA_MIN_SCORE` setting determines how strict the validation is:

-   **0.9 - 1.0**: Very likely human (very strict)
-   **0.7 - 0.9**: Likely human (strict)
-   **0.5 - 0.7**: Neutral (recommended)
-   **0.3 - 0.5**: Likely bot (lenient)
-   **0.0 - 0.3**: Very likely bot (very lenient)

**Recommended**: Start with 0.5 and adjust based on your needs.

## Troubleshooting

### Common Issues

1. **"reCAPTCHA verification failed"**

    - Check that your site key is correct in `.env.local`
    - Verify your domain is added to the reCAPTCHA site configuration
    - Ensure the reCAPTCHA script is loading (check browser console)

2. **"reCAPTCHA secret key not configured"**

    - Make sure you've added the secret key to your Google Apps Script CONFIG
    - Verify the key is correct (no extra spaces or characters)

3. **Low reCAPTCHA Scores**

    - This is normal for some users/browsers
    - Consider lowering the `RECAPTCHA_MIN_SCORE` if legitimate users are being blocked
    - Monitor the scores in your Google Apps Script logs

4. **reCAPTCHA Not Loading**
    - Check browser console for JavaScript errors
    - Verify your site key is correct
    - Ensure your domain is properly configured in reCAPTCHA admin

### Testing Without reCAPTCHA

If you need to test without reCAPTCHA:

1. Remove or comment out the `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` from your environment variables
2. The form will work without reCAPTCHA validation

## Security Best Practices

1. **Keep Keys Secure**

    - Never commit secret keys to version control
    - Use environment variables for all sensitive data
    - Regularly rotate your keys

2. **Monitor Scores**

    - Check Google Apps Script logs regularly
    - Adjust the minimum score based on your traffic patterns
    - Consider implementing additional validation for low scores

3. **Domain Configuration**
    - Only add domains you actually use
    - Remove test domains from production keys
    - Use separate keys for development and production

## Advanced Configuration

### Custom Actions

You can customize the reCAPTCHA action for different form types:

```javascript
// In your form component
const { executeRecaptcha } = useRecaptcha({
    siteKey: recaptchaSiteKey || "",
    action: "contact_form_submit", // Customize this
});
```

### Multiple Forms

If you have multiple forms, you can use different actions:

```javascript
// Contact form
action: "contact_form_submit";

// Newsletter signup
action: "newsletter_signup";

// Support request
action: "support_request";
```

This allows you to track and analyze different types of interactions in the reCAPTCHA admin console.

## Support

If you encounter issues:

1. Check the browser console for JavaScript errors
2. Review Google Apps Script execution logs
3. Verify your reCAPTCHA configuration in the admin console
4. Test with a simple form submission to isolate the issue

The reCAPTCHA integration is designed to be robust and handle edge cases gracefully, but proper configuration is essential for optimal performance.
