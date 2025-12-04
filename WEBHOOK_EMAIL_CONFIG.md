# GitHub Webhook and Jenkins Email Configuration Guide

This guide provides step-by-step instructions for setting up GitHub webhooks to trigger Jenkins builds and configuring email notifications in Jenkins.

## GitHub Webhook Configuration

### Step 1: Access GitHub Repository Settings

1. Open your GitHub repository in a web browser
2. Click on the **"Settings"** tab
3. In the left sidebar, click on **"Webhooks"**

### Step 2: Add New Webhook

1. Click the **"Add webhook"** button
2. Configure the webhook with the following settings:

#### Payload URL
```
http://your-ec2-ip:8080/github-webhook/
```
Replace `your-ec2-ip` with your actual EC2 instance public IP address.

#### Content type
- Select: `application/json`

#### Secret
- **Optional**: You can add a secret for additional security
- If used, you'll need to configure the same secret in Jenkins

#### Which events would you like to trigger this webhook?
- Select: **"Just the push event"**
- This will trigger builds on code pushes to any branch

#### Active
- Ensure the checkbox is **checked**

3. Click **"Add webhook"**

### Step 3: Verify Webhook Setup

1. After adding the webhook, you'll see it in the webhooks list
2. Click on the webhook to view its details
3. Look for the **"Recent Deliveries"** section
4. You should see delivery attempts with status codes

### Step 4: Test Webhook Delivery

1. Make a small change to your repository (e.g., update README.md)
2. Commit and push the changes to the main branch
3. Check Jenkins - a new build should be triggered automatically
4. Verify the webhook delivery status in GitHub

## Jenkins Email Configuration

### Step 1: Install Required Plugins

1. Open Jenkins in your web browser (`http://your-ec2-ip:8080`)
2. Click **"Manage Jenkins"** → **"Manage Plugins"**
3. Go to the **"Available"** tab
4. Search for and install:
   - **"Email Extension Plugin"**
   - **"Mailer Plugin"** (usually pre-installed)
5. Click **"Install without restart"**
6. Wait for installation to complete

### Step 2: Configure System Settings

1. Go to **"Manage Jenkins"** → **"Configure System"**
2. Scroll down to the **"E-mail Notification"** section
3. Configure basic email settings:
   - **SMTP server:** `smtp.gmail.com`
   - **Default user e-mail suffix:** `@gmail.com` (if using Gmail)
   - **Use SMTP Authentication:** Check this box
   - **User Name:** Your Gmail address
   - **Password:** Your Gmail App Password (see below)
   - **Use SSL:** Check this box
   - **SMTP Port:** `465`
   - **Reply-To Address:** Your Gmail address
   - **Charset:** `UTF-8`

### Step 3: Configure Extended Email Settings

1. Scroll down to **"Extended E-mail Notification"** section
2. Configure:
   - **SMTP server:** `smtp.gmail.com`
   - **SMTP Port:** `465`
   - **Use SSL:** Yes
   - **Authentication:** Enter your Gmail credentials
   - **Default Recipients:** Your email address for notifications
   - **Default Subject:** `Jenkins Build: $PROJECT_NAME - $BUILD_STATUS`
   - **Default Content:** Customize as needed

### Step 4: Gmail App Password Setup

Since Gmail requires 2-factor authentication for SMTP:

1. Go to your Google Account settings
2. Navigate to **"Security"**
3. Under **"Signing in to Google"**, click **"App passwords"**
4. You might need to sign in again
5. Select **"Mail"** and **"Other (custom name)"**
6. Enter **"Jenkins"** as the custom name
7. Click **"Generate"**
8. Copy the 16-character password
9. Use this password in Jenkins SMTP configuration (not your regular Gmail password)

### Step 5: Test Email Configuration

1. In the Jenkins system configuration page
2. Scroll to **"Extended E-mail Notification"**
3. Click **"Advanced"** button
4. Scroll down and click **"Test configuration"**
5. Enter your email address in the **"Test e-mail recipient"** field
6. Click **"Test configuration by sending test e-mail"**
7. Check your email for the test message

### Step 6: Configure Pipeline Email Notifications

For declarative pipelines, add email notifications in the `post` block:

```groovy
post {
    success {
        emailext (
            subject: 'Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}',
            body: '''The build was successful.
            Check console output at ${env.BUILD_URL}''',
            to: 'your-email@example.com'
        )
    }
    failure {
        emailext (
            subject: 'Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}',
            body: '''The build failed.
            Check console output at ${env.BUILD_URL}''',
            to: 'your-email@example.com'
        )
    }
}
```

## Troubleshooting

### Webhook Issues

**Webhook not triggering builds:**
- Verify the Jenkins URL in webhook settings
- Check that the GitHub plugin is installed in Jenkins
- Ensure the Jenkins job has "GitHub hook trigger" enabled
- Check Jenkins security settings (may need to allow anonymous read access)

**Recent deliveries show failures:**
- Check Jenkins server logs: `sudo journalctl -u jenkins -f`
- Verify the EC2 security group allows inbound traffic on port 8080
- Ensure Jenkins is running and accessible

### Email Issues

**Emails not sending:**
- Verify SMTP credentials are correct
- Check that you're using the Gmail App Password, not regular password
- Ensure 2FA is enabled on Gmail account
- Check Jenkins logs for SMTP errors

**Test email fails:**
- Double-check SMTP server settings
- Verify firewall settings allow outbound SMTP traffic
- Check if Gmail is blocking the login attempt

### Useful Commands

```bash
# Check Jenkins service status
sudo systemctl status jenkins

# View Jenkins logs
sudo journalctl -u jenkins -f

# Test SMTP connection manually
telnet smtp.gmail.com 465

# Check network connectivity
curl -v http://your-ec2-ip:8080
```

### Alternative Email Providers

If you prefer not to use Gmail, you can use:

- **AWS SES:** More reliable for production, requires AWS account
- **SendGrid:** Good alternative with API keys
- **Mailgun:** Another SMTP service option

For AWS SES setup, use:
- **SMTP server:** `email-smtp.us-east-1.amazonaws.com` (change region as needed)
- **Port:** `587` or `465`
- **Authentication:** Use SES SMTP credentials

## Security Best Practices

1. **Use HTTPS:** Configure Jenkins with SSL certificate
2. **Webhook Secrets:** Add secret tokens to webhooks for verification
3. **IP Whitelisting:** Restrict webhook access to GitHub IP ranges
4. **Least Privilege:** Use dedicated email accounts for Jenkins
5. **Regular Updates:** Keep Jenkins and plugins updated

## Next Steps

Once configured:
1. Test the complete flow: GitHub push → Jenkins build → Email notification
2. Monitor webhook delivery status regularly
3. Set up additional notifications for different build statuses
4. Consider setting up Slack or other notification channels for team collaboration