"use client";

import { useEffect, useState } from "react";
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

import "@solana/wallet-adapter-react-ui/styles.css";

const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui")
      .then(mod => mod.WalletMultiButton),
  { ssr:false }
);


const BONUS_CONNECT = 100;
const BONUS_INVITE = 50;



function AirdropMain(){

  const { publicKey } = useWallet();

  const [balance,setBalance] =
    useState(0);

  const [referrals,setReferrals] =
    useState(0);


  const wallet =
    publicKey?.toString() || "";


  const inviteLink =
    wallet
    ? window.location.origin +
      "/airdrop?ref=" + wallet
    : "";


  useEffect(()=>{

    if(!wallet) return;

    const saved =
      localStorage.getItem(
        "airdrop_"+wallet
      );

    if(saved){

      const data =
        JSON.parse(saved);

      setBalance(data.balance);
      setReferrals(data.referrals);

    }
    else{

      const newUser={

        balance:
        BONUS_CONNECT,

        referrals:0

      };

      localStorage.setItem(

        "airdrop_"+wallet,

        JSON.stringify(newUser)

      );

      setBalance(BONUS_CONNECT);

    }


    const url =
      new URL(window.location.href);

    const ref =
      url.searchParams.get("ref");


    if(
      ref &&
      ref !== wallet
    ){

      const refData =
        localStorage.getItem(
          "airdrop_"+ref
        );

      if(refData){

        const parsed =
          JSON.parse(refData);

        parsed.balance +=
          BONUS_INVITE;

        parsed.referrals +=1;

        localStorage.setItem(

          "airdrop_"+ref,

          JSON.stringify(parsed)

        );

      }

    }


  },[wallet]);


  function copy(){

    navigator.clipboard.writeText(
      inviteLink
    );

    alert("Invite link copied");

  }


  return(

    <div style={container}>

      <h1>
        BPUNCH Airdrop
      </h1>

      <WalletMultiButton/>

      {wallet &&(

        <>

          <div style={card}>

            <p>
              Balance
            </p>

            <h2>
              {balance}
              {" "}BPUNCH
            </h2>

          </div>


          <div style={card}>

            <p>
              Referrals
            </p>

            <h2>
              {referrals}
            </h2>

          </div>


          <button
            onClick={copy}
            style={button}
          >
            Copy Invite Link
          </button>

        </>

      )}

    </div>

  );

}



export default function Page(){

  const wallets=[
    new PhantomWalletAdapter()
  ];

  return(

    <ConnectionProvider
      endpoint="https://rpc.ankr.com/solana"
    >

      <WalletProvider
        wallets={wallets}
        autoConnect
      >

        <WalletModalProvider>

          <AirdropMain/>

        </WalletModalProvider>

      </WalletProvider>

    </ConnectionProvider>

  );

}



const container={

  background:"#020617",

  height:"100vh",

  display:"flex",

  flexDirection:"column",

  alignItems:"center",

  justifyContent:"center",

  color:"white"

};


const card={

  background:"#111827",

  padding:"20px",

  margin:"10px",

  borderRadius:"10px",

  textAlign:"center"

};


const button={

  marginTop:"20px",

  padding:"12px 20px",

  background:"#84CC16",

  border:"none",

  borderRadius:"8px",

  fontWeight:"bold"

};