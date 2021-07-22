import Head from "next/head";
import "tailwindcss/tailwind.css";
import LandingPage from "../components/LandingPage";
import React, { useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import router from "next/router";

export default function Home() {
  const [session, loading] = useSession();
  useEffect(() => {
    if (session) router.push(`/${session.user.name}`);
  }, [session]);

  return (
    <div className="bg-coquille">
      <Head>
        <title>Public Wallet</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <meta name="description" content="" />
        <meta name="keywords" content="" />
        <meta name="author" content="" />
        <meta name="theme-color" content="" />
        <meta
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          name="viewport"
        />

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
        {session && <div>Logged in as {session.user.name}</div>}
        <LandingPage />
      </main>
    </div>
  );
}
