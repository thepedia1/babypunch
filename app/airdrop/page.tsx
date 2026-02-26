"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet
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

function AirdropMain() {
  const { publicKey, connected } = useWallet();
  const [balance, setBalance] = useState(0);
  const [referrals, setReferrals] = useState(0);

  useEffect(() => {
    if (connected && publicKey) {
      const stored = localStorage.getItem(publicKey.toString());
      if (!stored) {
        setBalance(1000);
        localStorage.setItem(
          publicKey.toString(),
          JSON.stringify({
            balance: 1000,
            referrals: 0
          })
        );
      } else {
        const parsed = JSON.parse(stored);
        setBalance(parsed.balance);
        setReferrals(parsed.referrals);
      }
    }
  }, [connected, publicKey]);

  function copyInvite() {
    if (!publicKey) return;
    const link = `${window.location.origin}/airdrop?ref=${publicKey.toString()}`;
    navigator.clipboard.writeText(link);
    alert("Invite link copied");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        BPUNCH Airdrop
      </h1>

      <WalletMultiButton />

      {connected && (
        <div className="mt-6 w-full max-w-md bg-slate-900 rounded-xl p-6 text-center border border-slate-800">
          <p className="text-sm text-slate-400 break-all mb-4">
            {publicKey?.toString()}
          </p>

          <div className="space-y-2">
            <p className="text-lg font-semibold">
              Balance: <span className="text-lime-400">{balance} BPUNCH</span>
            </p>
            <p className="text-sm text-slate-400">
              Referrals: {referrals}
            </p>
          </div>

          <button
            onClick={copyInvite}
            className="mt-4 w-full bg-lime-500 hover:bg-lime-400 text-black font-semibold py-2 rounded-lg transition"
          >
            Copy Invite Link
          </button>
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
          <AirdropMain />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}