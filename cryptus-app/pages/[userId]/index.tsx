import { useRouter } from "next/router";

import React from "react";
import Mosaic from "../../components/Mosaic";
import NavbarProfile from "../../components/NavbarProfile";
import Profile from "../../components/Profile";
import getUserByUsername from "../../lib/getUserByUsername";

export default function post(props) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <div className="bg-instagram">
      <main className="sm:max-w-lg mx-auto">
        <div className="flex flex-col items-center">
          <NavbarProfile name={username} />
          <div className="mt-24 w-full">
            <Profile {...props} />
          </div>
          <Mosaic {...props} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const username = context.query.userId;
  const user = await getUserByUsername(username);

  try {
    var data;
    for (const wallet of user.wallets) {
      const res = await fetch(wallet.external_url);
      data = await res.json();
    }
    return {
      props: { assets: data.assets, user: user },
    };
  } catch (err) {
    console.error(err);
  }
  return null;
}
