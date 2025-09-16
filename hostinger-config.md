# Hostinger Deployment Configuration

## Required GitHub Secrets

Add these secrets to your GitHub repository settings:

### FTP Credentials

-   `HOSTINGER_FTP_HOST`: Your Hostinger FTP host (e.g., ftp.yourdomain.com)
-   `HOSTINGER_FTP_USERNAME`: Your Hostinger FTP username
-   `HOSTINGER_FTP_PASSWORD`: Your Hostinger FTP password

### Domain Configuration

-   `HOSTINGER_DOMAIN`: Your domain name (e.g., yourdomain.com)

## Hostinger Setup Steps

1. **Enable FTP Access**

    - Log into your Hostinger control panel
    - Go to "Advanced" → "FTP Accounts"
    - Create a new FTP account or use your main account credentials

2. **Configure Domain**

    - Ensure your domain is properly configured in Hostinger
    - Point your domain to the correct hosting package

3. **File Permissions**
    - Ensure the `public_html` directory has proper write permissions
    - The deployment will upload files to `/public_html/`

## Deployment Process

The GitHub Actions workflow will:

1. Build the Next.js static site
2. Upload the built files to Hostinger via FTP
3. Exclude unnecessary files (node_modules, .git, etc.)

## Manual Deployment

If you need to deploy manually:

```bash
npm run build:static
# Then upload the contents of the 'dist' folder to your Hostinger public_html directory
```

## Troubleshooting

-   **FTP Connection Issues**: Verify your FTP credentials and ensure FTP is enabled
-   **File Upload Errors**: Check file permissions on the Hostinger server
-   **Build Failures**: Ensure all dependencies are properly installed and the build process completes successfully
