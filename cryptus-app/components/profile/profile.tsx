import React, { useState, useEffect } from "react";
import s from "./profile.module.scss";

import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { nft_collection, profile_props, tabs } from "../../lib/data_types";

import Footer from "../footer/footer";
import ProfileWalletViewer from "../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";
import CreatorHeader from "./creator_profile/creator_header/creator_header";
import MyProfInfos from "./creator_profile/creator_profile_infos/creator_profile_infos";
import ViewerHeader from "./viewer_profile/viewer_header/viewer_header";
import ViewProfInfos from "./viewer_profile/viewer_profile_infos/viewer_profile_infos";

import DesktopHeader from "../header/desktop_header/desktop_header";
import CollectionDetails from "../wallet_viewer/collection_details/collection_details";
import NFTDetails from "../wallet_viewer/nft_details/nft_details";

export default function Profile(props: {
  collections: nft_collection[];
  user: any;
  isMobile: boolean;
}) {
  const { collections, user, isMobile } = props;

  const [session, loading] = useSession();
  const [isMyProfile, setIsMyProfile] = useState<Boolean>(false);
  const [show_collection, set_show_collection] = useState(0);
  const [show_nft, set_show_nft] = useState(-1);

  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const is_my_profile = userId && userId === session?.user?.name;
    setIsMyProfile(is_my_profile);

    console.log("is_my_profile", is_my_profile);
  }, [loading]);

  const close_all = () => {
    console.log("close_all");

    set_show_collection(-1);
    set_show_nft(-1);
  };

  const close_nft = () => {
    console.log("close_nft");
    set_show_nft(-1);
  };

  const open_collection = (index: number) => {
    console.log("open_collection", index);
    set_show_collection(index);
    // set_show_nft(-1);
  };

  const open_nft = (index: number) => {
    console.log("open_nft", index);
    set_show_nft(index);
    // set_show_collection(-1);
  };

  return (
    <div className={s.container}>
      {isMobile ? null : <DesktopHeader tab="profile" />}
      {isMobile ? isMyProfile ? <CreatorHeader /> : <ViewerHeader /> : null}
      {isMyProfile ? <MyProfInfos {...props} /> : <ViewProfInfos {...props} />}
      {show_collection !== -1 && (
        <CollectionDetails
          collection={props.collections[show_collection]}
          isMobile={isMobile}
          callback_close={close_all}
          open_nft={open_nft}
        />
      )}
      {show_nft !== -1 && (
        <NFTDetails
          nft={props.collections[show_collection].nfts[show_nft]}
          rank={{ position: 100, total: 100000 }}
          listed_price={0.01}
          isMobile={isMobile}
          callback_close={close_nft}
        />
      )}
      <ProfileWalletViewer
        collections={collections}
        open_collection={open_collection}
        open_nft={open_nft}
      />
      {isMobile ? <Footer /> : null}
    </div>
  );
}
