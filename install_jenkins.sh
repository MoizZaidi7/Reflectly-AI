#!/bin/bash

# Jenkins Installation Script for Ubuntu 22.04
# This script installs Jenkins on an Ubuntu EC2 instance

echo "Starting Jenkins installation on Ubuntu 22.04..."

# Update system packages
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install Java 17 (required for Jenkins)
echo "Installing Java 17..."
sudo apt install openjdk-17-jdk -y

# Verify Java installation
echo "Verifying Java installation..."
java -version

# Add Jenkins repository key
echo "Adding Jenkins repository key..."
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null

# Add Jenkins repository
echo "Adding Jenkins repository..."
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

# Update package list
echo "Updating package list..."
sudo apt update

# Install Jenkins
echo "Installing Jenkins..."
sudo apt install jenkins -y

# Start Jenkins service
echo "Starting Jenkins service..."
sudo systemctl start jenkins

# Enable Jenkins to start on boot
echo "Enabling Jenkins to start on boot..."
sudo systemctl enable jenkins

# Check Jenkins status
echo "Checking Jenkins service status..."
sudo systemctl status jenkins

# Get initial admin password
echo "====================================="
echo "Jenkins Installation Complete!"
echo "====================================="
echo "Initial Admin Password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
echo "====================================="
echo "Access Jenkins at: http://your-ec2-ip:8080"
echo "Use the password above to unlock Jenkins"
echo "====================================="