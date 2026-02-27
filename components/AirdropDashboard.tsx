"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function AirdropDashboard() {
  const { publicKey, connected } = useWallet();

  const [airdropBalance, setAirdropBalance] = useState(0);
  const [refBalance, setRefBalance] = useState(0);

  useEffect(() => {
    if (!publicKey) return;

    const stored = localStorage.getItem(publicKey.toString());
    if (stored) {
      const data = JSON.parse(stored);
      setAirdropBalance(data.airdrop || 0);
      setRefBalance(data.ref || 0);
    } else {
      const newUser = {
        airdrop: 1000,
        ref: 0
      };
      localStorage.setItem(publicKey.toString(), JSON.stringify(newUser));
      setAirdropBalance(1000);
    }
  }, [publicKey]);

  const referralLink = publicKey
    ? `${window.location.origin}?ref=${publicKey.toString()}`
    : "";

  return (
    <div className="mt-8 bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-4">Airdrop Dashboard</h2>

      <p className="text-lime-400 mb-2">
        Airdrop Balance: {airdropBalance} BPUNCH
      </p>

      <p className="text-blue-400 mb-4">
        Referral Bonus: {refBalance} BPUNCH
      </p>

      {connected && (
        <>
          <p className="text-sm text-slate-400 mb-2">
            Your Referral Link:
          </p>

          <div className="bg-slate-800 p-2 rounded text-xs break-all">
            {referralLink}
          </div>
        </>
      )}
    </div>
  );
}