import { profile_props } from "./data_types";
import getUserByUsername from "./getUserByUsername";
import get_nfts_for_user from "./get_nfts_for_user";
import calculate_networth from "./networth";
import sortNftsIntoCollections from "./sort_nfts_into_collections";
import update_nfts_for_user from "./update_nfts_for_user";

export default async function get_profile_props(
  user_name: string
): Promise<{ props: profile_props }> {
  try {
    const user = await getUserByUsername(user_name, true);
    if (!user) {
      throw new Error("User not found");
    }
    let nfts = await update_nfts_for_user(
      user_name,
      user.wallets[0].address,
      user.userId
    );
    if (!nfts) {
      nfts = await get_nfts_for_user(user_name);
    }

    const nfts_collections = sortNftsIntoCollections(
      nfts
      // user.collections_filter
    );

    const networth = await calculate_networth(nfts_collections);

    // console.log("networth", networth);
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
