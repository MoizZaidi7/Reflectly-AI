# AI Health Journal - DevOps Project

## 1. Project Overview

This is a full-stack MERN (MongoDB, Express.js, React, Node.js) application for AI-powered mental health journaling. The application includes emotion detection, analytics, and a complete CI/CD pipeline with Selenium automated testing.

**Key Features:**
- User registration and authentication
- AI-powered emotion detection in journal entries
- Interactive dashboard with analytics and charts
- Responsive React frontend with Tailwind CSS
- RESTful API backend with JWT authentication
- MongoDB database with health checks
- Docker containerization
- Jenkins CI/CD pipeline
- Selenium automated testing suite

## 2. Project Structure

```
AI-Health-Journal-Application/
├── Backend/                 # Node.js Express API server
│   ├── controllers/         # Route handlers
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API endpoints
│   ├── middleware/         # Authentication, validation
│   └── utils/              # Helper functions
├── Frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service functions
│   │   └── context/       # React context providers
│   └── public/            # Static assets
├── tests/                  # Selenium test suite
│   ├── conftest.py        # Pytest fixtures
│   ├── test_*.py          # Individual test files
│   ├── Dockerfile         # Test container
│   └── requirements.txt   # Python dependencies
├── docker-compose.yml      # Production deployment
├── docker-compose.jenkins.yml  # CI/CD deployment
├── Jenkinsfile            # Main CI/CD pipeline
├── Jenkinsfile.tests      # Test-only pipeline
├── setup-docker.sh        # Docker installation script
├── install_jenkins.sh     # Jenkins installation script
└── README.md
```

## 3. How to Install & Run Backend

### Prerequisites
- Node.js 20+
- MongoDB
- Docker (optional)

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MoizZaidi7/Reflectly-AI.git
   cd AI-Health-Journal-Application
   ```

2. **Backend Setup:**
   ```bash
   cd Backend
   npm install
   ```

3. **Environment Variables:**
   Create `.env` file in Backend directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/AiMentalHealth
   JWT_SECRET=your-super-secret-jwt-key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB:**
   ```bash
   # Using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:7.0
   ```

5. **Run Backend:**
   ```bash
   npm start
   ```
   Backend will be available at `http://localhost:5000`

### Docker Setup

```bash
# Build and run with Docker Compose
docker-compose up --build
```

## 4. How to Run Selenium Tests Locally

### Prerequisites
- Python 3.10+
- Google Chrome browser
- Running application (backend + frontend)

### Setup

1. **Install Python dependencies:**
   ```bash
   cd tests
   pip install -r requirements.txt
   ```

2. **Ensure application is running:**
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:5000`

3. **Run tests:**
   ```bash
   pytest -v
   ```

### Test Coverage

The test suite includes:
- Homepage loading
- User registration
- Login success/failure
- Dashboard access
- Form validation
- UI element assertions
- Database record verification
- Page redirects

## 5. How to Run Selenium Tests in Docker

1. **Build the test container:**
   ```bash
   cd tests
   docker build -t selenium-tests .
   ```

2. **Run tests in container:**
   ```bash
   # Ensure app is running on host
   docker run --network host selenium-tests
   ```

3. **Or run with Docker Compose:**
   ```bash
   # Start the application first
   docker-compose -f docker-compose.jenkins.yml up -d

   # Then run tests
   docker run --network host selenium-tests
   ```

## 6. How to Install Jenkins on Ubuntu EC2 (Step-by-Step)

### Prerequisites
- Ubuntu 22.04 EC2 instance
- SSH access to the instance

### Installation Steps

1. **Update system packages:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Java 17:**
   ```bash
   sudo apt install openjdk-17-jdk -y
   java -version
   ```

3. **Add Jenkins repository:**
   ```bash
   curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
   echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null
   ```

4. **Install Jenkins:**
   ```bash
   sudo apt update
   sudo apt install jenkins -y
   ```

5. **Start Jenkins service:**
   ```bash
   sudo systemctl start jenkins
   sudo systemctl enable jenkins
   ```

6. **Check status:**
   ```bash
   sudo systemctl status jenkins
   ```

7. **Get initial admin password:**
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

8. **Access Jenkins:**
   Open browser to `http://your-ec2-ip:8080`

### Alternative: Use the provided script

```bash
chmod +x install_jenkins.sh
sudo ./install_jenkins.sh
```

## 7. How to Install Docker on EC2

### Using the provided script (Recommended)

```bash
chmod +x setup-docker.sh
sudo ./setup-docker.sh
```

### Manual Installation

1. **Remove old versions:**
   ```bash
   sudo apt remove docker docker-engine docker.io containerd runc
   ```

2. **Install Docker Engine:**
   ```bash
   sudo apt update
   sudo apt install ca-certificates curl gnupg lsb-release
   sudo mkdir -p /etc/apt/keyrings
   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/share/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
   sudo apt update
   sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
   ```

