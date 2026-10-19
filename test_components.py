import os

components = ['Navbar', 'Hero', 'Experience', 'Projects', 'SkillsAndEducation', 'Contact']
for comp in components:
    with open('F:/portfolio/src/App.jsx', 'w', encoding='utf-8') as fh:
        fh.write(f'import React from "react";\nimport {comp} from "./{comp}";\nexport default function App() {{ return <{comp} />; }}')
    res = os.system('npm run build > build_test.log 2>&1')
    print(f"{comp}: {{'SUCCESS' if res == 0 else 'FAILED'}}")
