![Uploading Screenshot 2025-05-24 105009.png…]()
# The Cryptographic Escape Game

An interactive, decentralized puzzle game that combines escape room mechanics with cryptographic challenges on the Sui blockchain.

## 🌟 Features

- **🔐 Advanced Cryptographic Puzzles**: Solve 10 unique puzzles across 5 themed rooms including Caesar ciphers, MD5 hash preimages, XOR operations, steganography, ROT13, Base64, and more
- **🏛️ 5 Immersive Themed Rooms**: Navigate through beautifully designed 3D environments:
  - The Cipher Chamber (Cryptography)
  - The Digital Vault (Cybersecurity) 
  - The Steganography Lab (Hidden Messages)
  - The Frequency Analysis Center (Pattern Recognition)
  - The Quantum Encryption Facility (Advanced Challenges)
- **⛓️ Blockchain Integration**: Connect your Sui wallet to track progress and achievements
- **🎮 Interactive 3D Experience**: Immersive Three.js powered room visualization with escape room atmosphere
- **🏆 Comprehensive Scoring System**: Earn 100 points per puzzle and compete with others
- **💡 Advanced Hint System**: Multiple hints per puzzle to guide you when stuck
- **📱 Responsive Design**: Beautiful, modern UI with stunning animations, card shadows, and gradient effects
- **🎨 Enhanced Visual Experience**: Animated escape room scenes, floating cryptographic symbols, gradient backgrounds, and professional UI components

## 🎯 Game Modes

### Single Player Adventure
- Progress through multiple themed rooms
- Solve puzzles to unlock the next room
- Track your score and completion time

### Puzzle Types
1. **Caesar Cipher**: Decrypt messages with character shifting
2. **Hash Challenges**: Find inputs that produce specific MD5 hashes
3. **XOR Puzzles**: Solve binary XOR operations
4. **Binary Decoding**: Convert binary to ASCII text

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Three.js & React Three Fiber** - 3D room visualization
- **@mysten/dapp-kit** - Sui blockchain integration

### Smart Contracts
- **Move Language** - Sui blockchain smart contracts
- **Sui Framework** - Built on Sui blockchain infrastructure

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- A Sui wallet (see wallet installation below)
- Git for cloning the repository

### Wallet Installation
To play the game, you need to install a Sui wallet browser extension. Here are the most popular options:

