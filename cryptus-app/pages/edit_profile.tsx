import React from "react";
import EditProfile from "../components/profile/edit_profile/edit_profile";
import { useSession } from "next-auth/client";
import get_profile_props from "../lib/get_profile_props";
import { profile_props } from "../lib/data_types";

import { mock_wallet } from "../lib/mocks";

export default function EditProfilePage(props) {
  return (
    <div className="">
      <title>Public Wallet</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <meta name="theme-color" content="" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
        rel="stylesheet"
      />

      <main>
        <EditProfile collections={props.collections} user={props.user} />
      </main>
    </div>
  );
}

// I did not figure out how to get the actual data, sorry
export async function getServerSideProps(context) {
  /* const { userId: userName } = context.query;
  const returningProps = get_profile_props(userName);
  return returningProps; */
  return {
    props: {
      user: {
        networth: 1337.69,
        description: "",
        username: "test",
        address: "whatever",
      },
      collections: mock_wallet,
    },
  };
}
