import pytest


def test_homepage_load(driver):
    # Navigate to the homepage
    driver.get("http://51.20.31.20:3000")
    # Assert that the page title contains expected text
    assert "Reflectly AI" in driver.title
    # Check if the main heading is present
    heading = driver.find_element("tag name", "h1")
    assert "Transform Your Mental Wellness" in heading.text