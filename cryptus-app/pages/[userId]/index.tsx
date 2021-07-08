import { useRouter } from "next/router";

import React from "react";
import Mosaic from "../../components/Mosaic";
import NavbarProfile from "../../components/NavbarProfile";
import Profile from "../../components/Profile";
import { getStaticProps } from "../lafleur/feed";

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;
  const newProps = { assets: props.data.assets, userId: userId };

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <NavbarProfile name={userId} />
          <div className="mt-24">
            <Profile />
          </div>
          <Mosaic {...newProps} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userId } = context.query;

  const wallet = "0x0d7c9db889858b9f6954608e36199104dd530da0";
  const url =
    "https://api.opensea.io/api/v1/assets?owner=" +
    wallet +
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
