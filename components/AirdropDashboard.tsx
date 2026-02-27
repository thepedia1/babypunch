"use client";

import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";

export default function AirdropDashboard() {

  const { publicKey } = useWallet();
  const [data, setData] = useState<any>(null);

  // INIT AIRDROP 1000
  useEffect(() => {
    if (!publicKey) return;

    const wallet = publicKey.toString();
    const stored = localStorage.getItem(wallet);

    if (!stored) {
      const initial = {
        airdrop: 1000,
        referral: 0,
        presaleBonus: 0
      };
      localStorage.setItem(wallet, JSON.stringify(initial));
      setData(initial);
    } else {
      setData(JSON.parse(stored));
    }
  }, [publicKey]);

  // REFERRAL SYSTEM
  useEffect(() => {
    if (!publicKey) return;

    const wallet = publicKey.toString();
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");

    if (!ref) return;
    if (ref === wallet) return;

    const refUsedKey = "ref_used_" + wallet;
    if (localStorage.getItem(refUsedKey)) return;

    const refData = localStorage.getItem(ref);
    if (refData) {
      const parsed = JSON.parse(refData);
      parsed.referral += 500;
      localStorage.setItem(ref, JSON.stringify(parsed));
      localStorage.setItem(refUsedKey, "true");
    }
  }, [publicKey]);

  if (!publicKey || !data) return null;

  const total =
    data.airdrop +
    data.referral +
    data.presaleBonus;

  const referralLink =
    window.location.origin +
    "?ref=" +
    publicKey.toString();

  return (
    <div style={{ marginTop: "40px", textAlign: "center" }}>

      <h2>Total Balance</h2>
      <h1 style={{ color: "#84CC16" }}>
        {total.toLocaleString()} BPUNCH
      </h1>

      <p>Airdrop: {data.airdrop}</p>
      <p>Referral: {data.referral}</p>
      <p>Presale Bonus: {data.presaleBonus}</p>

      <div style={{ marginTop: "20px" }}>
        <p>Your Referral Link:</p>
        <input
          value={referralLink}
          readOnly
          style={{ width: "320px" }}
        />
      </div>

    </div>
  );
}