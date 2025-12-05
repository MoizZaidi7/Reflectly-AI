import pytest


def test_headless_chrome(driver):
    # This test verifies that headless Chrome is working
    driver.get("http://51.20.31.20:3000")
    # Assert page loaded
    assert "Reflectly AI" in driver.title
    # Since it's headless, we can't visually verify, but assert title
    assert driver.title is not None