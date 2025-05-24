# Cryptographic Escape Game Deployment Script for Windows

Write-Host "🎮 Deploying The Cryptographic Escape Game..." -ForegroundColor Cyan

# Build and deploy smart contracts
Write-Host "📦 Building and deploying Move contracts..." -ForegroundColor Yellow
Set-Location -Path "contracts\crypto_escape_game"
sui move build
$publishOutput = sui client publish --gas-budget 10000000
$CONTRACT_ID = ($publishOutput | Select-String -Pattern "Published to ([0-9a-fx]*)").Matches.Groups[1].Value
Write-Host "✅ Contract deployed with ID: $CONTRACT_ID" -ForegroundColor Green
Set-Location -Path "..\..\"

# Update contract address in frontend
Write-Host "🔄 Updating contract address in frontend..." -ForegroundColor Yellow
$suiIntegrationFile = "frontend\lib\sui-integration.ts"
$content = Get-Content -Path $suiIntegrationFile -Raw
$updatedContent = $content -replace "const PACKAGE_ID = '0x0'", "const PACKAGE_ID = '$CONTRACT_ID'"
Set-Content -Path $suiIntegrationFile -Value $updatedContent

# Build frontend
Write-Host "🏗️ Building frontend..." -ForegroundColor Yellow
Set-Location -Path "frontend"
npm run build

# Deploy frontend (this would be replaced with your actual deployment command)
Write-Host "🚀 Deploying frontend..." -ForegroundColor Yellow
# Example: vercel --prod

Write-Host "✨ Deployment complete! The Cryptographic Escape Game is now live." -ForegroundColor Green 