#!/bin/bash

# Docker and Docker Compose Setup Script for Ubuntu EC2
# AI Health Journal Application

echo "=================================="
echo "Installing Docker and Docker Compose"
echo "=================================="

# Update package index
echo "Updating package index..."
sudo apt-get update

# Install prerequisite packages
echo "Installing prerequisites..."
sudo apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Add Docker's official GPG key
echo "Adding Docker GPG key..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Set up Docker repository
echo "Setting up Docker repository..."
echo \
  "deb [arch= signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
   stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package index again
sudo apt-get update

# Install Docker Engine
echo "Installing Docker Engine..."
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Start and enable Docker
echo "Starting Docker service..."
sudo systemctl start docker
sudo systemctl enable docker

# Add current user to docker group (avoid using sudo for docker commands)
echo "Adding current user to docker group..."
sudo usermod -aG docker 

# Download Docker Compose standalone (v2.24.0)
echo "Installing Docker Compose standalone..."
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose--" -o /usr/local/bin/docker-compose

# Set executable permissions
sudo chmod +x /usr/local/bin/docker-compose

# Create symbolic link for docker-compose
sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose

# Verify installations
echo ""
echo "=================================="
echo "Verifying installations..."
echo "=================================="
docker --version
docker compose version
docker-compose --version

echo ""
echo "=================================="
echo "Installation Complete!"
echo "=================================="
echo "IMPORTANT: Log out and log back in for group changes to take effect"
echo "Or run: newgrp docker"
echo ""
echo "Next steps:"
echo "1. Clone your repository"
echo "2. Configure .env file"
echo "3. Run: docker-compose up -d"
echo "=================================="
