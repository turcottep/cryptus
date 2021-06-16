import { useRouter } from "next/router";
import React from "react";
import Feed from "../../components/Feed";
import NavbarProfile from "../../components/NavbarProfile";

export default function post(props) {
  const router = useRouter();
  console.log(router, "routes");
  return (
    <div className="bg-instagram">
      <main className="xl:max-w-xl">
        <div className="flex flex-col">
          <NavbarProfile />
          <div className="mt-14">
            <Feed />
          </div>
        </div>
      </main>
    </div>
  );
}
