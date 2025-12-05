import pytest


def test_homepage_load(driver):
    # Navigate to the homepage
    driver.get("http://51.20.31.20:3000")
    # Assert that the page title contains expected text
    assert "Reflectly AI" in driver.title
    # Verify page loaded successfully
    assert driver.current_url == "http://51.20.31.20:3000/"