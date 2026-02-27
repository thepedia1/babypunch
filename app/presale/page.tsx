"use client";
import AirdropDashboard from "@/components/AirdropDashboard";
import { useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet
} from "@solana/wallet-adapter-react";
import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";
import {
  WalletModalProvider,
  WalletMultiButton
} from "@solana/wallet-adapter-react-ui";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";

const RPC = "https://rpc.ankr.com/solana";
const PRESALE_WALLET = "PASTE_WALLET_KAMU_DISINI";
const RATE = 250000;
const MIN_SOL = 0.03;

function PresaleMain() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const [amount, setAmount] = useState("");
useEffect(() => {
  if (!publicKey) return;

  const wallet = publicKey.toString();
  const urlParams = new URLSearchParams(window.location.search);
  const ref = urlParams.get("ref");

  // ❌ Tidak ada ref atau self-ref
  if (!ref || ref === wallet) return;

  // 🔒 Cek apakah wallet ini sudah pernah klaim referral
  const alreadyClaimed = localStorage.getItem(
    `ref_claimed_by_${wallet}`
  );

  if (alreadyClaimed) return;

  // 🔍 Ambil data referrer
  const refData = localStorage.getItem(ref);
  if (!refData) return;

  const parsed = JSON.parse(refData);
  parsed.ref = (parsed.ref || 0) + 500;

  localStorage.setItem(ref, JSON.stringify(parsed));

  // Tandai sudah klaim
  localStorage.setItem(
    `ref_claimed_by_${wallet}`,
    "true"
  );

}, [publicKey]);
  const sol = Number(amount) || 0;
  const base = sol * RATE;
const bonus = base * 0.05;
const bpunch = base + bonus;

  async function buyToken() {
    if (!publicKey) return alert("Connect wallet first");
    if (sol < MIN_SOL) return alert(`Minimum buy is ${MIN_SOL} SOL`);

    const connection = new Connection(RPC);
    const lamports = sol * LAMPORTS_PER_SOL;

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(PRESALE_WALLET),
        lamports
      })
    );

    try {
      const signature = await sendTransaction(transaction, connection);
      alert(`Success!\n\nTX:\n${signature}`);
    } catch {
      alert("Transaction failed");
    }
  }

  return (
    <div className="bg-[#020617] min-h-screen flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-3xl font-bold mb-6">
        Join <span className="text-lime-400">$BPUNCH</span> Presale
      </h1>

      <div className="bg-yellow-400 text-black w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-6">
        🐵
      </div>

      <WalletMultiButton />
      <AirdropDashboard />
      <div className="mt-6 flex flex-col items-center gap-4">
        <input
          type="number"
          placeholder="0.03"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          className="bg-[#020617] border border-slate-800 rounded-lg px-4 py-2 w-64 text-white"
        />

        <div className="text-xl">
          You Receive: {bpunch.toLocaleString()} BPUNCH
        </div>

        <p className="text-sm text-slate-400">
          Minimum purchase: {MIN_SOL} SOL
        </p>

        <button
          onClick={buyToken}
          className="bg-lime-400 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90"
        >
          Buy BPUNCH
        </button>

        {connected && publicKey && (
          <p className="text-xs text-slate-500 break-all max-w-xs mt-4">
            {publicKey.toString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default function PresalePage() {
  const wallets = [new PhantomWalletAdapter()];
  return (
    <ConnectionProvider endpoint={RPC}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <PresaleMain />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}