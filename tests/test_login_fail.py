import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_login_fail(driver):
    # Navigate to the login page
    driver.get("http://localhost:3000/login")
    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Fill in incorrect credentials
    driver.find_element(By.NAME, "email").send_keys("wrong@example.com")
    driver.find_element(By.NAME, "password").send_keys("wrongpassword")
    # Submit the form
    driver.find_element(By.TAG_NAME, "button").click()
    # Assert that login failed (e.g., error message appears)
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Invalid')]")))
    error_message = driver.find_element(By.XPATH, "//*[contains(text(), 'Invalid')]")
    assert error_message.is_displayed()