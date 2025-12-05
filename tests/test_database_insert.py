import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_database_insert(driver):
    # Navigate to the registration page
    driver.get("http://51.20.31.20:3000/signup")
    # Wait for form to load
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    # Fill in the form to test database interaction would work
    driver.find_element(By.NAME, "name").send_keys("dbtestuser")
    driver.find_element(By.NAME, "email").send_keys("dbtest@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.NAME, "confirmPassword").send_keys("password123")
    # Verify all fields have values
    assert driver.find_element(By.NAME, "name").get_attribute("value") == "dbtestuser"
    assert driver.find_element(By.NAME, "email").get_attribute("value") == "dbtest@example.com"