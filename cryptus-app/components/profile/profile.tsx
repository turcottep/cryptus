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
import Settings from "../settings/settings";
import WalletManager from "../wallet_manager/wallet_manager";

export default function Profile(props: {
  collections: nft_collection[];
  user: any;
  isMobile: boolean;
}) {
  const { collections, user, isMobile } = props;
  const [session, loading] = useSession();
  const [isMyProfile, setIsMyProfile] = useState<Boolean>(false);

  const [show_card_collection, set_show_collection] = useState(false);
  const [card_collection_index, set_card_collection_index] = useState(0);
  const [show_card_nft, set_show_nft] = useState(false);
  const [card_nft_index, set_card_nft_index] = useState(0);
  const [update_collection, set_update_collection] = useState(0);
  const [show_card_settings, set_show_settings] = useState(false);
  const [show_card_wallet_manager, set_show_wallet_manager] = useState(false);

  const [collections_filter, setCollectionsFilter] = useState<string[]>(
    user.collections_filter
  );

  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const is_my_profile = userId && userId === session?.user?.name;
    setIsMyProfile(is_my_profile);

    console.log("is_my_profile", is_my_profile);
  }, [loading]);

  const close_all = () => {
    set_show_collection(false);
    set_show_nft(false);
    set_show_settings(false);
    set_show_wallet_manager(false);
  };

  const close_nft = () => {
    set_show_nft(false);
  };

  const close_wallet = () => {
    set_show_wallet_manager(false);
  };

  const open_collection = (index: number) => {
    set_card_collection_index(index);
    set_show_collection(true);
  };

  const open_nft = (index: number) => {
    set_card_nft_index(index);
    set_show_nft(true);
  };

  const open_wallet_manager = () => {
    set_show_wallet_manager(true);
  };

  const open_settings = () => {
    set_show_settings(true);
  };

  const update_my_collection_filter = (new_filter: string[]) => {
    const temp_filter = [...new_filter];
    set_update_collection((update_collection + 1) % 2);
    setCollectionsFilter(temp_filter);
  };

  console.log("isMobile", isMobile);

  return (
    <div className={s.container}>
      {isMobile ? null : (
        <DesktopHeader tab="profile" open_settings={open_settings} />
      )}
      {isMobile ? (
        isMyProfile ? (
          <CreatorHeader open_settings={open_settings} />
        ) : (
          <ViewerHeader userId={props.user.username} />
        )
      ) : null}
      {isMyProfile ? (
        <MyProfInfos
          profile_props={props}
          callback_filter={update_my_collection_filter}
          initial_filter={collections_filter}
        />
      ) : (
        <ViewProfInfos {...props} />
      )}
      {show_card_collection && (
        <CollectionDetails
          collection={props.collections[card_collection_index]}
          isMobile={isMobile}
          callback_close={close_all}
          open_nft={open_nft}
        />
      )}
      {show_card_nft && (
        <NFTDetails
          nft={props.collections[card_collection_index].nfts[card_nft_index]}
          rank={{ position: 100, total: 100000 }}
          listed_price={0.01}
          isMobile={isMobile}
          callback_close={close_nft}
        />
      )}
      {show_card_settings && (
        <Settings
          isMobile={isMobile}
          callback_close={close_all}
          open_wallet_manager={open_wallet_manager}
        />
      )}
      {show_card_wallet_manager && (
        <WalletManager
          user={props.user}
          callback_close_wallet={close_wallet}
          isMobile={isMobile}
        />
      )}
      <ProfileWalletViewer
        collections={collections}
        open_collection={open_collection}
        open_nft={open_nft}
        collections_filter={collections_filter}
        key={update_collection}
      />
      {isMobile && <Footer />}
    </div>
  );
}
