"use client";

import { useEffect, useState } from "react";

function randomWallet() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789";
  let str = "";
  for (let i = 0; i < 32; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str.slice(0, 4) + "..." + str.slice(-4);
}

function randomAmount() {
  return (Math.random() * 2 + 0.05).toFixed(2);
}

export default function LiveBuyTicker() {
  const [buys, setBuys] = useState<string[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newBuy = `🔥 ${randomAmount()} SOL purchased by ${randomWallet()}`;

      setBuys((prev) => {
        const updated = [newBuy, ...prev];
        return updated.slice(0, 5);
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 w-full max-w-md">
      {buys.map((buy, i) => (
        <div
          key={i}
          className="bg-slate-900 border border-slate-800 text-sm p-3 rounded-lg mb-2 text-lime-400"
        >
          {buy}
        </div>
      ))}
    </div>
  );
}