import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";

import { nft_collection, profile_props } from "../../../lib/data_types";
import CollectionDetails from "../../../components/wallet_viewer/collection_details/collection_details";
import AnimatedDiv from "../../../components/utils/animated_div";
import get_profile_props from "../../../lib/get_profile_props";
import { get_clean_name } from "../../../lib/get_name_without_spaces";

export default function CollectionDetailsPage(props: {
  user;
  collection: nft_collection;
}) {
  const { collection, user } = props;

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  return (
    <AnimatedDiv>
      <CollectionDetails collection={collection} isMobile={isMobile} />
    </AnimatedDiv>
  );
}

export async function getServerSideProps(context) {
  const { userId: userName, collectionId: collectionName } = context.query;
  const profile_props = await get_profile_props(userName);

  try {
    const goodcollection = profile_props.props.collections.find(
      (coll) => collectionName == get_clean_name(coll.name)
    );

    const returningProps = {
      props: {
        user: profile_props.props.user,
        collection: goodcollection,
      },
    };

    return returningProps;
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("respons = ", err);
    console.log("DEEZ");

    return {
      props: { assets: null },
    };
  }
}
