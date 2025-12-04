import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_redirects(driver):
    # Navigate to a page that should redirect (e.g., protected dashboard without login)
    driver.get("http://localhost:3000/dashboard")
    # Wait for redirect to login
    WebDriverWait(driver, 10).until(EC.url_contains("/login"))
    assert "/login" in driver.current_url
    # Now log in and check redirect back
    driver.find_element(By.NAME, "email").send_keys("test@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.TAG_NAME, "button").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))
    assert "/dashboard" in driver.current_url