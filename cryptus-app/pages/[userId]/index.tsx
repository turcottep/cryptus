import { useRouter } from "next/router";

import React from "react";
import Mosaic from "../../components/viewer/Mosaic";
import NavbarProfile from "../../components/navbars/navbar_profile/navbar_profile";
import Profile from "../../components/profile/profile";
import getUserByUsername from "../../lib/getUserByUsername";
import update_nfts_for_user from "../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../lib/get_nfts_for_user";

import Profile_wallet_viewer from "../../components/wallet_viewer/profile_wallet_viewer/profile_wallet_viewer"
import { nft } from "../../lib/data_types"

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;
  const username = userId

  const mock_nft = {
    id: 123,
    collection: "Bored Ape Yacht Club",
    name: "BAYC #123",
    description: "BAYC #123",
    external_url: "https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/123",
    image_url: "https://lh3.googleusercontent.com/ghH08YcdEkukd04RDrn3zAPyFAYpkUSnSoNBZjaeP-LTx6r_v9i6vDaJlbj9a2pbhfPcIi0bOOXIdoFmzrGr9aQcYS6X4XNxFWVJqw=s0",
    properties: '[{ "name": "Background", "value": "New Punk Blue", "rarity": 0.1232 }, { "name": "Clothes", "value": "Black Holes T", "rarity": 0.0205 }, { "name": "Eyes", "value": "Coins", "rarity": 0.0479 }, { "name": "Hat", "value": "Spinner Hat", "rarity": 0.0181 }, { "name": "Fur", "value": "White", "rarity": 0.0397 }, { "name": "Mouth", "value": "Bored Cigar", "rarity": 0.0121 }]',
    last_sale_price: 0,
    last_sale_symbol: "ETH",
  } as nft

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <NavbarProfile name={username} />
          {props.user ? (
            <div className="mt-24 w-full">
              <div className="">
                <Profile {...props} />
              </div>
              <Profile_wallet_viewer nft={mock_nft}/>
            </div>
          ) : (
            <div className="flex flex-col items-center justified-center text-black ">
              User Not Found
            </div>
          )}
        </div>
      </main>
    </div>
  );
}


export async function getServerSideProps(context) {
  const username = context.query.userId;
  const user = await getUserByUsername(username, true);
  if (!user) {
    return {
      props: {
        assets: [],
        user: null,
      },
    };
  }
  let res;
  try {
    let nfts = await update_nfts_for_user(username, user.wallets[0].address, user.userId);
    if (!nfts) {
      nfts =
        await get_nfts_for_user(username);
    }
    nfts.sort((a, b) => {
      return b.collection - a.collection;
    });
    // console.log("nfts===", nfts);
    return {
      props: { assets: nfts, user },
    };


  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("respons = ", res);
    console.log("DEEZ");

    return {
      props: { assets: null, user: user },
    };
  }
  console.log("no data");
  return null;
}
