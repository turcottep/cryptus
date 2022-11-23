import { profile_props } from "./data_types";
import getUserByUsername from "./get_user_by_username";
import get_nfts_for_user from "./get_nfts_for_user";
import calculate_networth from "./networth";
import sortNftsIntoCollections from "./sort_nfts_into_collections";
import get_nfts_for_wallet from "./get_nfts_for_wallet";
import save_nfts_to_user from "./save_nfts_to_user";

export default async function get_profile_props(
  user_name: string
): Promise<{ props: profile_props }> {
  const user = await getUserByUsername(user_name, true);

  if (!user) {
    throw new Error("User not found");
  }

  try {
    let nfts = [];

    for (let i = 0; i < user.wallets.length; i++) {
      const wallet = user.wallets[i];

      let nfts_per_wallet = await get_nfts_for_wallet(wallet.address);
      nfts.push(...nfts_per_wallet);
    }

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

    // const networth = 0; //await calculate_networth(nfts_collections);

    // user.networth = networth;

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
          profile_image_url: "./icons/icon-192x192.png",
        },
      },
    };
  }
}
