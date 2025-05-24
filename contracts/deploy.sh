#!/bin/bash

# Cryptographic Escape Game Deployment Script

echo "🎮 Deploying The Cryptographic Escape Game..."

# Build and deploy smart contracts
echo "📦 Building and deploying Move contracts..."
cd contracts/crypto_escape_game
sui move build
CONTRACT_ID=$(sui client publish --gas-budget 10000000 | grep -o "Published to [0-9a-fx]*" | awk '{print $3}')
echo "✅ Contract deployed with ID: $CONTRACT_ID"
cd ../..

# Update contract address in frontend
echo "🔄 Updating contract address in frontend..."
sed -i "s/const PACKAGE_ID = '0x0'/const PACKAGE_ID = '$CONTRACT_ID'/" frontend/lib/sui-integration.ts

# Build frontend
echo "🏗️ Building frontend..."
cd frontend
npm run build

# Deploy frontend (this would be replaced with your actual deployment command)
echo "🚀 Deploying frontend..."
# Example: vercel --prod

echo "✨ Deployment complete! The Cryptographic Escape Game is now live." 