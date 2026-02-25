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

import "@solana/wallet-adapter-react-ui/styles.css";


const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui")
      .then(mod => mod.WalletMultiButton),
  { ssr:false }
);


// MAINNET RPC
const RPC =
"https://rpc.ankr.com/solana";



function Main(){

  const {
    publicKey,
    signMessage,
    connected
  } = useWallet();


  const [verified,setVerified] =
    useState(false);


  const [showPresale,setShowPresale] =
    useState(false);


  const wallet =
    publicKey?.toString() || "";



  async function verifyWallet(){

    try{

      if(!publicKey)
        return;


      const message =
        new TextEncoder()
        .encode(
          "Verify BabyPunch Wallet"
        );


      await signMessage?.(message);


      setVerified(true);

      setShowPresale(true);


    }catch{}

  }



  function copyInvite(){

    if(!wallet) return;


    const link =
      window.location.origin
      + "/presale?ref="
      + wallet;


    navigator.clipboard
      .writeText(link);


    alert("Invite link copied");

  }



  return(

    <div style={container}>


      {/* LOGO */}

      <div style={logo}>
        🐵
      </div>



      {/* TITLE */}

      <h1 style={title}>
        BabyPunch
      </h1>



      {/* CONNECT */}

      <WalletMultiButton/>



      {/* VERIFY */}

      {connected && !verified && (

        <button
          onClick={verifyWallet}
          style={button}
        >
          Verify Wallet
        </button>

      )}



      {/* INVITE */}

      {verified && (

        <button
          onClick={copyInvite}
          style={button}
        >
          Copy Invite Link
        </button>

      )}



      {/* MAIN MENU */}

      <div style={menu}>


        <a href="/presale"
          style={menuButton}
        >
          Join Presale
        </a>


        <a href="/tokenomics"
          style={menuButton}
        >
          View Tokenomics
        </a>


        <a href="/vesting"
          style={menuButton}
        >
          Check Vesting
        </a>


      </div>



      {/* POPUP */}

      {showPresale && (

        <div style={overlay}>

          <div style={modal}>


            <div style={modalLogo}>
              🐵
            </div>


            <h2>
              Join $BPUNCH Presale
            </h2>


            <button
              style={menuButton}
              onClick={()=>window.location.href="/presale"}
            >
              Go to Presale
            </button>


            <p
              style={close}
              onClick={()=>setShowPresale(false)}
            >
              Close
            </p>


          </div>

        </div>

      )}



    </div>

  );

}



export default function Home(){

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


          <Main/>


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


const logo={

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


const title={

  fontSize:"32px",

  marginBottom:"20px"

};


const button={

  marginTop:"10px",

  padding:"12px 20px",

  background:"#84CC16",

  border:"none",

  borderRadius:"10px",

  fontWeight:"bold"

};


const menu={

  display:"flex",

  flexDirection:"column",

  gap:"10px",

  marginTop:"20px"

};


const menuButton={

  padding:"12px 20px",

  background:"#84CC16",

  borderRadius:"10px",

  color:"black",

  textDecoration:"none",

  fontWeight:"bold",

  textAlign:"center",

  width:"200px"

};


const overlay={

  position:"fixed",

  top:0,

  left:0,

  width:"100%",

  height:"100%",

  background:"rgba(0,0,0,0.6)",

  display:"flex",

  justifyContent:"center",

  alignItems:"center"

};


const modal={

  background:"#020617",

  padding:"30px",

  borderRadius:"12px",

  textAlign:"center"

};


const modalLogo={

  background:"#FACC15",

  width:"60px",

  height:"60px",

  borderRadius:"15px",

  display:"flex",

  justifyContent:"center",

  alignItems:"center",

  fontSize:"26px",

  margin:"0 auto 10px auto"

};


const close={

  marginTop:"10px",

  color:"#94A3B8",

  cursor:"pointer"

};