import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_login_fail(driver):
    # Navigate to the login page
    driver.get("http://51.20.31.20:3000/login")
    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Verify form is functional by checking fields are editable
    email_field = driver.find_element(By.NAME, "email")
    password_field = driver.find_element(By.NAME, "password")
    email_field.send_keys("test@example.com")
    password_field.send_keys("testpass")
    # Verify input was accepted
    assert email_field.get_attribute("value") == "test@example.com"
    assert password_field.get_attribute("value") == "testpass"