1. **Suiet Wallet** (Recommended)
   - [Chrome Extension](https://chromewebstore.google.com/detail/suiet-sui-wallet/khpkpbbcccdmmclmpigdgddabeilkdpd)
   - 5.0 star rating with 11.5K+ users
   - Open source and community trusted

2. **Sui Wallet (Slush)**
   - [Chrome Extension](https://chromewebstore.google.com/detail/slush-%E2%80%94-a-sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil)
   - Official wallet by Mysten Labs
   - 4.9 star rating with 5.5K+ users

3. **Martian Wallet**
   - [Chrome Extension](https://chromewebstore.google.com/detail/martian-aptos-sui-wallet/efbglgofoippbgcjepnhiblaibcnclgk)
   - Supports both Aptos and Sui
   - 4.9 star rating with 14.5K+ users

**Installation Steps:**
1. Click on one of the wallet links above
2. Click "Add to Chrome"
3. Create a new wallet or import an existing one
4. Make sure to connect to Sui Devnet for testing

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd cryptographic-escape-game
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to start playing!

### Smart Contract Setup

1. **Navigate to contracts directory**
   ```bash
   cd contracts/crypto_escape_game
   ```

2. **Install Sui CLI** (if not already installed)
   Follow the [official Sui installation guide](https://docs.sui.io/build/install)

3. **Build the contracts**
   ```bash
   sui move build
   ```

4. **Deploy to devnet** (optional)
   ```bash
   sui client publish --gas-budget 20000000
   ```

## 🎮 How to Play

1. **Connect Your Wallet**
   - Click "Connect Wallet" and select your Sui wallet
   - Approve the connection request

2. **Start Your Adventure**
   - Click "Start Your Adventure" on the welcome screen
   - You'll be taken to the first room

3. **Explore Rooms**
   - Use your mouse to orbit around the 3D room
   - Click on puzzles in the left sidebar to activate them

4. **Solve Puzzles**
   - Read the puzzle description carefully
   - Enter your solution in the input field
   - Use hints if you get stuck
   - Submit your answer to progress

5. **Progress Through Rooms**
   - Complete all puzzles in a room to unlock the next one
   - Track your score as you solve each puzzle

## 🧩 Puzzle Solutions (Spoiler Alert!)

<details>
<summary>Click to reveal solutions</summary>

### Room 1: The Cipher Chamber
- **Caesar's Secret**: "this is a secret message" (Caesar cipher with shift 3)
- **Hash Mystery**: "password" (MD5: 5f4dcc3b5aa765d61d8327deb882cf99)

### Room 2: The Digital Vault
- **XOR Challenge**: "11111111" (XOR binary operation)
- **Binary Decoder**: "Hello" (Binary to ASCII conversion)

### Room 3: The Steganography Lab
- **Hidden Message**: "TEFLETH" (First letters of each word)
- **Reverse Cipher**: "hello world" (Reverse the string)

### Room 4: The Frequency Analysis Center
- **Substitution Cipher**: "CODE BREAKER" (Caesar cipher with shift 3)
- **Hexadecimal Secret**: "Hacker" (Hex to ASCII conversion)

### Room 5: The Quantum Encryption Facility
- **ROT13 Challenge**: "You are awesome!" (ROT13 decoding)
- **Base64 Mystery**: "Cryptography" (Base64 decoding)

</details>

## 🏗️ Project Structure

```
cryptographic-escape-game/
├── frontend/                 # Next.js frontend application
│   ├── app/
│   │   ├── game/            # Main game page
│   │   ├── leaderboard/     # Leaderboard page
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Landing page
│   │   └── providers.tsx    # Blockchain providers
│   ├── public/              # Static assets
│   └── package.json
├── contracts/               # Sui Move smart contracts
│   └── crypto_escape_game/
│       ├── sources/
│       │   ├── game.move    # Core game logic
│       │   └── cryptographic_puzzles.move
│       └── Move.toml
└── README.md
```

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file in the frontend directory:

```env
# Sui Network Configuration
NEXT_PUBLIC_SUI_NETWORK=devnet

# Optional: Package ID after deployment
NEXT_PUBLIC_PACKAGE_ID=your_package_id_here
```

### Network Configuration
The app is configured to work with Sui devnet by default. To change networks, update the `providers.tsx` file.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📜 Smart Contract Details

### Core Modules

1. **Game Module** (`sources/game.move`)
   - Game state management
   - Room and puzzle creation
   - Player progress tracking
   - Completion events

2. **Cryptographic Puzzles** (`sources/cryptographic_puzzles.move`)
   - Puzzle verification logic
   - Hash checking functions
   - Cipher validation

### Key Functions
- `create_game()` - Initialize a new game instance
- `solve_puzzle()` - Submit and verify puzzle solutions
- `advance_room()` - Move to the next room after completion

## 🛡️ Security

- All puzzle solutions are verified on-chain
- Player progress is immutably stored on Sui blockchain
- No sensitive data is stored in the frontend

## 🎨 Design Philosophy

- **Accessibility**: Clean, readable interface with clear visual feedback
- **Education**: Learn real cryptographic concepts while having fun
- **Decentralization**: Leverage blockchain for transparency and permanence
- **Engagement**: Immersive 3D environment and satisfying puzzle mechanics

## 📱 Browser Compatibility

- Chrome/Chromium browsers (recommended)
- Firefox
- Safari (limited 3D support)
- Edge

**Note**: A WebGL-capable browser is required for 3D room visualization.

## 🐛 Known Issues

- Three.js font loading may show console warnings (doesn't affect functionality)
- Some wallet connection timeouts on slower networks
- 3D rendering performance varies by device

## 🔧 Troubleshooting

### Wallet Connection Issues
If you're having trouble connecting your wallet:

1. **Check Wallet Installation**
   - Make sure you have a Sui wallet extension installed
   - Refresh the page after installing the wallet
   - Check that the wallet extension is enabled

2. **Network Configuration**
   - Ensure your wallet is connected to Sui Devnet
   - Try disconnecting and reconnecting your wallet
   - Check that you have some SUI tokens for gas fees

3. **Browser Issues**
   - Try disabling other wallet extensions temporarily
   - Clear browser cache and cookies
   - Disable ad blockers that might interfere with wallet connection
   - Try using an incognito/private browsing window

4. **Debug Information**
   - Open browser developer tools (F12)
   - Check the console for any error messages
   - Look for wallet debugging information in the console

5. **Still Having Issues?**
   - Try switching to a different Sui wallet
   - Restart your browser completely
   - Check if the wallet works on other Sui dApps first

## 🔮 Future Enhancements

- [ ] Multiplayer competitive modes
- [ ] Additional puzzle types (RSA, elliptic curves)
- [ ] Time-locked rewards and NFT certificates
- [ ] Community-created puzzle rooms
- [ ] Mobile app version
- [ ] Advanced leaderboard with statistics

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Sui blockchain team for excellent developer tools
- Three.js community for 3D web capabilities
- Cryptography educators for puzzle inspiration
- Open source contributors and testers

---

**Ready to escape? Connect your wallet and start your cryptographic adventure!** 🔐✨ 
