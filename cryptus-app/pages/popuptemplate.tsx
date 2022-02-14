import React from "react";

//external exports
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

import FeatureIamTesting from "../components/template/pagetemplate/pagetemplate";
import NFTDetails from "../components/wallet_viewer/nft_details/nft_details";
import { nft } from "../lib/data_types";

export default function Home() {
  return (
    <div className="">
      <title>Public Wallet</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <meta name="theme-color" content="" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
        rel="stylesheet"
      />

      <main>
        <AnimatePresence>
          <motion.div
            key="modal"
            initial={{ y: "100vh", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
            exit={{ opacity: 0 }}
          >
            <FeatureIamTesting />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
