import { useRouter } from "next/router";
import React from "react";
import { FetchNfts } from "../../components/fetchNfts";
import Mosaic from "../../components/Mosaic";
import NavbarProfile from "../../components/NavbarProfile";
import Profile from "../../components/Profile";

export default function post(props) {
  const router = useRouter();

  // const { Mosaic, pageProps } = props;
  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col items-center">
          <NavbarProfile />
          <div className="mt-24">
            <Profile />
          </div>
          <Mosaic {...props.data} />
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const owner = "0x0da2f3401296427d302326cdf208b79f83abc995";
  try {
    const props = await FetchNfts(owner);
    return props;
  } catch (err) {
    console.error(err);
  }
}
