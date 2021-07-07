import { useRouter } from "next/router";
import React from "react";
import Mosaic from "../../components/Mosaic";
import NavbarProfile from "../../components/NavbarProfile";
import Profile from "../../components/Profile";

export default function post(props) {
  const router = useRouter();

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
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
  const url =
    "https://api.opensea.io/api/v1/assets?owner=" +
    owner +
    "&order_direction=asc&offset=0&limit=50";

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      props: { data },
    };
  } catch (err) {
    console.error(err);
  }
}
