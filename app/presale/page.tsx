import type { CSSProperties } from "react";
"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

import {
  ConnectionProvider,
  WalletProvider,
  useWallet
} from "@solana/wallet-adapter-react";

import {
  PhantomWalletAdapter
} from "@solana/wallet-adapter-wallets";

import {
  WalletModalProvider
} from "@solana/wallet-adapter-react-ui";

import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL
} from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui")
      .then(mod => mod.WalletMultiButton),
  { ssr:false }
);


// RPC MAINNET
const RPC =
"https://rpc.ankr.com/solana";


// WALLET PRESALE
const PRESALE_WALLET =
"PASTE_WALLET_KAMU_DISINI";


// TOKEN RATE
const RATE =
250000;


// MINIMUM SOL
const MIN_SOL =
0.03;



function PresaleMain(){

  const {
    publicKey,
    sendTransaction,
    connected
  } = useWallet();

  const [amount,setAmount] =
    useState("");


  const connection =
    new Connection(RPC);


  const sol =
    Number(amount) || 0;


  const bpunch =
    sol * RATE;



  async function buyToken(){

    try{

      if(!publicKey){

        alert("Connect wallet first");
        return;

      }


      if(sol < MIN_SOL){

        alert(
          "Minimum buy is "
          + MIN_SOL
          + " SOL"
        );

        return;

      }


      const lamports =
        sol * LAMPORTS_PER_SOL;


      const transaction =
        new Transaction().add(

          SystemProgram.transfer({

            fromPubkey: publicKey,

            toPubkey:
              new PublicKey(
                PRESALE_WALLET
              ),

            lamports

          })

        );


      const signature =
        await sendTransaction(
          transaction,
          connection
        );


      alert(
        "Success!\n\nTX:\n"
        + signature
      );


    }catch(err:any){

      if(
        err.message?.includes(
          "rejected"
        )
      ){

        alert("Cancelled");

      }else{

        alert("Transaction failed");

      }

    }

  }



  return(

    <div style={container}>


      {/* TITLE */}

      <h1 style={title}>
        Join
        <span style={{
          color:"#84CC16"
        }}>
          {" "} $BPUNCH
        </span>
        {" "}Presale
      </h1>



      {/* ICON */}

      <div style={icon}>
        🐵
      </div>



      {/* CONNECT */}

      <WalletMultiButton/>



      {/* INPUT */}

      <div style={box}>

        <label style={label}>
          You Pay (SOL)
        </label>

        <input

          type="number"

          placeholder="0.03"

          value={amount}

          onChange={
            e =>
            setAmount(
              e.target.value
            )
          }

          style={input}

        />

      </div>



      {/* ARROW */}

      <div style={{
        fontSize:"24px",
        margin:"10px"
      }}>
        ↓
      </div>



      {/* RECEIVE */}

      <div style={box}>

        <label style={label}>
          You Receive (BPUNCH)
        </label>

        <input

          value={
            bpunch.toLocaleString()
          }

          readOnly

          style={input}

        />

      </div>



      {/* MIN TEXT */}

      <p style={minText}>
        Minimum purchase:
        {" "}
        {MIN_SOL}
        {" "}SOL
      </p>



      {/* BUY */}

      <button
        onClick={buyToken}
        style={button}
      >
        Buy BPUNCH
      </button>



      {/* WALLET */}

      {connected && publicKey &&(

        <p style={wallet}>
          {publicKey.toString()}
        </p>

      )}



    </div>

  );

}



export default function PresalePage(){

  const wallets=[
    new PhantomWalletAdapter()
  ];

  return(

    <ConnectionProvider endpoint={RPC}>

      <WalletProvider
        wallets={wallets}
        autoConnect
      >

        <WalletModalProvider>

          <PresaleMain/>

        </WalletModalProvider>

      </WalletProvider>

    </ConnectionProvider>

  );

}



/* STYLES */

const container = {
  background: "#020617",
  height: "100vh",
  display: "flex",
  flexDirection: "column" as const,
  justifyContent: "center",
  alignItems: "center",
  color: "white",
};

const title = {
  fontSize: "32px",
  marginBottom: "20px",
};

const icon = {
  background: "#FACC15",
  width: "80px",
  height: "80px",
  borderRadius: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "36px",
  marginBottom: "20px",
};

const box = {
  display: "flex",
  flexDirection: "column" as const,
  marginTop: "10px",
};

const label = {
  color: "#94A3B8",
  marginBottom: "5px",
};

const input = {
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid #1E293B",
  background: "#020617",
  color: "white",
  width: "240px",
  fontSize: "16px",
};

const button = {
  marginTop: "20px",
  padding: "14px 30px",
  background: "#84CC16",
  border: "none",
  borderRadius: "12px",
  fontWeight: "bold",
  fontSize: "16px",
  cursor: "pointer",
};

const wallet = {
  marginTop: "20px",
  fontSize: "11px",
  color: "#64748B",
  maxWidth: "300px",
  wordBreak: "break-all" as const,
};

const minText = {
  marginTop: "10px",
  fontSize: "12px",
  color: "#64748B",
};