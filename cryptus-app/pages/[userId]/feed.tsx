import { GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import Feed from "../../components/viewer/Feed";
import NavbarProfile from "../../components/navbars/navbar_profile/navbar_profile";
import getUserByUsername from "../../lib/getUserByUsername";
import get_nfts_for_user from "../../lib/get_nfts_for_user";
import update_nfts_for_user from "../../lib/update_nfts_for_user";


export interface profile_props {
  user: any;
  assets: assets[];
}

export interface assets {
  image_url: string;
  name: string;
  last_sale_price: number;
  last_sale_symbol: string;
  collection: string;
  description: string;
}

export default function post(props: profile_props) {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <NavbarProfile name={userId} />
        <div className="pt-24">
          <Feed title={userId}>
            <ul>
              {props.assets ? props.assets.map((asset, index) => (
                <li key={index}>
                  <a
                    id={`NFT${index + 1}`}
                    className="pt-24 -mt-24 h-full flex justify-between flex-col"
                  >
                    <div className="">
                      <div className="">
                        <img
                          className="w-full flex-1 min-w-0 min-h-0"
                          draggable="false"
                          src={asset.image_url}
                        />
                      </div>
                      <div className="flex flex-col text-gray-700 p-2">
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            <div className="flex flex-col">
                              <span className="text-xl font-bold pr-6">
                                {asset.name}
                              </span>
                            </div>

                            <div className="font-bold flex items-center">
                              <img
                                className="h-4 w-4 pr-1"
                                draggable="false"
                                src="../eth_logo.png"
                              />
                              <span className="align-middle">
                                {asset.last_sale_price}
                              </span>
                              <span>&nbsp;</span>
                              <span className="align-middle">
                                {asset.last_sale_symbol}
                              </span>
                            </div>
                          </div>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#999999"
                            id="heart-emoji"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                        <span className="py-1 font-bold text-gray-500">
                          {asset.collection}
                        </span>
                        <span>{asset.description}</span>
                      </div>
                    </div>
                  </a>
                </li>
              )) : <div className="flex-col w-full mx-auto text-center h-32 justify-around my-auto">
                <div className="mx-auto w-full text-gray-600 pt-12">
                  This user has no NFTs ://
                </div>
              </div>}
            </ul>
          </Feed>
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
    let nfts = await update_nfts_for_user(username, user.wallets[0].address, user.userId) as assets[];
    if (!nfts) {
      nfts =
        await get_nfts_for_user(username);
    }
    nfts.sort((a, b) => {
      return b.last_sale_price - a.last_sale_price;
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
