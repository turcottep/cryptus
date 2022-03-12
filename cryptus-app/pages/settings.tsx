import React from "react";
import Settings from "../components/settings/settings";
import { nft, profile_props } from "../lib/data_types";
import getMockProps from "../lib/get_mock_props";

export default function Home({ data }) {
  const mock_props = getMockProps() as profile_props;
  const props = mock_props.user
  console.log(props)
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
        <Settings user = {props}/>
      </main>
    </div>
  );
}
