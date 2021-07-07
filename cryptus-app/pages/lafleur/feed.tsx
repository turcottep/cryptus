import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import Feed from "../../components/Feed";
import { FetchNfts } from "../../components/fetchNfts";
import NavbarProfile from "../../components/NavbarProfile";

export default function post(props) {
  const router = useRouter();

  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <NavbarProfile />
        <div className="pt-24">
          <Feed title="Lafleur">
            <ul>
              {props.data.assets.map((pokeman, index) => (
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
                          src={`../NFT${index + 1}.svg`}
                        />
                      </div>
                      <div className="flex flex-col text-gray-700 p-2">
                        <div className="flex justify-between items-center">
                          <div className="flex">
                            <span className="text-xl font-bold pr-6">
                              {pokeman.name}
                            </span>
                            <div className="flex items-center">
                              <img
                                className="h-4 w-4 pr-1"
                                draggable="false"
                                src="../eth_logo.png"
                              />
                              <span className="align-middle">4 ETH</span>
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
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </div>
                        <span className="py-1 font-bold text-gray-500">
                          VeeFriends
                        </span>
                        <span>
                          This token is verifiable for admission to VeeCon 2022,
                          2023, 2024 This token is a collectible that lives on
                          the Ethereum blockchain A Gary Vaynerchuk NFT project
                          around meaningful intellectual property and an
                          extraordinary community.
                        </span>
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

export async function getStaticProps(context) {
  console.log("...://");

  const owner = "0x0da2f3401296427d302326cdf208b79f83abc995";
  try {
    const props = await FetchNfts(owner);
    return props;
  } catch (err) {
    console.log("riiip");
    console.error(err);
  }
}