import { GetStaticPaths } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
import Feed from "../../components/Feed";
import NavbarProfile from "../../components/NavbarProfile";
import getUserByUsername from "../../lib/getUserByUsername";

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <NavbarProfile name={userId} />
        <div className="pt-24">
          <Feed title={userId}>
            <ul>
              {props.assets.map((asset, index) => (
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
                                {asset.last_sale
                                  ? String(
                                      asset.last_sale.total_price * 10 ** -18
                                    ).substring(0, 4)
                                  : null}
                              </span>
                              <span>&nbsp;</span>
                              <span className="align-middle">
                                {asset.last_sale
                                  ? asset.last_sale.payment_token.symbol
                                  : null}
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
                          {asset.collection.name}
                        </span>
                        <span>{asset.collection.description}</span>
                      </div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Feed>
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const username = context.query.userId;
  console.log("getServerSide\n\n\n\n\n\n\n username=", username);
  const user = await getUserByUsername(username)

  try {
    var data
    for await(const wallet of user.wallets){
      const res = await fetch(wallet.external_url);
      data = await res.json();
    }
    return {
      props: { assets: data.assets, user: user },
    };
  } catch (err) {
    console.error(err);
  }
  console.log("RIIIPPPPP");
  return null
}
