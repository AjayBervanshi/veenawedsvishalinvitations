import json

with open('C:/Users/3670589/.gemini/antigravity/scratch/veenawedsvishalinvitaion/devtools_report/cdp_report.json', 'r', encoding='utf-8') as f:
    report = json.load(f)

print('Identified bugs count:', len(report['identified_bugs']))
for b in report['identified_bugs']:
    print(' - BUG:', b)

print('Console messages count:', len(report['console_messages']))
for c in report['console_messages']:
    print(' - CONSOLE:', c)

# Trace scroll points around mandir section (scrollY between 0 and 2400)
for p in report['scroll_trace']:
    if p['scrollY'] <= 2400:
        s = p['scrollY']
        b_op = p['brideOpacity']
        m_y = p['mandir']['y'] if p['mandir'] else 'N/A'
        g_y = p['garden']['y'] if p['garden'] else 'N/A'
        c_y = p['couple']['y'] if p['couple'] else 'N/A'
        print(f"scrollY={s:4d} | brideOpacity={b_op} | mandirY={m_y} | gardenY={g_y} | coupleY={c_y}")
