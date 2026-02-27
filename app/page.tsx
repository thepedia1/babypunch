"use client";
import AirdropDashboard from "@/components/AirdropDashboard";
import { useState } from "react";
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

const RPC = "https://rpc.ankr.com/solana";

function Main() {
  const { publicKey, signMessage, connected } = useWallet();
  const [verified, setVerified] = useState(false);
  const [showPresale, setShowPresale] = useState(false);

  const wallet = publicKey?.toString() || "";

  async function verifyWallet() {
    try {
      if (!publicKey) return;

      const message = new TextEncoder().encode(
        "Verify BabyPunch Wallet"
      );

      await signMessage?.(message);

      setVerified(true);
      setShowPresale(true);
    } catch {}
  }

  function copyInvite() {
    if (!wallet) return;

    const link =
      window.location.origin +
      "/presale?ref=" +
      wallet;

    navigator.clipboard.writeText(link);
    alert("Invite link copied");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">

      <div className="bg-yellow-400 w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mb-5">
        🐵
      </div>

      <h1 className="text-3xl mb-5 font-bold">
        BabyPunch
      </h1>

      <WalletMultiButton />

{connected && !verified && (
  <button
    onClick={verifyWallet}
    className="mt-3 px-5 py-3 bg-lime-500 text-black font-bold rounded-xl"
  >
    Verify Wallet
  </button>
)}

{verified && (
  <button
    onClick={copyInvite}
    className="mt-3 px-5 py-3 bg-lime-500 text-black font-bold rounded-xl"
  >
    Copy Invite Link
  </button>
)}

{/* 🔥 TAMBAHKAN DI SINI */}
{connected && (
  <AirdropDashboard />
)}

<div className="flex flex-col gap-3 mt-6">
        <a
          href="/presale"
          className="px-5 py-3 bg-lime-500 text-black font-bold rounded-xl text-center w-52"
        >
          Join Presale
        </a>

        <a
          href="/tokenomics"
          className="px-5 py-3 bg-lime-500 text-black font-bold rounded-xl text-center w-52"
        >
          View Tokenomics
        </a>

        <a
          href="/vesting"
          className="px-5 py-3 bg-lime-500 text-black font-bold rounded-xl text-center w-52"
        >
          Check Vesting
        </a>
      </div>

      {showPresale && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-slate-900 p-8 rounded-xl text-center">
            <div className="bg-yellow-400 w-16 h-16 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">
              🐵
            </div>

            <h2 className="mb-4 font-bold">
              Join $BPUNCH Presale
            </h2>

            <button
              onClick={() =>
                (window.location.href = "/presale")
              }
              className="px-5 py-3 bg-lime-500 text-black font-bold rounded-xl"
            >
              Go to Presale
            </button>

            <p
              className="mt-3 text-slate-400 cursor-pointer"
              onClick={() => setShowPresale(false)}
            >
              Close
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const wallets = [new PhantomWalletAdapter()];

  return (
    <ConnectionProvider endpoint={RPC}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Main />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}