import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/client";
import router from "next/router";

import LandingPage from "../components/landing_page/landing_page";

export default function Home() {
  const [session, loading] = useSession();
  // useEffect(() => {
  //   if (session) router.push(`/${session.user.name}`);
  // }, [session]);

  return (
    <div className="bg-coquille">
      <Head>
        <title>Public Wallet</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable='yes', maximum-scale=5.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Esiest way to track your NFTs. 
          The new way to check up on your networth in a matter of seconds. 
          Share your holdings with the ones who matter the most."
        />
        <meta
          name="keywords"
          content="NFT Market Overview
          ETH
          ECR-
          Eutereum wallet
          NFT Market Price
          NFT Market tracker
          NFT wallet viewer
          metamask
          Show NFT
          app for nft
          check my nft
          PublicWallet 
          public wallet
          NFT Viewer
          NFT wallet
          Blockchain wallet
          profile links
          NFT links
          NFT marketplace
          
          metamask public address
          public wallet address
          public crypto wallet
          gary vee public wallet
          wallet public key
          crypto wallet public address
          public wallet address metamask
          "
        />
        <meta name="author" content="CryptUS!" />
        <meta name="theme-color" content="#FFFDF5" />

        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          name="viewport"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
          rel="stylesheet"
        />
      </Head>

      <main>
        {/* {session && <div>Logged in as {session.user.name}</div>} */}
        <LandingPage />
      </main>
    </div>
  );
}
