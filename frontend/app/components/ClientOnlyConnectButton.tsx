"use client";

import { ConnectButton } from "@mysten/dapp-kit";
import { useEffect, useState } from "react";

export default function ClientOnlyConnectButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-4 py-2 bg-gradient-to-r from-red-600 to-white rounded-xl border border-red-500/30 shadow-lg">
        <span className="text-black font-medium">Connect Wallet</span>
      </div>
    );
  }

  return <ConnectButton />;
} 