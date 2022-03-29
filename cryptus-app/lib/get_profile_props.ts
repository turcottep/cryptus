import { profile_props } from "./data_types";
import getUserByUsername from "./get_user_by_username";
import get_nfts_for_user from "./get_nfts_for_user";
import calculate_networth from "./networth";
import sortNftsIntoCollections from "./sort_nfts_into_collections";
import update_nfts_for_user from "./update_nfts_for_user";

export default async function get_profile_props(
  user_name: string
): Promise<{ props: profile_props }> {
  const user = await getUserByUsername(user_name, true);

  if (!user) {
    return {
      props: {
        collections: null,
        user: null,
      },
    };
  }

  try {
    let nfts = [];
    user.wallets.forEach(async (wallet) => {
      let nfts_per_wallet = await update_nfts_for_user(
        user_name,
        wallet.address,
        user.userId
      );
      nfts.push(nfts_per_wallet);
    });

    if (nfts.length === 0) {
      console.log("getting nft from our database");
      nfts = await get_nfts_for_user(user_name);
    }

    const nfts_collections = sortNftsIntoCollections(
      nfts
      // user.collections_filter
    );

    const networth = await calculate_networth(nfts_collections);

    user.networth = networth;

    return {
      props: { collections: nfts_collections, user: user },
    };
  } catch (error) {
    console.log("error in get_profile_props", error);

    return {
      props: {
        collections: [],
        user: { address: "", username: "", description: "", networth: 0 },
      },
    };
  }
}
