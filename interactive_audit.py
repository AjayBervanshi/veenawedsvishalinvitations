import sys
import time
import json
import os
from playwright.sync_api import sync_playwright

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

shots_dir = r"C:/Users/3670589/.gemini/antigravity/scratch/veenawedsvishalinvitaion/interactive_audit"
os.makedirs(shots_dir, exist_ok=True)

findings = []

def record(category, detail, severity="info"):
    findings.append({"category": category, "detail": detail, "severity": severity})
    print(f"[{severity.upper()}] {category}: {detail}")

def run_deep_interactive_chrome():
    with sync_playwright() as p:
        print("Launching visible Chrome browser on desktop...")
        browser = p.chromium.launch(
            executable_path=r"C:\Program Files\Google\Chrome\Application\chrome.exe",
            headless=False,
            args=["--start-maximized", "--disable-infobars"]
        )
        
        context = browser.new_context(no_viewport=True)
        page = context.new_page()

        # Capture console errors and uncaught exceptions
        page.on("console", lambda m: record("CONSOLE", m.text, "error" if m.type == "error" else "warn" if m.type == "warning" else "info"))
        page.on("pageerror", lambda err: record("PAGE_ERROR", str(err), "error"))
        page.on("requestfailed", lambda req: record("NETWORK_FAIL", f"{req.method} {req.url} - {req.failure}", "error"))

        # 1. Navigate to localhost:5173
        print("1. Opening http://localhost:5173 ...")
        page.goto("http://localhost:5173", wait_until="networkidle")
        time.sleep(2)
        page.screenshot(path=os.path.join(shots_dir, "01_loaded.png"))

        # 2. Check title
        title = page.title()
        print(f"Page title: {title}")
        if "Veena & Vishal" not in title:
            record("TITLE", f"Title missing expected text: {title}", "warn")

        # 3. Click envelope wax seal
        print("2. Interacting with envelope...")
        seal = page.locator("button, [role='button']").first
        if seal.count() > 0:
            seal.click()
            print("Clicked envelope opening button/seal.")
            time.sleep(2.5) # Wait for curtain animation to complete
        else:
            record("ENVELOPE", "Could not find clickable seal", "error")

        page.screenshot(path=os.path.join(shots_dir, "02_hero_opened.png"))

        # 4. Check Ganesh Ji Icon visibility and dimensions
        ganesh_info = page.evaluate("""() => {
            const img = document.querySelector('img[alt*="Ganesha"]');
            if (!img) return null;
            const r = img.getBoundingClientRect();
            return {
                w: Math.round(r.width),
                h: Math.round(r.height),
                visible: r.width > 0 && r.height > 0,
                src: img.src
            };
        }""")
        print(f"Ganesh icon details: {ganesh_info}")
        if not ganesh_info or not ganesh_info["visible"]:
            record("HERO", "Ganesh Ji icon is not visible", "error")
        elif ganesh_info["w"] < 60:
            record("HERO", f"Ganesh icon might be too small: {ganesh_info['w']}px", "warn")

        # 5. Check Audio toggle
        audio_btn = page.locator('button:has(svg)').first
        if audio_btn.count() > 0:
            print("3. Testing audio dock toggle click...")
            audio_btn.click()
            time.sleep(1)
            audio_btn.click()
            time.sleep(1)

        # 6. Progressive Scrollytelling Audit (Mandir 3D Transition Sequence)
        # Scroll smoothly in increments of 100px down to 2600px
        print("4. Starting step-by-step interactive scroll through Mandir sequence...")
        scroll_stages = [
            (250, "Hero text fading"),
            (500, "Hero text dissolved"),
            (900, "Mandir enters center of viewport"),
            (1250, "Garden appears and attaches to mandir base"),
            (1600, "Clouds slide in from side edges"),
            (1950, "Couple walks forward along the footpath"),
            (2300, "Transition to Functions section"),
            (2700, "Functions section full view"),
            (3200, "Our Journey section"),
            (3700, "Muhurat countdown and Venue location"),
            (4200, "RSVP and Blessing Wall")
        ]

        for target_y, desc in scroll_stages:
            print(f"Scrolling to y={target_y} ({desc})...")
            # Smooth scroll emulation
            current_y = page.evaluate("() => window.scrollY")
            steps = 8
            for i in range(1, steps + 1):
                y = current_y + (target_y - current_y) * (i / steps)
                page.evaluate(f"window.scrollTo(0, {y})")
                time.sleep(0.05)
            
            time.sleep(1.2) # Allow framer motion spring to settle

            # Diagnostic checks at this position
            metrics = page.evaluate("""() => {
                const mandir = document.querySelector('img[alt*="Ram Mandir"]');
                const garden = document.querySelector('img[alt*="Garden"]');
                const couple = document.querySelector('img[alt*="Veena & Vishal"]');
                const cloudL = document.querySelector('img[src*="cloud_left"]');
                const cloudR = document.querySelector('img[src*="cloud_right"]');

                const rect = el => el ? {
                    top: Math.round(el.getBoundingClientRect().top),
                    bottom: Math.round(el.getBoundingClientRect().bottom),
                    left: Math.round(el.getBoundingClientRect().left),
                    width: Math.round(el.getBoundingClientRect().width),
                    height: Math.round(el.getBoundingClientRect().height),
                    opacity: parseFloat(window.getComputedStyle(el).opacity || '1')
                } : null;

                return {
                    mandir: rect(mandir),
                    garden: rect(garden),
                    couple: rect(couple),
                    cloudL: rect(cloudL),
                    cloudR: rect(cloudR)
                };
            }""")

            # Verify Mandir & Garden seamless alignment when both visible
            if metrics["mandir"] and metrics["garden"] and metrics["mandir"]["opacity"] > 0.5 and metrics["garden"]["opacity"] > 0.5:
                # Check vertical gap between mandir bottom and garden top
                # Garden has negative margin so it should slightly overlap or touch
                m_bottom = metrics["mandir"]["bottom"]
                g_top = metrics["garden"]["top"]
                overlap = m_bottom - g_top
                if overlap < -20: # There is an unintentional blank gap between them!
                    record("ALIGNMENT", f"Unintentional vertical gap of {abs(overlap)}px between Mandir and Garden at scrollY={target_y}", "error")

            page.screenshot(path=os.path.join(shots_dir, f"scroll_{target_y}_{desc.replace(' ', '_')[:18]}.png"))

        # 7. Test Calendar Buttons
        print("5. Testing Add to Calendar buttons in Functions section...")
        cal_btns = page.locator('a[href*="calendar.google.com"]')
        count = cal_btns.count()
        print(f"Found {count} Calendar buttons.")
        if count < 3:
            record("FUNCTIONS", f"Expected 3 calendar buttons, found {count}", "error")
        else:
            for i in range(count):
                b = cal_btns.nth(i)
                href = b.get_attribute("href")
                if not href or "action=TEMPLATE" not in href:
                    record("CALENDAR", f"Button {i+1} has invalid href: {href}", "error")

        # 8. Test RSVP interaction
        print("6. Testing RSVP form inputs...")
        name_input = page.locator("input[placeholder*='name' i], input[type='text']").first
        if name_input.count() > 0:
            name_input.click()
            name_input.fill("Priya & Rahul")
            time.sleep(0.5)

        # 9. Test Blessing Wall interaction
        print("7. Testing Blessing Wall input...")
        blessing_textarea = page.locator("textarea").first
        if blessing_textarea.count() > 0:
            blessing_textarea.click()
            blessing_textarea.fill("Wishing Veena and Vishal a lifetime of happiness, harmony, and togetherness! ✨")
            time.sleep(0.5)

        time.sleep(3)
        print("Closing browser...")
        browser.close()

    with open(os.path.join(shots_dir, "findings.json"), "w", encoding="utf-8") as f:
        json.dump(findings, f, indent=2)

    print("--- INTERACTIVE AUDIT COMPLETED ---")
    for f in findings:
        print(f" -> [{f['severity'].upper()}] {f['category']}: {f['detail']}")

if __name__ == "__main__":
    run_deep_interactive_chrome()
