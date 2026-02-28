"use client";

import AirdropDashboard from "@/components/AirdropDashboard";
import { useState, useEffect } from "react";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
  useConnection
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
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

const RPC = "https://api.mainnet-beta.solana.com";
const PRESALE_WALLET = "FntakqGLjJXXJy1GRRozbUrUiwyeA52dhbe7CmUanc1";
const RATE = 250000;
const MIN_SOL = 0.03;

function PresaleMain() {
  const { publicKey, sendTransaction, connected } = useWallet();
  const { connection } = useConnection();
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [txSig, setTxSig] = useState<string | null>(null);
  console.log("Wallet:", publicKey);
  console.log("sendTransaction:", sendTransaction);

  const sol = Number(amount) || 0;
  const base = sol * RATE;
  const bonus = base * 0.05;
  const bpunch = base + bonus;

async function buyToken() {
console.log("CLICKED BUY");
console.log("PUBLIC KEY:", publicKey);
  if (!publicKey) {
    alert("Connect wallet first");
    return;
  }

  if (sol < MIN_SOL) {
    alert(`Minimum buy is ${MIN_SOL} SOL`);
    return;
  }

  try {

    setLoading(true);

    const lamports = sol * LAMPORTS_PER_SOL;

    const transaction = new Transaction();

    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey(PRESALE_WALLET),
        lamports
      })
    );

    transaction.feePayer = publicKey;

    const latestBlockhash =
      await connection.getLatestBlockhash();

    transaction.recentBlockhash =
      latestBlockhash.blockhash;

    const signed =
      await sendTransaction(transaction, connection);

    await connection.confirmTransaction(signed);

    setTxSig(signed);

  } catch (err) {
    console.log("ERROR:", err);
  } finally {
    setLoading(false);
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
          Includes 5% bonus automatically
        </p>

        <p className="text-sm text-slate-400">
          Minimum purchase: {MIN_SOL} SOL
        </p>

        <button
          onClick={buyToken}
          disabled={loading}
          className="bg-lime-400 text-black px-6 py-3 rounded-xl font-bold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Buy BPUNCH"}
        </button>

        {txSig && (
          <a
            href={`https://solscan.io/tx/${txSig}`}
            target="_blank"
            className="text-lime-400 text-sm mt-2 underline"
          >
            View Transaction
          </a>
        )}

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