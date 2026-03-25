# install-screenshots.ps1
# Lance ce script UNE FOIS depuis PowerShell dans le dossier du projet
# Il copie les screenshots dans public/projects/

$project = "C:\Users\HP\Downloads\Oussamadev\oussama-hq"
$dest    = "$project\public\projects"

# Creer le dossier si besoin
if (!(Test-Path $dest)) {
    New-Item -ItemType Directory -Path $dest | Out-Null
    Write-Host "Dossier cree: $dest"
}

# Chercher les screenshots dans les endroits possibles
$searchDirs = @(
    "$env:USERPROFILE\Downloads",
    "$env:USERPROFILE\Desktop",
    "$project"
)

$files = @{
    "Capture_d_écran_2026-03-24_104604.png" = "darkosclaw.png"
    "Capture_d_écran_2026-03-24_104641.png" = "leadscout.png"
    "Capture_d_écran_2026-03-24_104808.png" = "flowaudit-hero.png"
    "Capture_d_écran_2026-03-24_104936.png" = "talentscout-hero.png"
}

$copied = 0
foreach ($searchDir in $searchDirs) {
    foreach ($srcName in $files.Keys) {
        $src = Join-Path $searchDir $srcName
        $dst = Join-Path $dest $files[$srcName]
        if ((Test-Path $src) -and !(Test-Path $dst)) {
            Copy-Item $src $dst
            Write-Host "  OK: $srcName -> public\projects\$($files[$srcName])"
            $copied++
        }
    }
}

if ($copied -eq 0) {
    Write-Host ""
    Write-Host "ATTENTION: Aucun screenshot trouve automatiquement." -ForegroundColor Yellow
    Write-Host "Copie manuelle necessaire dans: $dest" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Fichiers attendus:"
    foreach ($dst in $files.Values) {
        Write-Host "  - $dst"
    }
} else {
    Write-Host ""
    Write-Host "$copied screenshot(s) copies avec succes!" -ForegroundColor Green
    Write-Host "Lance maintenant: git add . && git commit -m 'feat: add project screenshots' && git push"
}
