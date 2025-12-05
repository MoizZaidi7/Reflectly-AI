import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_register_success(driver):
    # Navigate to the registration page
    driver.get("http://51.20.31.20:3000/signup")
    # Wait for the page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Verify all form fields are present
    assert driver.find_element(By.NAME, "name").is_displayed()
    assert driver.find_element(By.NAME, "email").is_displayed()
    assert driver.find_element(By.NAME, "password").is_displayed()
    assert driver.find_element(By.NAME, "confirmPassword").is_displayed()
    # Verify submit button exists
    button = driver.find_element(By.TAG_NAME, "button")
    assert button.is_displayed()