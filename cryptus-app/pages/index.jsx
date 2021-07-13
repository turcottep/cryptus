import Head from "next/head";
import "tailwindcss/tailwind.css";
import LandingPage from "../components/LandingPage";
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";

export default function Home() {
  const [session, loading] = useSession();

  return (
    <div className="container">
      <Head>
        <title>Public Wallet</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable='yes', maximum-scale=5.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="theme-color" content="#FFFDF5" />
        <title>Next.js PWA Example</title>
        <meta name="keywords" content="Keywords" />
        <meta name="description" content="Description" />

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
          rel="stylesheet"
          href="https://unpkg.com/tailwindcss/dist/tailwind.min.css"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
          rel="stylesheet"
        />
      </Head>

      <main className="">
        {!session && <></>}
        {session && (
          <>
            <div> Logged In As {session.user.name}</div>
          </>
        )}
        <LandingPage />
      </main>
    </div>
  );
}
