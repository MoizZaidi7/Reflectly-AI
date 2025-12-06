# EC2 Command Cheat Sheet

## SSH Connection
```bash
ssh -i "your-key.pem" ubuntu@51.20.31.20
```

## Navigate to Project
```bash
cd ~/AI-Health-Journal-Application
```

## Backend Commands
```bash
# Start backend manually
cd ~/AI-Health-Journal-Application/Backend
node Server.js

# Check backend service status
sudo systemctl status backend.service

# Start/Stop/Restart backend service
sudo systemctl start backend.service
sudo systemctl stop backend.service
sudo systemctl restart backend.service

# View backend logs
sudo journalctl -u backend.service -f
```

## Frontend Commands
```bash
# Start frontend manually
cd ~/AI-Health-Journal-Application/Frontend
npm run dev -- --host 0.0.0.0

# Check frontend service status
sudo systemctl status frontend.service

# Start/Stop/Restart frontend service
sudo systemctl start frontend.service
sudo systemctl stop frontend.service
sudo systemctl restart frontend.service

# View frontend logs
sudo journalctl -u frontend.service -f
```

## Check Both Services
```bash
# Check both at once
sudo systemctl status backend.service frontend.service

# Check ports
sudo netstat -tulpn | grep -E '3000|5000'

# Test if running
curl http://localhost:3000
curl http://localhost:5000
```

## Jenkins Commands
```bash
# Start/Stop/Restart Jenkins
sudo systemctl start jenkins
sudo systemctl stop jenkins
sudo systemctl restart jenkins

# Check Jenkins status
sudo systemctl status jenkins

# View Jenkins logs
sudo journalctl -u jenkins -f

# Get initial admin password (first time only)
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Fix Jenkins Docker permission
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

## Docker Test Commands
```bash
# Navigate to tests directory
cd ~/AI-Health-Journal-Application/tests

# Build Docker image
sudo docker build -t selenium-tests .

# Run tests
sudo docker run --rm selenium-tests

# Run tests with network host
sudo docker run --rm --network host selenium-tests

# View Docker images
sudo docker images

# View running containers
sudo docker ps

# Remove old images (cleanup)
sudo docker image prune -f
```

## Git Commands
```bash
# Pull latest changes
cd ~/AI-Health-Journal-Application
git pull origin main

# Check current branch
git branch

# Check status
git status

# View commit log
git log --oneline -5
```

## Memory Management (t3.micro has limited RAM)
```bash
# Check memory usage
free -h

# Check running processes
top
# Press 'q' to quit

# Stop services to free memory
sudo systemctl stop jenkins
sudo systemctl stop frontend.service
sudo systemctl stop backend.service

# Start essential services only
sudo systemctl start backend.service
sudo systemctl start frontend.service
```

## Quick Health Check
```bash
# One command to check everything
sudo systemctl status backend.service frontend.service jenkins && \
sudo netstat -tulpn | grep -E '3000|5000|8080' && \
free -h
```

## Reboot System
```bash
# Reboot EC2 (services auto-start on boot)
sudo reboot
```

## URLs to Access
- **Frontend**: http://51.20.31.20:3000
- **Backend**: http://51.20.31.20:5000
- **Jenkins**: http://51.20.31.20:8080

## Recommended Workflow for Assignment Demo

### Option 1: Run Everything (if enough memory)
```bash
sudo systemctl start backend.service
sudo systemctl start frontend.service
sudo systemctl start jenkins
# Access Jenkins at http://51.20.31.20:8080 and trigger build
```

### Option 2: Run Tests Manually (memory-safe)
```bash
# Stop Jenkins to free memory
sudo systemctl stop jenkins

# Ensure backend/frontend running
sudo systemctl start backend.service
sudo systemctl start frontend.service

# Run tests
cd ~/AI-Health-Journal-Application/tests
sudo docker build -t selenium-tests .
sudo docker run --rm selenium-tests

# Start Jenkins after tests complete
sudo systemctl start jenkins
```

### Option 3: Demo Jenkins Pipeline (stop app temporarily)
```bash
# Stop app to free memory
sudo systemctl stop backend.service
sudo systemctl stop frontend.service

# Start Jenkins
sudo systemctl start jenkins

# Access Jenkins and run pipeline
# Tests will fail because app is not running, but pipeline will execute
```

## Troubleshooting

### EC2 Frozen/Stuck
```bash
# Reboot from AWS Console:
# EC2 → Instances → Select instance → Instance State → Reboot
```

### Services Not Starting
```bash
# Check logs
sudo journalctl -u backend.service -n 50 --no-pager
sudo journalctl -u frontend.service -n 50 --no-pager

# Restart services
sudo systemctl daemon-reload
sudo systemctl restart backend.service frontend.service
```

### Docker Permission Denied
```bash
sudo usermod -aG docker jenkins
sudo usermod -aG docker ubuntu
sudo systemctl restart jenkins
```

### Port Already in Use
```bash
# Find process using port 3000
sudo lsof -i :3000
# Kill process if needed
sudo kill -9 <PID>
```
