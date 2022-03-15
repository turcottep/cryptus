// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import CreatorProfile from "../../../../components/profile/creator_profile/creator_profile";
import { profile_props, nft_collection, nft } from "../../../../lib/data_types";
import { mockNextUseRouter } from "../../../../utils/test_util";

describe("<CreatorProfile />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("CreatorProfile renders correctly", () => {
    const collections: nft_collection[] = [
      {
        id: 1,
        address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
        name: "CryptoKitties",
        description: "",
        image_url: "",
        external_url: "",
        market_cap: 0,
        nfts: [
          {
            name: "Savannah R1-R3, Sly R1",
            image_url:
              "https://lh3.googleusercontent.com/j2tpXbSVHCzhtM2betJkxxlug7Y2i7yC9fyPPiJCTIBqxpU4VxsGk7Osw04lt8TetpSOp2uamKE_Ppy1fC_2cr8",
            description:
              "Listen up! Savannah R1-R3, Sly R1 here. I'm here to enjoy licking doorknobs and kickboxing. When my owner isn't watching, I steal their mom jeans and hoard them in my litter box. I'm not sorry. Let's pawty!",
            collection: "CryptoKitties",
            collection_size: null,
            collection_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
            token_id: "492809",
            external_url:
              "https://opensea.io/assets/0x06012c8cf97bead5deae237070f9587f8e7a266d/492809",
            last_sale_price: 0,
            last_sale_symbol: "ETH",
            properties: [
              { name: "mouth", value: "soserious", count: 214676, rarity: 0 },
              { name: "pattern", value: "spangled", count: 74400, rarity: 0 },
              {
                name: "virginity",
                value: "non-virgin",
                count: 980293,
                rarity: 0,
              },
              { name: "fur", value: "selkirk", count: 125552, rarity: 0 },
              {
                name: "eye_colour",
                value: "sapphire",
                count: 99039,
                rarity: 0,
              },
              { name: "accent_colour", value: "icy", count: 111490, rarity: 0 },
              {
                name: "highlight_colour",
                value: "coffee",
                count: 175517,
                rarity: 0,
              },
              {
                name: "cooldown_timer",
                value: "Catatonic (1 week)",
                count: 75674,
                rarity: 0,
              },
              { name: "eye_shape", value: "chronic", count: 93145, rarity: 0 },
              {
                name: "base_colour",
                value: "mauveover",
                count: 146133,
                rarity: 0,
              },
              { name: "generation", value: 0, count: 36557, rarity: 0 },
              { name: "purrstige", value: "pu12", count: 19237, rarity: 0 },
              { name: "secret", value: "se6", count: 13121, rarity: 0 },
            ],
            rarity_rank: null,
          },
          {
            name: "Couple 69 2/2",
            image_url:
              "https://lh3.googleusercontent.com/lklxKijfeWuWTqU9ONM4U8T7vUXn2wuZYurL6kw-z2MfV82xzWVGzss0DzOTD_4QD2c0r3RQi8ibuK0egAN0Vzyw8w",
            description:
              "G'day. My name is Couple 69 2/2. My favourite colour is green. I like to tell stories, which are often either lawful or vivacious. Are you a magician? Because whenever I look at you, everyone else disappears!",
            collection: "CryptoKitties",
            collection_size: null,
            collection_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
            token_id: "739367",
            external_url:
              "https://opensea.io/assets/0x06012c8cf97bead5deae237070f9587f8e7a266d/739367",
            last_sale_price: 0,
            last_sale_symbol: "ETH",
            properties: [
              {
                name: "virginity",
                value: "non-virgin",
                count: 980293,
                rarity: 0,
              },
              { name: "mouth", value: "grim", count: 116805, rarity: 0 },
              { name: "pattern", value: "leopard", count: 65930, rarity: 0 },
              { name: "generation", value: 0, count: 36557, rarity: 0 },
              {
                name: "accent_colour",
                value: "sandalwood",
                count: 101193,
                rarity: 0,
              },
              {
                name: "base_colour",
                value: "greymatter",
                count: 189267,
                rarity: 0,
              },
              {
                name: "cooldown_timer",
                value: "Catatonic (1 week)",
                count: 75674,
                rarity: 0,
              },
              {
                name: "eye_colour",
                value: "thundergrey",
                count: 96833,
                rarity: 0,
              },
              { name: "eye_shape", value: "chronic", count: 93145, rarity: 0 },
              {
                name: "highlight_colour",
                value: "egyptiankohl",
                count: 104341,
                rarity: 0,
              },
              { name: "fur", value: "ragdoll", count: 173014, rarity: 0 },
            ],
            rarity_rank: null,
          },
          {
            name: "Cyborg+Springcrocus; Caffeine",
            image_url:
              "https://lh3.googleusercontent.com/kPUtxNggeG8gMYaEjGMpRZACIGqR3IF3texGniVTI7lBxk8vz3m3LUM6bENWq1tlHjtKoYjqeGB1Y3yn-Im0sPBR7Sm7Rczxr0zYdw",
            description:
              "G'day. I am Cyborg+Springcrocus; Caffeine. I'm glad you've come. I can safely say that salsa is the greatest thing since sliced bread. Don't even try to convince me otherwise. I can't imagine being with any other breeder now that I've met you!",
            collection: "CryptoKitties",
            collection_size: null,
            collection_address: "0x06012c8cf97bead5deae237070f9587f8e7a266d",
            token_id: "901479",
            external_url:
              "https://opensea.io/assets/0x06012c8cf97bead5deae237070f9587f8e7a266d/901479",
            last_sale_price: 0,
            last_sale_symbol: "ETH",
            properties: [
              { name: "mouth", value: "pouty", count: 287247, rarity: 0 },
              { name: "pattern", value: "rorschach", count: 90037, rarity: 0 },
              { name: "generation", value: 0, count: 36557, rarity: 0 },
              {
                name: "virginity",
                value: "non-virgin",
                count: 980293,
                rarity: 0,
              },
              {
                name: "highlight_colour",
                value: "coffee",
                count: 175517,
                rarity: 0,
              },
              {
                name: "accent_colour",
                value: "frosting",
                count: 86540,
                rarity: 0,
              },
              { name: "eye_shape", value: "wonky", count: 92220, rarity: 0 },
              {
                name: "base_colour",
                value: "brownies",
                count: 51182,
                rarity: 0,
              },
              {
                name: "cooldown_timer",
                value: "Swift (2 min)",
                count: 153623,
                rarity: 0,
              },
              { name: "eye_colour", value: "olive", count: 42178, rarity: 0 },
              { name: "fur", value: "ragdoll", count: 173014, rarity: 0 },
              { name: "purrstige", value: "pu8", count: 18824, rarity: 0 },
              { name: "secret", value: "se14", count: 6867, rarity: 0 },
            ],
            rarity_rank: null,
          },
        ],
      },
      {
        id: 2,
        name: "BlockCities",
        address: "0x2f2d5aa0efdb9ca3c9bb789693d06bebea88792f",
        description: "",
        image_url: "",
        external_url: "",
        market_cap: 0,
        nfts: [
          {
            name: "Building #0521",
            image_url:
              "https://lh3.googleusercontent.com/lAEJYPMx83l-MoxDSBvPs1ME-XGJTp7YvqFHIhk1xezg2ysYz0WFUDgEj3yLrp1wNwNUvaFcuRzzB_pC31NImSVz",
            description: "#0521",
            collection: "BlockCities",
            collection_size: null,
            collection_address: "0x2f2d5aa0efdb9ca3c9bb789693d06bebea88792f",
            token_id: "521",
            external_url:
              "https://opensea.io/assets/0x2f2d5aa0efdb9ca3c9bb789693d06bebea88792f/521",
            last_sale_price: 0,
            last_sale_symbol: "ETH",
            properties: [
              { name: "building", value: "222 Second", count: 129, rarity: 0 },
              { name: "city", value: "San Francisco", count: 378, rarity: 0 },
              { name: "tokenId", value: "521", count: 1, rarity: 0 },
              {
                name: "architect",
                value: "0xc6088d5794f5a568fa3bd70ef5ee2932cd389a33",
                count: 55,
                rarity: 0,
              },
              {
                name: "backgroundColorway",
                value: "blueblue",
                count: 260,
                rarity: 0,
              },
              {
                name: "windowType",
                value: "Glass Curtain",
                count: 1072,
                rarity: 0,
              },
              { name: "width", value: 200, count: 0, rarity: 0 },
              {
                name: "heightClass",
                value: "High Rise",
                count: 1458,
                rarity: 0,
              },
              {
                name: "roofWindowColorway",
                value: "Dark Grey",
                count: 740,
                rarity: 0,
              },
              {
                name: "bodyWindowColorway",
                value: "Dark Grey",
                count: 740,
                rarity: 0,
              },
              {
                name: "rooftopType",
                value: "885 6th Ave",
                count: 312,
                rarity: 0,
              },
              {
                name: "groundFloorType",
                value: "222 Second",
                count: 21,
                rarity: 0,
              },
              {
                name: "groundFloorUse",
                value: "Business",
                count: 989,
                rarity: 0,
              },
              { name: "rooftopUse", value: "Business", count: 1577, rarity: 0 },
              { name: "coreUse", value: "Business", count: 1993, rarity: 0 },
              { name: "height", value: 393, count: 5, rarity: 0 },
              {
                name: "coreType",
                value: "Glass Curtain",
                count: 1072,
                rarity: 0,
              },
              {
                name: "exteriorColorway",
                value: "Light Grey",
                count: 451,
                rarity: 0,
              },
              {
                name: "baseWindowColorway",
                value: "Dark Grey",
                count: 730,
                rarity: 0,
              },
            ],
            rarity_rank: null,
          },
        ],
      },
    ];
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
      user: user,
      collections: collections,
    };

    const tree = renderer.create(<CreatorProfile {...mock_props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
