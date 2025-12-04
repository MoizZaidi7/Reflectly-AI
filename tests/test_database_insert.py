import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


def test_database_insert(driver):
    # Register a user
    driver.get("http://localhost:3000/signup")
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.TAG_NAME, "form")))
    driver.find_element(By.NAME, "name").send_keys("dbtestuser")
    driver.find_element(By.NAME, "email").send_keys("dbtest@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.NAME, "confirmPassword").send_keys("password123")
    driver.find_element(By.TAG_NAME, "button").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/login"))
    # Now try to log in with the registered user to verify database insert
    driver.find_element(By.NAME, "email").send_keys("dbtest@example.com")
    driver.find_element(By.NAME, "password").send_keys("password123")
    driver.find_element(By.TAG_NAME, "button").click()
    WebDriverWait(driver, 10).until(EC.url_contains("/dashboard"))
    assert "/dashboard" in driver.current_url