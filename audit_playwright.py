import os
import json
import time
from playwright.sync_api import sync_playwright

output_dir = r"C:/Users/3670589/.gemini/antigravity/scratch/veenawedsvishalinvitaion/audit_results"
os.makedirs(output_dir, exist_ok=True)

findings = {
    "console_errors": [],
    "console_warnings": [],
    "failed_requests": [],
    "layout_issues": [],
    "viewports_tested": [],
    "step_reports": []
}

def run_audit():
    with sync_playwright() as p:
        # Launch using msedge channel on Windows
        browser = p.chromium.launch(channel="msedge", headless=True)
        
        # -------------------------------------------------------------
        # TEST 1: Full Interactive Surfing & Step-by-Step Scroll on Desktop
        # -------------------------------------------------------------
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()

        # Listen for errors
        page.on("console", lambda msg: findings["console_errors"].append(msg.text) if msg.type == "error" 
                else findings["console_warnings"].append(msg.text) if msg.type == "warning" else None)
        page.on("requestfailed", lambda req: findings["failed_requests"].append(f"{req.method} {req.url} - {req.failure}"))

        print("1. Navigating to http://127.0.0.1:5173 ...")
        page.goto("http://127.0.0.1:5173", wait_until="networkidle")
        page.wait_for_timeout(1000)

        # Audit initial envelope state
        page.screenshot(path=os.path.join(output_dir, "01_envelope_screen.png"))
        
        # Click wax seal to open envelope
        seal_btn = page.locator("button, [role='button']").first
        if seal_btn.count() > 0:
            print("2. Clicking envelope wax seal...")
            seal_btn.click()
            page.wait_for_timeout(1500)
        else:
            findings["layout_issues"].append("Could not find opening button/seal on initial screen")

        page.screenshot(path=os.path.join(output_dir, "02_hero_opened.png"))

        # Inspect Ganesh Ji element
        ganesh_info = page.evaluate("""() => {
            const img = document.querySelector('img[alt*="Ganesha"], img[alt*="ganpati"]');
            if (!img) return null;
            const rect = img.getBoundingClientRect();
            return {
                src: img.src,
                width: rect.width,
                height: rect.height,
                top: rect.top,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight
            };
        }""")
        print(f"Ganesh Icon metrics: {ganesh_info}")

        # Check Hero typography metrics
        hero_metrics = page.evaluate("""() => {
            const h1s = Array.from(document.querySelectorAll('h1')).map(h => ({
                text: h.innerText,
                fontSize: window.getComputedStyle(h).fontSize,
                fontFamily: window.getComputedStyle(h).fontFamily,
                opacity: window.getComputedStyle(h).opacity,
                rect: h.getBoundingClientRect()
            }));
            const helper = document.body.innerText.includes('Scroll to Enter the Sacred Mandir');
            return { h1s, helperPresent: helper };
        }""")
        print(f"Hero typography: {hero_metrics}")
        if hero_metrics.get("helperPresent"):
            findings["layout_issues"].append("Found 'Scroll to Enter the Sacred Mandir' text still in DOM")

        # Surfing & Progressive Scroll Through the entire page
        total_scroll_height = page.evaluate("() => document.documentElement.scrollHeight")
        print(f"Total page scroll height: {total_scroll_height}px")

        # Scroll in 200px steps and take diagnostic measurements
        scroll_positions = [200, 500, 900, 1300, 1700, 2100, 2600, 3100, 3600, 4200]
        for y in scroll_positions:
            if y > total_scroll_height:
                break
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(600)
            
            # Check Mandir 3D stage elements visibility and transforms at this y
            stage_metrics = page.evaluate("""() => {
                const mandir = document.querySelector('img[alt*="Ram Mandir"]');
                const garden = document.querySelector('img[alt*="Garden"]');
                const couple = document.querySelector('img[alt*="Veena & Vishal Walking"]');
                const clouds = Array.from(document.querySelectorAll('img[alt*="Clouds"]'));
                
                const getStyle = el => el ? {
                    opacity: window.getComputedStyle(el).opacity,
                    rect: el.getBoundingClientRect(),
                    display: window.getComputedStyle(el).display,
                    visibility: window.getComputedStyle(el).visibility
                } : null;

                return {
                    mandir: getStyle(mandir),
                    garden: getStyle(garden),
                    couple: getStyle(couple),
                    cloudCount: clouds.length,
                    cloudStyles: clouds.map(getStyle)
                };
            }""")
            
            page.screenshot(path=os.path.join(output_dir, f"scroll_y_{y}.png"))
            findings["step_reports"].append({"y": y, "metrics": stage_metrics})
            print(f"Scrolled to y={y} captured")

        # Verify Functions Section
        func_metrics = page.evaluate("""() => {
            const h2 = Array.from(document.querySelectorAll('h2')).find(h => h.innerText.includes('Functions'));
            const cards = Array.from(document.querySelectorAll('.royal-mandir-card, a[href*="calendar.google.com"]'));
            const calButtons = Array.from(document.querySelectorAll('a[href*="calendar.google.com"]')).map(a => ({
                text: a.innerText,
                href: a.href
            }));
            return {
                hasFunctionsHeading: !!h2,
                functionsRect: h2 ? h2.getBoundingClientRect() : null,
                calButtonCount: calButtons.length,
                calButtons
            };
        }""")
        print(f"Functions metrics: {func_metrics}")
        if not func_metrics["hasFunctionsHeading"]:
            findings["layout_issues"].append("Missing 'Functions' heading")
        if func_metrics["calButtonCount"] < 3:
            findings["layout_issues"].append(f"Expected 3 calendar buttons, found {func_metrics['calButtonCount']}")

        # -------------------------------------------------------------
        # TEST 2: Multi-Device Responsive Surfing
        # -------------------------------------------------------------
        devices = [
            {"name": "Mobile (iPhone 14)", "width": 390, "height": 844},
            {"name": "Tablet (iPad)", "width": 768, "height": 1024},
            {"name": "Laptop (1366x768)", "width": 1366, "height": 768},
            {"name": "Desktop 4K (2560x1440)", "width": 2560, "height": 1440}
        ]

        for d in devices:
            print(f"Testing device: {d['name']}...")
            dev_context = browser.new_context(viewport={"width": d["width"], "height": d["height"]})
            dev_page = dev_context.new_page()
            dev_page.goto("http://127.0.0.1:5173", wait_until="networkidle")
            dev_page.wait_for_timeout(800)
            
            # Click open
            btn = dev_page.locator("button, [role='button']").first
            if btn.count() > 0:
                btn.click()
                dev_page.wait_for_timeout(1000)
            
            safe_name = d['name'].split()[0].lower()
            dev_page.screenshot(path=os.path.join(output_dir, f"device_{safe_name}_hero.png"))
            
            # Scroll to mandir stage
            dev_page.evaluate("window.scrollTo(0, window.innerHeight * 1.2)")
            dev_page.wait_for_timeout(800)
            dev_page.screenshot(path=os.path.join(output_dir, f"device_{safe_name}_mandir.png"))
            
            # Check horizontal overflow (horizontal scroll bug)
            scroll_width = dev_page.evaluate("() => document.documentElement.scrollWidth")
            client_width = dev_page.evaluate("() => document.documentElement.clientWidth")
            if scroll_width > client_width + 1:
                overflow_px = scroll_width - client_width
                findings["layout_issues"].append(f"Horizontal overflow bug on {d['name']}: {overflow_px}px overflow")
            
            findings["viewports_tested"].append({
                "device": d["name"],
                "scrollWidth": scroll_width,
                "clientWidth": client_width,
                "overflow": scroll_width > client_width + 1
            })
            dev_context.close()

        context.close()
        browser.close()

    # Save summary report
    with open(os.path.join(output_dir, "audit_summary.json"), "w", encoding="utf-8") as f:
        json.dump(findings, f, indent=2)
    print("Audit run finished!")

if __name__ == "__main__":
    run_audit()
