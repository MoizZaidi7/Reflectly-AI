import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_dashboard_load(driver):
    # First, log in to access dashboard
    driver.get("http://localhost:3000/login")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    driver.find_element(By.NAME, "email").send_keys("test@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.TAG_NAME, "button").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))
    # Now check dashboard elements (check for presence of dashboard content)
    assert "/dashboard" in driver.current_url
    # Assert presence of dashboard elements, e.g., a stats card or chart
    dashboard_content = driver.find_element(By.CLASS_NAME, "min-h-screen")
    assert dashboard_content is not None