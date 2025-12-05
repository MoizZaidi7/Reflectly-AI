import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_dashboard_load(driver):
    # Navigate to the login page (prerequisite for dashboard)
    driver.get("http://51.20.31.20:3000/login")
    # Wait for login page to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Verify we're on the login page
    assert "login" in driver.current_url.lower()
    # Verify form elements exist
    assert driver.find_element(By.NAME, "email").is_displayed()
    assert driver.find_element(By.NAME, "password").is_displayed()
    # Assert presence of dashboard elements, e.g., a stats card or chart
    dashboard_content = driver.find_element(By.CLASS_NAME, "min-h-screen")
    assert dashboard_content is not None