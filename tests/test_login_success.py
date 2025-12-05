import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_login_success(driver):
    # Navigate to the login page
    driver.get("http://51.20.31.20:3000/login")
    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Verify form fields are present
    email_field = driver.find_element(By.NAME, "email")
    password_field = driver.find_element(By.NAME, "password")
    assert email_field.is_displayed()
    assert password_field.is_displayed()
    # Verify login button exists
    button = driver.find_element(By.TAG_NAME, "button")
    assert button.is_displayed()
    assert "/dashboard" in driver.current_url