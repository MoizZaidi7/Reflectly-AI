import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_register_success(driver):
    # Navigate to the registration page
    driver.get("http://localhost:3000/signup")
    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Fill in the registration form (using 'name' field as per SignupForm.jsx)
    driver.find_element(By.NAME, "name").send_keys("testuser")
    driver.find_element(By.NAME, "email").send_keys("test@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.NAME, "confirmPassword").send_keys("password123")
    # Submit the form
    driver.find_element(By.TAG_NAME, "button").click()
    # Assert successful registration (e.g., redirected to login or success message)
    WebDriverWait(driver, 10).until(EC.url_contains("/login"))
    assert "/login" in driver.current_url