"use client";

import {

  useWallet

} from "@solana/wallet-adapter-react";

import dynamic from "next/dynamic";

const WalletMultiButton = dynamic(

  () => import(

    "@solana/wallet-adapter-react-ui"

  ).then(

    mod => mod.WalletMultiButton

  ),

  {

    ssr:false

  }

);

export default function PresalePage(){

  const {

    publicKey

  } = useWallet();

  return(

    <div style={{

      background:"#020617",

      height:"100vh",

      display:"flex",

      flexDirection:"column",

      justifyContent:"center",

      alignItems:"center",

      color:"white"

    }}>

      <h1>

        Join $BPUNCH Presale

      </h1>

      <WalletMultiButton/>

      {

        publicKey && (

          <p>

            {publicKey.toString()}

          </p>

        )

      }

    </div>

  );

}