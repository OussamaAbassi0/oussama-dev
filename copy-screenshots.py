"""
Script pour copier les screenshots dans public/projects/
Lance ce script UNE SEULE FOIS depuis le dossier du projet :
  python copy-screenshots.py

Les screenshots doivent être dans le même dossier que ce script,
ou tu peux changer les chemins SOURCE ci-dessous.
"""
import shutil
import os
from pathlib import Path

# Dossier de destination
DEST = Path(__file__).parent / "public" / "projects"
DEST.mkdir(parents=True, exist_ok=True)

# Cherche les screenshots dans Downloads (adapte si nécessaire)
SEARCH_DIRS = [
    Path.home() / "Downloads",
    Path.home() / "Desktop",
    Path(__file__).parent,
]

# Mapping nom_fichier_capture -> nom_fichier_projet
MAPPINGS = {
    "Capture_d_\u00e9cran_2026-03-24_104604.png": "darkosclaw.png",
    "Capture_d_\u00e9cran_2026-03-24_104641.png": "leadscout.png",
    "Capture_d_\u00e9cran_2026-03-24_104808.png": "flowaudit-hero.png",
    "Capture_d_\u00e9cran_2026-03-24_104936.png": "talentscout-hero.png",
}

copied = 0
for search_dir in SEARCH_DIRS:
    for src_name, dst_name in MAPPINGS.items():
        src = search_dir / src_name
        dst = DEST / dst_name
        if src.exists() and not dst.exists():
            shutil.copy2(src, dst)
            print(f"  OK  {src_name} -> public/projects/{dst_name}")
            copied += 1

if copied == 0:
    print("Aucun fichier copie - verifie que les screenshots sont dans Downloads")
    print("Ou copie manuellement les 4 fichiers dans public/projects/:")
    for dst_name in MAPPINGS.values():
        print(f"  - {dst_name}")
else:
    print(f"\n{copied} screenshot(s) copiés avec succès dans public/projects/")
