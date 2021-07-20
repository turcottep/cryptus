import { useRouter } from "next/router";

import React from "react";
import Mosaic from "../../components/Mosaic";
import NavbarProfile from "../../components/NavbarProfile";
import Profile from "../../components/Profile";
import { getStaticProps } from "../lafleur/feed";

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;
  const user = getUser(userId)
  const newProps = { assets: props.data.assets, user: user };

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <NavbarProfile name={userId} />
          <div className="mt-24">
            <Profile {...newProps}/>
          </div>
          <Mosaic {...newProps} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { userId } = context.query;
  const user = await getUser(userId)
  console.log(user)
  const wallet = "0x0d7c9db889858b9f6954608e36199104dd530da0";
  const url =
    "https://api.opensea.io/api/v1/assets?owner=" +
    wallet +
    "&order_direction=asc&offset=0&limit=50";

  try {
    var data
    for await(const wallet of user.wallets){
      const res = await fetch(wallet.external_url);
      data = await res.json();
    }
    

    return {
      props: { data },
    };
  } catch (err) {
    console.error(err);
  }
}


async function getUser(userId) {
  const res = await fetch(
    "http://localhost:3000/api/users/" + userId,
    {
      method: "GET",
      body: JSON.stringify(userId),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
}