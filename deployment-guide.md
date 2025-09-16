# Deployment Guide

This guide will walk you through setting up GitHub CI/CD for deploying your Next.js static site to Hostinger with Google Apps Script integration.

## Prerequisites

-   GitHub repository with your code
-   Hostinger hosting account
-   Google account for Apps Script

## Step 1: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add these secrets:

### Required Secrets for Hostinger Deployment

```
HOSTINGER_FTP_HOST=ftp.yourdomain.com
HOSTINGER_FTP_USERNAME=your-ftp-username
HOSTINGER_FTP_PASSWORD=your-ftp-password
HOSTINGER_DOMAIN=yourdomain.com
```

### Optional Secrets for Enhanced Security

```
GOOGLE_SCRIPT_WEBHOOK_SECRET=your-random-secret-key
```

## Step 2: Set Up Google Apps Script

1. **Create Google Apps Script Project**

    - Go to [Google Apps Script](https://script.google.com/)
    - Create a new project
    - Copy the code from `google-apps-script/Code.gs`

2. **Create Google Sheet**

    - Create a new Google Sheet
    - Copy the Spreadsheet ID from the URL
    - Update the `SPREADSHEET_ID` in your Apps Script

3. **Deploy as Web App**

    - In Apps Script, click "Deploy" → "New deployment"
    - Choose "Web app" type
    - Set execute as "Me" and access to "Anyone"
    - Copy the web app URL

4. **Configure Environment Variables**
    - Copy `env.example` to `.env.local`
    - Update `NEXT_PUBLIC_GOOGLE_SCRIPT_URL` with your web app URL
    - Add your reCAPTCHA site key: `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`

## Step 3: Test the Setup

1. **Test Google Apps Script**

    ```bash
    curl -X GET "YOUR_GOOGLE_SCRIPT_URL"
    ```

2. **Test Local Build**

    ```bash
    npm run build:static
    ```

3. **Test Form Submission**
    - Add the ContactSection component to your page
    - Test form submission locally

## Step 4: Deploy to Hostinger

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. GitHub Actions will automatically:
    - Build the static site
    - Deploy to Hostinger via FTP
    - Handle all the deployment process

### Manual Deployment

If you need to deploy manually:

```bash
# Build the static site
npm run build:static

# Upload the contents of the 'dist' folder to your Hostinger public_html directory
# You can use FTP client, cPanel File Manager, or any other method
```

## Step 5: Verify Deployment

1. **Check Website**

    - Visit your domain to ensure the site loads correctly
    - Test all pages and functionality

2. **Test Form Submission**

    - Submit a test form on your website
    - Check your Google Sheet to verify the data was captured

3. **Check Google Apps Script Logs**
    - Go to your Apps Script project
    - Check the execution logs for any errors

## Troubleshooting

### Common Issues

1. **Build Failures**

    - Check that all dependencies are installed
    - Verify Next.js configuration is correct
    - Check for TypeScript errors

2. **FTP Deployment Issues**

    - Verify FTP credentials in GitHub secrets
    - Check Hostinger FTP settings
    - Ensure proper file permissions

3. **Form Submission Issues**

    - Verify Google Apps Script URL is correct
    - Check Apps Script execution logs
    - Ensure Google Sheet permissions are set correctly
    - Verify reCAPTCHA configuration and keys

4. **Static Export Issues**
    - Check for dynamic imports or server-side code
    - Verify all images are properly optimized
    - Check for any API routes that need to be removed

### Getting Help

-   Check the GitHub Actions logs for detailed error messages
-   Review the Google Apps Script execution logs
-   Verify all environment variables and secrets are set correctly

## Security Considerations

1. **Environment Variables**

    - Never commit `.env.local` to version control
    - Use GitHub secrets for sensitive data
    - Regularly rotate secrets and passwords

2. **Google Apps Script**

    - Consider implementing webhook secrets for additional security
    - Monitor execution logs for suspicious activity
    - Set appropriate permissions on your Google Sheet

3. **Hostinger**
    - Use strong FTP passwords
    - Regularly update your hosting account
    - Monitor for any unauthorized access

## Maintenance

1. **Regular Updates**

    - Keep dependencies updated
    - Monitor for security vulnerabilities
    - Update Google Apps Script as needed

2. **Monitoring**

    - Check deployment status regularly
    - Monitor form submissions
    - Review error logs

3. **Backups**
    - Regular backups of your Google Sheet data
    - Keep backups of your code repository
    - Document any custom configurations
