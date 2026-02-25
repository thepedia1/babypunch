"use client";

import { useState, useEffect } from "react";
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


// RPC
const RPC =
"https://rpc.ankr.com/solana";


// PRESALE WALLET
const PRESALE_WALLET =
"PASTE_WALLET_KAMU_DISINI";


// TOKEN SETTINGS
const RATE = 150000;

const BONUS_PERCENT = 0.05;

const MIN_SOL = 0.03;


// AIRDROP SETTINGS
const AIRDROP_REWARD = 1000;

const REFERRAL_REWARD = 500;



function PresaleMain(){

  const {
    publicKey,
    sendTransaction,
    connected
  } = useWallet();


  const [amount,setAmount] =
    useState("");


  const [balance,setBalance] =
    useState(0);


  const [referrals,setReferrals] =
    useState(0);


  const connection =
    new Connection(RPC);


  const sol =
    Number(amount) || 0;


  const bpunch =
    sol * RATE;


  const bonus =
    bpunch * BONUS_PERCENT;


  const total =
    bpunch + bonus;



  /*
  LOAD AIRDROP + REFERRAL
  */

  useEffect(()=>{

    if(!publicKey) return;

    const wallet =
      publicKey.toString();


    let data;


    localStorage.removeItem(
  "airdrop_" + wallet
);

const saved =
  localStorage.getItem(
    "airdrop_" + wallet
  );


    if(saved){

      data =
        JSON.parse(saved);

    }
    else{

      data = {

        balance:AIRDROP_REWARD,

        referrals:0,

        referred:false

      };

      localStorage.setItem(
        "airdrop_" + wallet,
        JSON.stringify(data)
      );

    }



    /*
    AUTO DETECT REFERRAL
    */

    const url =
      new URL(window.location.href);

    const ref =
      url.searchParams.get("ref");


    if(
      ref &&
      ref !== wallet &&
      !data.referred
    ){

      const refSaved =
        localStorage.getItem(
          "airdrop_" + ref
        );


      if(refSaved){

        const refData =
          JSON.parse(refSaved);

        refData.balance +=
          REFERRAL_REWARD;

        refData.referrals +=1;


        localStorage.setItem(

          "airdrop_" + ref,

          JSON.stringify(refData)

        );

      }


      data.referred = true;


      localStorage.setItem(

        "airdrop_" + wallet,

        JSON.stringify(data)

      );

    }


    setBalance(data.balance);

    setReferrals(data.referrals);


  },[publicKey]);



  /*
  PRESALE BUY
  */

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


      const transaction =
        new Transaction().add(

          SystemProgram.transfer({

            fromPubkey: publicKey,

            toPubkey:
              new PublicKey(
                PRESALE_WALLET
              ),

            lamports:
              sol *
              LAMPORTS_PER_SOL

          })

        );


      const signature =
        await sendTransaction(
          transaction,
          connection
        );


      await connection.confirmTransaction(signature);



      /*
      SAVE BONUS
      */

      const wallet =
        publicKey.toString();


      const saved =
        localStorage.getItem(
          "airdrop_" + wallet
        );


      let data =
        saved
        ? JSON.parse(saved)
        : {
            balance:AIRDROP_REWARD,
            referrals:0
          };


      data.balance += total;


      localStorage.setItem(

        "airdrop_" + wallet,

        JSON.stringify(data)

      );


      setBalance(data.balance);


      alert(

        "Success!\n\n" +

        "Purchased: "
        + bpunch.toLocaleString()
        + " BPUNCH\n\n" +

        "Bonus: "
        + bonus.toLocaleString()
        + " BPUNCH\n\n" +

        "Total received: "
        + total.toLocaleString()

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



  /*
  COPY INVITE LINK
  */

  function copyInvite(){

    const link =
      window.location.origin +
      "/presale?ref=" +
      publicKey?.toString();


    navigator.clipboard.writeText(link);

    alert("Invite link copied");

  }



  return(

    <div style={container}>


      <h1 style={title}>
        Join
        <span style={{color:"#84CC16"}}>
          {" "} $BPUNCH
        </span>
        {" "}Presale
      </h1>



      <div style={icon}>
        🐵
      </div>



      <WalletMultiButton/>



      {connected && (

        <>

          <div style={airdropBox}>

            Balance

            <br/>

            <b>
              {balance.toLocaleString()}
              {" "}BPUNCH
            </b>

            <br/><br/>

            Referrals:
            {" "}
            {referrals}

          </div>



          <button
            onClick={copyInvite}
            style={inviteBtn}
          >
            Copy Invite Link
          </button>

        </>

      )}



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



      <div style={{
        fontSize:"24px",
        margin:"10px"
      }}>
        ↓
      </div>



      <div style={box}>

        <label style={label}>
          You Receive (BPUNCH)
        </label>

        <input
          value={
            total.toLocaleString()
          }
          readOnly
          style={input}
        />

      </div>



      <p style={minText}>
        Minimum:
        {" "}
        {MIN_SOL}
        {" "}SOL
        <br/>
        Airdrop: 1000 BPUNCH
        <br/>
        Referral: 500 BPUNCH
        <br/>
        Presale bonus: 5%
      </p>



      <button
        onClick={buyToken}
        style={button}
      >
        Buy BPUNCH
      </button>



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

const container={

  background:"#020617",

  height:"100vh",

  display:"flex",

  flexDirection:"column",

  justifyContent:"center",

  alignItems:"center",

  color:"white"

};


const title={

  fontSize:"32px",

  marginBottom:"20px"

};


const icon={

  background:"#FACC15",

  width:"80px",

  height:"80px",

  borderRadius:"20px",

  display:"flex",

  justifyContent:"center",

  alignItems:"center",

  fontSize:"36px",

  marginBottom:"20px"

};


const airdropBox={

  marginTop:"15px",

  padding:"15px",

  border:"1px solid #1E293B",

  borderRadius:"10px",

  textAlign:"center"

};


const inviteBtn={

  marginTop:"10px",

  padding:"10px 20px",

  background:"#84CC16",

  border:"none",

  borderRadius:"10px",

  fontWeight:"bold"

};


const box={

  display:"flex",

  flexDirection:"column",

  marginTop:"10px"

};


const label={

  color:"#94A3B8"

};


const input={

  padding:"12px",

  borderRadius:"10px",

  border:"1px solid #1E293B",

  background:"#020617",

  color:"white",

  width:"240px"

};


const button={

  marginTop:"20px",

  padding:"14px 30px",

  background:"#84CC16",

  border:"none",

  borderRadius:"12px",

  fontWeight:"bold"

};


const minText={

  marginTop:"10px",

  fontSize:"12px",

  color:"#64748B",

  textAlign:"center"

};