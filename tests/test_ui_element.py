import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_ui_element(driver):
    # Navigate to the homepage
    driver.get("http://51.20.31.20:3000")
    # Wait for page load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "h1")))
    # Assert that a specific UI element is present and visible
    heading = driver.find_element(By.TAG_NAME, "h1")
    assert heading.is_displayed()
    assert "Transform Your" in heading.text and "Mental Wellness" in heading.text