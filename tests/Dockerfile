# Use Python 3.10 slim as base image for smaller size
FROM python:3.10-slim

# Set working directory inside the container
WORKDIR /app

# Install system dependencies required for Chromium and ChromeDriver
RUN apt-get update && apt-get install -y \
    wget \
    gnupg \
    chromium \
    chromium-driver \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies: selenium, pytest
RUN pip install --no-cache-dir selenium pytest

# Copy the tests directory into the container
COPY . /app

# Set environment variable to use Chromium in headless mode
ENV CHROME_BIN=/usr/bin/chromium
ENV CHROMEDRIVER_PATH=/usr/bin/chromedriver

# Command to run pytest with verbose output
CMD ["pytest", "-v"]