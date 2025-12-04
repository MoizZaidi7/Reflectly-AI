import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_login_success(driver):
    # Navigate to the login page
    driver.get("http://localhost:3000/login")
    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Fill in correct credentials (assuming user was registered in previous test)
    driver.find_element(By.NAME, "email").send_keys("test@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    # Submit the form
    driver.find_element(By.TAG_NAME, "button").click()
    # Assert successful login (e.g., redirected to dashboard)
    WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))
    assert "/dashboard" in driver.current_url