import { useRouter } from "next/router";
import React from "react";
import Mosaic from "../../components/Mosaic";
import NavbarProfile from "../../components/NavbarProfile";
import Profile from "../../components/Profile";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <NavbarProfile />
          <div className="mt-14">
            <Profile />
          </div>
          <Mosaic />
        </div>
      </main>
    </div>
  );
}
