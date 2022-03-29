import React from "react";
import renderer from "react-test-renderer";
import { profile_props, nft_collection } from "../../../../../lib/data_types";
import CreatorProfileInfos from "../../../../../components/profile/creator_profile/creator_profile_infos/creator_profile_infos";
import { mock_collection } from "../../../../../lib/mocks";

it("CreatorProfileInfos renders correctly", () => {
  const collections: nft_collection[] = [];
  const user = {
    networth: 420,
    description: "Here is a description",
    username: "A username",
    address: "An address",
  };
  const old_user = {
    id: "710e552b-2881-42de-afc5-4fd4d9ea698f",
    email: "turcotte@usherbrooke.ca",
    username: "turcotte",
    displayName: "Turcotte",
    nfts_order: [],
    description: "Je vais a MTL pour chercher un bike",
    views: 6000,
    likes: 400,
    hash: "4d6da51cf568dd8037650a5ae0fe1c4344cca65361f3096d4b6a926614ab59bc",
    wallets: [
      {
        id: "2df3578a-21fe-451f-9be3-065749899539",
        blockchain_id: "ETH",
        address: "0x0da2f3401296427d302326cdf208b79f83abc995",
        external_url:
          "https://api.opensea.io/api/v1/assets?owner=0x0da2f3401296427d302326cdf208b79f83abc995&order_direction=asc&offset=0&limit=50",
        userId: "710e552b-2881-42de-afc5-4fd4d9ea698f",
      },
    ],
  };
  const mock_props: profile_props = {
    user: {
      networth: 5,
      description: "Whatever",
      username: "Tester",
      address: "test_address",
    },
    collections: [mock_collection],
  };

  const tree = renderer
    .create(<CreatorProfileInfos {...mock_props} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
