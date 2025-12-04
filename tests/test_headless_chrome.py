import pytest


def test_headless_chrome(driver):
    # This test verifies that headless Chrome is working
    driver.get("http://localhost:3000")
    # Assert page loaded
    assert "AI Health Journal" in driver.title
    # Since it's headless, we can't visually verify, but assert title
    assert driver.title is not None