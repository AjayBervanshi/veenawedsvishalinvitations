from playwright.sync_api import Page, expect, sync_playwright

def verify_wedding_website(page: Page, viewport: dict, filename: str):
    print(f"Navigating to wedding website with viewport {viewport['width']}x{viewport['height']}...")
    page.goto("http://localhost:8081")

    # Wait for the page to load
    page.wait_for_timeout(2000)

    print("Opening the invitation...")
    # The whole envelope has the onClick handler, click in the center
    page.mouse.click(viewport['width'] / 2, viewport['height'] / 2)

    # Wait for the animation to complete
    page.wait_for_timeout(4000)

    print(f"Taking full page screenshot: {filename}")
    page.screenshot(path=f"/home/jules/{filename}", full_page=True)

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        try:
            # Desktop
            desktop_page = browser.new_page(viewport={"width": 1280, "height": 3000})
            verify_wedding_website(desktop_page, {"width": 1280, "height": 3000}, "desktop_full_page.png")
            desktop_page.close()

            # Mobile
            mobile_page = browser.new_page(viewport={"width": 390, "height": 3000})
            verify_wedding_website(mobile_page, {"width": 390, "height": 3000}, "mobile_full_page.png")
            mobile_page.close()

            print("Verification screenshots captured successfully.")
        finally:
            browser.close()
