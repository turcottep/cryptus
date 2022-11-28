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
  let user = await getUserByUsername(user_name, true);

  if (!user) {
    throw new Error("User not found");
  }

  try {
    let nfts = [];
    let nfts_ordered = [];
    const wallet = user.wallets[0];
    let collections_in_wallet = [];
    collections_in_wallet = user.collections_address;
    if (collections_in_wallet.length === 0) {
      collections_in_wallet = await get_collections_in_wallet(wallet.address);
      let addresses = [];
      for (var collection of collections_in_wallet) {
        if (collection.primary_asset_contracts[0]) {
          addresses.push(collection.primary_asset_contracts[0].address);
        }
      }
      user = await add_collections_to_user(addresses, user.username);
      collections_in_wallet = user.collections_address;
      console.log("ALL0", collections_in_wallet);
    }

    if (nbColToFillPage > 50) nbColToFillPage = 50;
    if (nbColToFillPage > collections_in_wallet.length)
      nbColToFillPage = collections_in_wallet.length;

    let nfts_per_wallet = await get_nfts_for_wallet(
      wallet.address,
      collections_in_wallet.slice(0, nbColToFillPage)
    );
    nfts.push(...nfts_per_wallet);

    if (nfts.length == 0) {
      console.log("getting nft from our database");
      nfts = await get_nfts_for_user(user_name);
    } else {
      console.log("saving nfts to our database");
      save_nfts_to_user(user, nfts);
    }

    const nfts_collections = sortNftsIntoCollections(
      nfts
      // user.collections_filter
    );

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
          profile_image_url: "./icons/icon-192x192.png",
        },
      },
    };
  }
}
