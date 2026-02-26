"use client";

import dynamic from "next/dynamic";

import {
  ConnectionProvider,
  WalletProvider
} from "@solana/wallet-adapter-react";

import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

import "@solana/wallet-adapter-react-ui/styles.css";

const RPC =
"https://rpc.ankr.com/solana";

export default function Providers({

  children

}:{

  children:React.ReactNode

}){

  const wallets = [

    new PhantomWalletAdapter()

  ];

  return(

    <ConnectionProvider endpoint={RPC}>

      <WalletProvider wallets={wallets} autoConnect>

        <WalletModalProvider>

          {children}

        </WalletModalProvider>

      </WalletProvider>

    </ConnectionProvider>

  );

}