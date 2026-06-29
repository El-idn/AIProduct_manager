Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
Set-Location $PSScriptRoot\..

git add .gitignore
git rm --cached AI_Product_Management_Assistant.txt 2>$null

if (-not (git rev-parse HEAD 2>$null)) {
  git commit -m "Initial commit: ProdPilot AI portfolio demo with Next.js, Groq AI, and dashboard MVP."
}

if (-not (git remote get-url origin 2>$null)) {
  git remote add origin https://github.com/El-idn/AIProduct_manager.git
}

git push -u origin main
