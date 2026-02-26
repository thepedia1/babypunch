"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  { ssr: false }
);

export default function PresalePage() {
  const { publicKey } = useWallet();

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-4">

      <h1 className="text-3xl font-bold mb-6">
        Join $BPUNCH Presale
      </h1>

      <WalletMultiButton />

      {publicKey && (
        <p className="mt-4 text-slate-400 break-all text-center">
          {publicKey.toString()}
        </p>
      )}

    </div>
  );
}