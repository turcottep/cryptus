import { profile_props } from "./data_types";
import getUserByUsername from "./get_user_by_username";
import get_nfts_for_user from "./get_nfts_for_user";
import calculate_networth from "./networth";
import sortNftsIntoCollections from "./sort_nfts_into_collections";
import get_nfts_for_wallet from "./get_nfts_for_wallet";
import save_nfts_to_user from "./save_nfts_to_user";
import { time } from "console";
import get_collections_in_wallet from "./get_collections_in_wallet";
import add_collections_to_user from "./add_collections_to_user";

export default async function get_profile_props(
  user_name: string,
  nbColToFillPage: number
): Promise<{ props: profile_props }> {
  try {
    let user = await getUserByUsername(user_name, true, true);

    console.log("get_profile_props, user: ", user);

    // throw new Error("test");

    if (!user) {
      throw new Error("User not found");
    }

    let nfts = [];
    let nfts_ordered = [];
    const wallet = user.wallets[0];
    let collections_in_wallet = [];
    collections_in_wallet = user.collections_address_list;

    if (user.nfts.length === 0) {
      if (collections_in_wallet.length === 0) {
        console.log(
          "get_profile_props, collections_in_wallet.length === 0, so getting it from opensea"
        );

        collections_in_wallet = await get_collections_in_wallet(wallet.address);

        const addresses = [];
        const slugs = [];
        for (const collection of collections_in_wallet) {
          if (collection.primary_asset_contracts[0]) {
            addresses.push(collection.primary_asset_contracts[0].address);
            slugs.push(collection.slug);
          }
        }

        // const slug_clean = [];
        // const addresses_clean = [];
        // for (let i = 0; i < slugs.length; i++) {
        //   const slug_i = slugs[i];
        //   const address_i = addresses[i];

        //   const res = await fetch(
        //     "https://api.opensea.io/api/v1/collection/" + slug_i + "/stats",
        //     {
        //       headers: {
        //         Accept: "application/json",
        //         "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
        //       },
        //     }
        //   );

        //   const data = await res.json();
        //   // console.log("data", data.);

        //   if (data.stats.floor_price > 0.01 && data.stats.total_volume > 1000) {
        //     slug_clean.push(slug_i);
        //     addresses_clean.push(address_i);
        //     console.log("added", slug_i, address_i);
        //   } else {
        //     console.log(
        //       "won't add collection",
        //       slug_i,
        //       "because of low volume"
        //     );
        //   }

        //   await new Promise((r) => setTimeout(r, 1000));
        // }

        // user = await add_collections_to_user(
        //   addresses_clean,
        //   slug_clean,
        //   user.username
        // );
        collections_in_wallet = user.collections_address_list;
        // console.log("ALL0", collections_in_wallet);
      } else {
        console.log("getting collections from db");
      }

      if (nbColToFillPage > 50) nbColToFillPage = 50;
      if (nbColToFillPage > collections_in_wallet.length)
        nbColToFillPage = collections_in_wallet.length;

      let nfts_per_wallet = await get_nfts_for_wallet(
        wallet.address,
        collections_in_wallet.slice(0, nbColToFillPage)
      );
      nfts.push(...nfts_per_wallet);

      console.log("saving nfts to our database");
      await save_nfts_to_user(user, nfts);
      console.log("saved nfts to our database");
    } else {
      console.log("using nfts from our database");
      console.log("user.nfts", user.nfts);

      nfts = user.nfts.map((nft) => {
        return {
          ...nft,
          properties: JSON.parse(nft.properties),
        };
      });
    }

    const nfts_collections = sortNftsIntoCollections(
      nfts
      // user.collections_filter
    );

    console.log("nfts_collections", nfts_collections);

    const networth = 0; //await calculate_networth(nfts_collections);

    user.networth = networth;

    return {
      props: { collections: nfts_collections, user: user },
    };
  } catch (error) {
    console.log("error in get_profile_props", error);

    return {
      props: {
        collections: [],
        user: {
          address: "",
          username: "",
          description: "",
          networth: 0,
          collections_filter: [],
          collections_list: [],
          collections_address_list: [],
          profile_image_url: "./icons/icon-192x192.png",
        },
      },
    };
  }
}
