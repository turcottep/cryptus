import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import WalletManager from "../components/basic/wallet_manager/wallet_manager";
import { nft, profile_props } from "../lib/data_types";
import getMockProps from "../lib/get_mock_props";
import get_profile_props from "../lib/get_profile_props";

export default function Home({ data }) {
  const props_empty = {
    collections: [
      {
        name: "",
        description: "",
        image_url: "",
        external_url: "",
        market_cap: 0,
        nfts: [
          {
            name: "",
            image_url: "",
            description: "",
            collection: "",
            collection_size: null,
            collection_address: "",
            token_id: "",
            external_url: "",
            last_sale_price: 0,
            last_sale_symbol: "ETH",
            rarity_rank: null,
          },
        ],
      },
    ],
    user: { id: "", email: "", username: "", displayName: "", wallets: [] },
  };

  const [session, status] = useSession();
  const username = session?.user?.name;

  const [prop, setProp] = useState<any | null>(props_empty);

  useEffect(() => {
    async function getProps() {
      const returningProps = await get_profile_props(username);
      setProp(returningProps.props);
    }
    if (username) {
      getProps();
    }
  }, [username]);
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
        <WalletManager user={prop.user} />
      </main>
    </div>
  );
}
