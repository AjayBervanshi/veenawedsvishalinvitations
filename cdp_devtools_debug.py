import os
import sys
import json
import time
from playwright.sync_api import sync_playwright

if sys.platform == "win32":
    try:
        sys.stdout.reconfigure(encoding="utf-8")
        sys.stderr.reconfigure(encoding="utf-8")
    except Exception:
        pass

output_dir = r"C:/Users/3670589/.gemini/antigravity/scratch/veenawedsvishalinvitaion/devtools_report"
os.makedirs(output_dir, exist_ok=True)

report = {
    "title": "",
    "cdp_metrics": {},
    "network_requests": [],
    "console_messages": [],
    "computed_elements": {},
    "scroll_trace": [],
    "identified_bugs": [],
    "fixes_applied": []
}

def debug_with_chrome_devtools():
    with sync_playwright() as p:
        # Launch Chrome with MS Edge channel (Chromium) with devtools/CDP support
        browser = p.chromium.launch(channel="msedge", headless=True, args=[
            "--disable-web-security",
            "--allow-running-insecure-content",
            "--enable-logging"
        ])
        
        context = browser.new_context(
            viewport={"width": 1440, "height": 900},
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36"
        )
        
        page = context.new_page()
        
        # Attach Chrome DevTools Protocol (CDP) session
        cdp = context.new_cdp_session(page)
        cdp.send("Performance.enable")
        cdp.send("Log.enable")
        cdp.send("Network.enable")
        cdp.send("DOM.enable")
        cdp.send("CSS.enable")

        # Track console and network via CDP
        def on_console(msg):
            report["console_messages"].append({"type": msg.type, "text": msg.text, "location": msg.location})
        page.on("console", on_console)

        def on_response(resp):
            report["network_requests"].append({
                "url": resp.url,
                "status": resp.status,
                "contentType": resp.headers.get("content-type", "")
            })
        page.on("response", on_response)

        print("[CDP] Navigating to http://localhost:5173/ ...")
        page.goto("http://localhost:5173/", wait_until="networkidle")
        page.wait_for_timeout(1000)

        report["title"] = page.title()
        print(f"[CDP] Page Title: {report['title']}")

        # Capture initial DevTools Performance Metrics
        perf_metrics = cdp.send("Performance.getMetrics")
        metrics_dict = {m["name"]: m["value"] for m in perf_metrics.get("metrics", [])}
        report["cdp_metrics"]["initial"] = metrics_dict
        print(f"[CDP] Initial JSHeapUsedSize: {metrics_dict.get('JSHeapUsedSize', 0) / 1024 / 1024:.2f} MB, Nodes: {metrics_dict.get('Nodes', 0)}")

        # Step 1: Open Curtain
        seal = page.locator("button, [role='button']").first
        if seal.count() > 0:
            print("[CDP] Clicking opening wax seal...")
            seal.click()
            page.wait_for_timeout(1400)
            page.screenshot(path=os.path.join(output_dir, "cdp_01_hero.png"))

        # Step 2: Inspect Hero Elements via DevTools
        hero_details = page.evaluate("""() => {
            const ganesh = document.querySelector('img[alt*="Ganesha"]');
            const bride = Array.from(document.querySelectorAll('h1')).find(h => h.innerText.includes('Veena'));
            const groom = Array.from(document.querySelectorAll('h1')).find(h => h.innerText.includes('Vishal'));
            const weds = Array.from(document.querySelectorAll('span')).find(s => s.innerText.trim() === 'weds');
            const audioBtn = document.querySelector('button[aria-label*="audio"], button[aria-label*="mute"], button:has(svg)');

            const getRect = el => el ? {
                top: el.getBoundingClientRect().top,
                bottom: el.getBoundingClientRect().bottom,
                left: el.getBoundingClientRect().left,
                width: el.getBoundingClientRect().width,
                height: el.getBoundingClientRect().height,
                opacity: window.getComputedStyle(el).opacity,
                transform: window.getComputedStyle(el).transform
            } : null;

            return {
                ganesh: getRect(ganesh),
                bride: getRect(bride),
                groom: getRect(groom),
                weds: getRect(weds),
                audioBtnExists: !!audioBtn
            };
        }""")
        report["computed_elements"]["hero"] = hero_details
        print(f"[CDP] Hero Details: {hero_details}")

        # Check if Lord Ganesha is centered
        if hero_details["ganesh"]:
            g_left = hero_details["ganesh"]["left"]
            g_width = hero_details["ganesh"]["width"]
            g_center = g_left + g_width / 2
            viewport_center = 1440 / 2
            print(f"[CDP] Ganesh icon center: {g_center}px (viewport center: {viewport_center}px, diff: {abs(g_center - viewport_center)}px)")
            if abs(g_center - viewport_center) > 20:
                report["identified_bugs"].append(f"Ganesh icon off-center by {abs(g_center - viewport_center):.1f}px")

        # Step 3: Progressive Scrollytelling Audit (Every 150px)
        max_y = page.evaluate("() => document.documentElement.scrollHeight - window.innerHeight")
        print(f"[CDP] Max scroll depth: {max_y}px")

        for y in range(0, min(max_y + 100, 3000), 150):
            page.evaluate(f"window.scrollTo(0, {y})")
            page.wait_for_timeout(300)
            
            trace_point = page.evaluate("""(scrollY) => {
                const mandir = document.querySelector('img[alt*="Ram Mandir"]');
                const garden = document.querySelector('img[alt*="Garden"]');
                const couple = document.querySelector('img[alt*="Veena & Vishal Walking"]');
                const cloudL = document.querySelector('img[src*="cloud_left"]');
                const cloudR = document.querySelector('img[src*="cloud_right"]');
                const bride = Array.from(document.querySelectorAll('h1')).find(h => h.innerText.includes('Veena'));

                const getInfo = el => el ? {
                    y: Math.round(el.getBoundingClientRect().top),
                    h: Math.round(el.getBoundingClientRect().height),
                    w: Math.round(el.getBoundingClientRect().width),
                    opacity: parseFloat(window.getComputedStyle(el).opacity || '1').toFixed(2)
                } : null;

                return {
                    scrollY,
                    brideOpacity: bride ? parseFloat(window.getComputedStyle(bride).opacity || '1').toFixed(2) : null,
                    mandir: getInfo(mandir),
                    garden: getInfo(garden),
                    couple: getInfo(couple),
                    cloudL: getInfo(cloudL),
                    cloudR: getInfo(cloudR)
                };
            }""", y)
            
            report["scroll_trace"].append(trace_point)
            if y in [300, 750, 1200, 1800, 2400]:
                page.screenshot(path=os.path.join(output_dir, f"cdp_scroll_{y}.png"))

        # Step 4: Test Interactive Audio & Calendar Features
        print("[CDP] Testing Calendar buttons clickability...")
        cal_links = page.locator('a[href*="calendar.google.com"]')
        for i in range(cal_links.count()):
            btn = cal_links.nth(i)
            box = btn.bounding_box()
            is_visible = btn.is_visible()
            href = btn.get_attribute("href")
            print(f"[CDP] Calendar Button {i+1}: visible={is_visible}, box={box}, href valid={'action=TEMPLATE' in href}")
            if not is_visible:
                report["identified_bugs"].append(f"Calendar button {i+1} not visible")

        # Step 5: Test Audio bell chime
        audio_btn = page.locator('button:has(svg)').first
        if audio_btn.count() > 0:
            print("[CDP] Clicking audio bell/dock button...")
            audio_btn.click()
            page.wait_for_timeout(500)

        # Final CDP performance metrics
        final_metrics = cdp.send("Performance.getMetrics")
        final_dict = {m["name"]: m["value"] for m in final_metrics.get("metrics", [])}
        report["cdp_metrics"]["final"] = final_dict
        print(f"[CDP] Final Nodes: {final_dict.get('Nodes', 0)}, Documents: {final_dict.get('Documents', 0)}")

        # Check for 404s or failed network requests
        failed_resps = [r for r in report["network_requests"] if r["status"] >= 400]
        if failed_resps:
            for fr in failed_resps:
                report["identified_bugs"].append(f"HTTP {fr['status']} on {fr['url']}")
                print(f"[CDP BUG] Network failure: {fr}")
        else:
            print("[CDP] All network resources loaded with HTTP 200!")

        context.close()
        browser.close()

    # Save detailed report
    with open(os.path.join(output_dir, "cdp_report.json"), "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)
    print(f"[CDP] Debugging complete! Report saved to {output_dir}/cdp_report.json")

if __name__ == "__main__":
    debug_with_chrome_devtools()
