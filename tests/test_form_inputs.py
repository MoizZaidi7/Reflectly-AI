import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_form_inputs(driver):
    # Navigate to the login page
    driver.get("http://localhost:3000/login")
    # Wait for form to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Check that input fields are present
    email_input = driver.find_element(By.NAME, "email")
    password_input = driver.find_element(By.NAME, "password")
    assert email_input.is_displayed()
    assert password_input.is_displayed()
    # Test input functionality
    email_input.send_keys("test@example.com")
    password_input.send_keys("password123")
    assert email_input.get_attribute("value") == "test@example.com"
    assert password_input.get_attribute("value") == "password123"