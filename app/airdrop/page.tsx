"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

const RPC = "https://api.mainnet-beta.solana.com";

function AirdropContent() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    if (connected && publicKey) {
      setBalance(1000);
    }
  }, [connected, publicKey]);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6">
        BPUNCH Airdrop
      </h1>

      <WalletMultiButton />

      {connected && (
        <div className="mt-6 w-full max-w-md bg-slate-900 border border-slate-800 rounded-xl p-6 text-center">
          <p className="text-lg font-semibold">
            Balance: <span className="text-lime-400">{balance} BPUNCH</span>
          </p>
        </div>
      )}
    </div>
  );
}

export default function AirdropPage() {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={RPC}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <AirdropContent />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}