3. **Start Docker service:**
   ```bash
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

4. **Add users to docker group:**
   ```bash
   sudo usermod -aG docker ubuntu
   sudo usermod -aG docker jenkins
   ```

5. **Verify installation:**
   ```bash
   docker --version
   docker run hello-world
   ```

## 8. How to Add Jenkins User to Docker Group

After installing Docker and Jenkins:

```bash
# Add Jenkins user to docker group
sudo usermod -aG docker jenkins

# Restart Jenkins service
sudo systemctl restart jenkins

# Verify (run as jenkins user)
sudo -u jenkins docker ps
```

## 9. How to Configure GitHub Webhook → Jenkins

### GitHub Repository Settings

1. **Go to your GitHub repository**
2. **Navigate to Settings → Webhooks**
3. **Click "Add webhook"**
4. **Configure webhook:**
   - **Payload URL:** `http://your-ec2-ip:8080/github-webhook/`
   - **Content type:** `application/json`
   - **Secret:** (optional, for security)
   - **Events:** Select "Just the push event"
5. **Click "Add webhook"**

### Jenkins Configuration

1. **Install GitHub plugin in Jenkins**
2. **Create new pipeline job**
3. **Configure pipeline:**
   - **Definition:** Pipeline script from SCM
   - **SCM:** Git
   - **Repository URL:** Your GitHub repo URL
   - **Branch:** `*/main`
4. **Under "Build Triggers", check "GitHub hook trigger for GITScm polling"**
5. **Save the job**

### Test Webhook

1. **Make a commit and push to main branch**
2. **Check Jenkins - build should trigger automatically**
3. **Verify webhook delivery in GitHub webhook settings**

## 10. How to Configure Email in Jenkins

### Install Email Extension Plugin

1. **Jenkins Dashboard → Manage Jenkins → Manage Plugins**
2. **Install "Email Extension Plugin"**
3. **Restart Jenkins**

### Configure SMTP

1. **Manage Jenkins → Configure System**
2. **Scroll to "Extended E-mail Notification"**
3. **Configure:**
   - **SMTP server:** smtp.gmail.com (for Gmail)
   - **SMTP Port:** 465
   - **Use SSL:** Yes
   - **Authentication:** Your email credentials
   - **Default recipients:** your-email@example.com

### Gmail Specific Setup

1. **Enable 2-factor authentication on Gmail**
2. **Generate App Password:**
   - Google Account → Security → App passwords
   - Generate password for "Jenkins"
3. **Use App Password in Jenkins SMTP auth**

### Test Email

1. **Save configuration**
2. **Use "Test configuration" button**
3. **Send test email**

## 11. How CI/CD Pipeline Works

### Main Pipeline (Jenkinsfile)

1. **Checkout:** Pulls latest code from GitHub
2. **Environment Setup:** Creates `.env` file with credentials
3. **Stop Existing Containers:** Cleans up previous deployment
4. **Build Application:** Builds Docker containers
5. **Health Check:** Verifies services are running
6. **Display Service Info:** Shows deployment URLs
7. **Post Actions:** Sends email notifications

### Test Pipeline (Jenkinsfile.tests)

1. **Checkout:** Gets code from GitHub
2. **Build Docker Image:** Creates test container
3. **Run Selenium Tests:** Executes automated tests
4. **Archive Results:** Saves test reports
5. **Email Notifications:** Success/failure alerts

### Webhook Integration

- GitHub push triggers Jenkins build automatically
- No manual intervention required
- Email notifications on build status

## 12. Troubleshooting

### Common Issues

**Jenkins can't access Docker:**
```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

**Tests fail with connection refused:**
- Ensure application is running on correct ports
- Check Docker network settings
- Verify `localhost` vs `host.docker.internal`

**Webhook not triggering:**
- Check Jenkins URL in webhook settings
- Verify GitHub plugin is installed
- Check Jenkins security settings

**Email not sending:**
- Verify SMTP credentials
- Check Gmail app password
- Test configuration in Jenkins

**MongoDB connection issues:**
```bash
# Check MongoDB logs
docker logs ai-journal-mongodb

# Verify connection string
docker exec -it ai-journal-mongodb mongosh --eval "db.adminCommand('ping')"
```

**Port conflicts:**
- Check if ports 3000, 5000, 8080 are available
- Use `netstat -tlnp | grep :port` to check

### Useful Commands

```bash
# Check Docker containers
docker ps -a

# View Jenkins logs
sudo journalctl -u jenkins -f

# Restart services
sudo systemctl restart jenkins
sudo systemctl restart docker

# Clean up Docker
docker system prune -a
```

### Getting Help

- Check Jenkins console output for detailed error messages
- Review Docker container logs: `docker logs <container_name>`
- Verify environment variables are set correctly
- Test API endpoints manually with curl

---

**Note:** This project is designed for educational purposes to demonstrate DevOps practices including containerization, CI/CD, and automated testing.  
