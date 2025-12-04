# Jenkins CI/CD Pipeline Setup Guide

## Part II: Containerized Automation Pipeline with Jenkins

This guide provides step-by-step instructions for setting up Jenkins on AWS EC2 and creating an automated CI/CD pipeline.

---

## Table of Contents
1. [Install Jenkins on EC2](#step-1-install-jenkins-on-ec2)
2. [Configure Jenkins](#step-2-configure-jenkins)
3. [Install Required Plugins](#step-3-install-required-plugins)
4. [Setup GitHub Integration](#step-4-setup-github-integration)
5. [Create Jenkins Credentials](#step-5-create-jenkins-credentials)
6. [Create Jenkins Pipeline](#step-6-create-jenkins-pipeline)
7. [Configure GitHub Webhook](#step-7-configure-github-webhook)
8. [Test the Pipeline](#step-8-test-the-pipeline)

---

## Step 1: Install Jenkins on EC2

### 1.1 Update EC2 Security Group

Add inbound rules for:
- Port **8080** (Jenkins Web UI) - Source: 0.0.0.0/0
- Port **3001** (Frontend Jenkins) - Source: 0.0.0.0/0
- Port **5001** (Backend Jenkins) - Source: 0.0.0.0/0
- Port **27018** (MongoDB Jenkins) - Source: Your Security Group

### 1.2 SSH into your EC2 Instance

```bash
ssh -i your-key.pem ubuntu@13.51.166.215
```

### 1.3 Install Java (Jenkins Requirement)

```bash
# Update package list
sudo apt update

# Install OpenJDK 17
sudo apt install -y fontconfig openjdk-17-jre

# Verify Java installation
java -version
```

### 1.4 Install Jenkins

```bash
# Add Jenkins repository key
sudo wget -O /usr/share/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key

# Add Jenkins repository
echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update package list
sudo apt update

# Install Jenkins
sudo apt install -y jenkins

# Start Jenkins service
sudo systemctl start jenkins

# Enable Jenkins to start on boot
sudo systemctl enable jenkins

# Check Jenkins status
sudo systemctl status jenkins
```

### 1.5 Get Initial Admin Password

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

**Copy this password** - you'll need it to unlock Jenkins.

---

## Step 2: Configure Jenkins

### 2.1 Access Jenkins Web UI

Open your browser and navigate to:
```
http://13.51.166.215:8080
```

### 2.2 Unlock Jenkins

- Paste the initial admin password from Step 1.5
- Click **Continue**

### 2.3 Install Suggested Plugins

- Select **Install suggested plugins**
- Wait for installation to complete (~5 minutes)

### 2.4 Create First Admin User

Fill in the form:
- Username: `admin`
- Password: `your-secure-password`
- Full name: `Your Name`
- Email: `your-email@example.com`

Click **Save and Continue**

### 2.5 Instance Configuration

- Keep the default Jenkins URL: `http://13.51.166.215:8080/`
- Click **Save and Finish**
- Click **Start using Jenkins**

---

## Step 3: Install Required Plugins

### 3.1 Navigate to Plugin Manager

- Click **Manage Jenkins** → **Plugins**
- Click **Available plugins**

### 3.2 Install Required Plugins

Search and install the following plugins:
1. **Git** (should already be installed)
2. **Pipeline** (should already be installed)
3. **Docker Pipeline**
4. **GitHub Integration**
5. **GitHub Branch Source**

**Steps:**
- Search for each plugin
- Check the checkbox
- Click **Install**
- Check "Restart Jenkins when installation is complete"

Wait for Jenkins to restart (~2 minutes)

---

## Step 4: Setup GitHub Integration

### 4.1 Add Jenkins User to Docker Group

On your EC2 instance:

```bash
# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins
sudo systemctl restart jenkins

# Verify
sudo -u jenkins docker ps
```

### 4.2 Generate GitHub Personal Access Token

1. Go to GitHub.com
2. Click your profile → **Settings**
3. Scroll down → **Developer settings**
4. **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token (classic)**
6. Set:
   - Note: `Jenkins CI/CD`
   - Expiration: 90 days
   - Scopes: Check **repo** (all), **admin:repo_hook**
7. Click **Generate token**
8. **Copy the token** - you won't see it again!

### 4.3 Add Collaborator to GitHub Repository

1. Go to your repository on GitHub
2. **Settings** → **Collaborators**
3. Click **Add people**
4. Add: `qasimalik@gmail.com`

---

## Step 5: Create Jenkins Credentials

### 5.1 Add GitHub Token

1. Jenkins Dashboard → **Manage Jenkins** → **Credentials**
2. Click **(global)** → **Add Credentials**
3. Fill in:
   - Kind: **Secret text**
   - Secret: `<paste your GitHub token>`
   - ID: `github-token`
   - Description: `GitHub Personal Access Token`
4. Click **Create**

### 5.2 Add MongoDB Credentials

Repeat for:

**MongoDB Username:**
- Kind: **Secret text**
- Secret: `admin`
- ID: `mongo-username`

**MongoDB Password:**
- Kind: **Secret text**
- Secret: `password123`
- ID: `mongo-password`

**JWT Secret:**
- Kind: **Secret text**
- Secret: `your-super-secret-jwt-key-change-this-in-production`
- ID: `jwt-secret`

---

## Step 6: Create Jenkins Pipeline

### 6.1 Create New Pipeline Job

1. Jenkins Dashboard → **New Item**
2. Enter name: `AI-Health-Journal-Pipeline`
3. Select **Pipeline**
4. Click **OK**

### 6.2 Configure Pipeline

**General:**
- Check **GitHub project**
- Project url: `https://github.com/MoizZaidi7/Reflectly-AI/`

**Build Triggers:**
- Check **GitHub hook trigger for GITScm polling**

**Pipeline:**
- Definition: **Pipeline script from SCM**
- SCM: **Git**
- Repository URL: `https://github.com/MoizZaidi7/Reflectly-AI.git`
- Credentials: Select your GitHub token credential
- Branch: `*/main`
- Script Path: `Jenkinsfile`

Click **Save**

---

## Step 7: Configure GitHub Webhook

### 7.1 Create Webhook on GitHub

1. Go to your GitHub repository
2. **Settings** → **Webhooks** → **Add webhook**
3. Fill in:
   - Payload URL: `http://13.51.166.215:8080/github-webhook/`
   - Content type: `application/json`
   - Which events: **Just the push event**
   - Active: **Checked**
4. Click **Add webhook**

### 7.2 Verify Webhook

- You should see a green checkmark ✓ if successful
- If red X, check your Jenkins URL and EC2 security group

---

## Step 8: Test the Pipeline

### 8.1 Initial Build

1. Go to your pipeline: `AI-Health-Journal-Pipeline`
2. Click **Build Now**
3. Watch the build progress in **Build History**
4. Click on the build number → **Console Output**

### 8.2 Test GitHub Push Trigger

On your local machine:

```bash
cd C:\Users\pc\Documents\GitHub\AI-Health-Journal-Application

# Make a small change
echo "# Jenkins CI/CD Pipeline" >> README.md

# Commit and push
git add .
git commit -m "Test: Trigger Jenkins pipeline"
git push origin main
```

**Check Jenkins** - A new build should start automatically!

### 8.3 Verify Application

After build completes, access:
- **Frontend:** http://13.51.166.215:3001
- **Backend API:** http://13.51.166.215:5001/api/health

---

## Port Comparison: Part I vs Part II

| Service | Part I Port | Part II (Jenkins) Port |
|---------|-------------|------------------------|
| Frontend | 3000 | 3001 |
| Backend | 5000 | 5001 |
| MongoDB | 27017 | 27018 |
| Jenkins | N/A | 8080 |

---

## Key Differences from Part I

### Part I (Production Deployment)
- Used Dockerfile to build images
- Static build artifacts
- Production-optimized

### Part II (Jenkins CI/CD)
- Uses volume mounts for code
- Development mode with hot-reload
- Automated build on Git push
- Different ports and container names

---

## Troubleshooting

### Jenkins Can't Access Docker

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

### Port Already in Use

```bash
# Check what's using the port
sudo netstat -tlnp | grep :8080

# Stop conflicting service
sudo docker-compose -f docker-compose.yml down
```

### Pipeline Fails at Build Stage

```bash
# Check Docker Compose logs
sudo docker-compose -f docker-compose.jenkins.yml logs
```

### GitHub Webhook Not Triggering

- Verify webhook URL ends with `/github-webhook/`
- Check EC2 security group allows port 8080
- Verify Jenkins is accessible from internet

---

## Cleanup Commands

```bash
# Stop Jenkins containers
sudo docker-compose -f docker-compose.jenkins.yml down

# Stop Part I containers (if running)
sudo docker-compose down

# Remove all stopped containers
sudo docker container prune -f

# Remove unused images
sudo docker image prune -f
```

---

## Assignment Submission Checklist

- [ ] Part I application running on ports 3000, 5000, 27017
- [ ] Part II application initially DOWN
- [ ] Jenkins installed and accessible on port 8080
- [ ] GitHub webhook configured
- [ ] Jenkins pipeline created with Jenkinsfile
- [ ] Collaborator (qasimalik@gmail.com) added to repository
- [ ] Google form submitted with URLs
- [ ] Report with screenshots prepared
- [ ] docker-compose.yml (Part I) included in report
- [ ] docker-compose.jenkins.yml (Part II) included in report
- [ ] Jenkinsfile included in report

---

## Expected Workflow

1. **Initial State:** Part II environment is DOWN
2. **Trigger:** Instructor pushes to GitHub or clicks "Build Now"
3. **Jenkins Pipeline:**
   - Checks out code from GitHub
   - Sets up environment variables
   - Stops existing containers
   - Builds application using docker-compose.jenkins.yml
   - Performs health checks
   - Displays service info
4. **Result:** Application accessible at ports 3001, 5001, 27018

---

## Contact & Support

If you encounter issues:
1. Check Jenkins console output
2. Review Docker Compose logs
3. Verify EC2 security group settings
4. Ensure all credentials are properly configured

**Good luck with your assignment!** 🚀
