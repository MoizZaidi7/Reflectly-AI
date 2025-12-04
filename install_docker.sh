#!/bin/bash

# Docker Installation Script for Ubuntu 22.04 EC2
# This script installs Docker Engine and adds users to docker group

echo "Starting Docker installation on Ubuntu 22.04..."

# Remove old Docker versions if they exist
echo "Removing old Docker versions..."
sudo apt remove docker docker-engine docker.io containerd runc -y

# Update package index
echo "Updating package index..."
sudo apt update

# Install required packages
echo "Installing required packages..."
sudo apt install ca-certificates curl gnupg lsb-release -y

# Add Docker's official GPG key
echo "Adding Docker's official GPG key..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up Docker repository
echo "Setting up Docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
echo "Updating package index with Docker repository..."
sudo apt update

# Install Docker Engine
echo "Installing Docker Engine..."
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin -y

# Start Docker service
echo "Starting Docker service..."
sudo systemctl start docker

# Enable Docker to start on boot
echo "Enabling Docker to start on boot..."
sudo systemctl enable docker

# Add ubuntu user to docker group (for EC2 default user)
echo "Adding ubuntu user to docker group..."
sudo usermod -aG docker ubuntu

# Add jenkins user to docker group (if Jenkins is installed)
echo "Adding jenkins user to docker group..."
sudo usermod -aG docker jenkins

# Verify Docker installation
echo "Verifying Docker installation..."
docker --version

# Test Docker with hello-world image
echo "Testing Docker installation..."
sudo docker run hello-world

echo "====================================="
echo "Docker Installation Complete!"
echo "====================================="
echo "Docker version: $(docker --version)"
echo "Users added to docker group: ubuntu, jenkins"
echo "Note: You may need to log out and back in for group changes to take effect"
echo "====================================="