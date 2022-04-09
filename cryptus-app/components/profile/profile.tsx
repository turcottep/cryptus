import React, { useState, useEffect } from "react";
import s from "./profile.module.scss";

import { useSession } from "next-auth/client";

import { nft_collection, profile_props, tabs } from "../../lib/data_types";

import Footer from "../basic/footer/footer";
import ProfileWalletViewer from "./wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";
import CreatorHeader from "./creator_profile/creator_header/creator_header";
import MyProfInfos from "./creator_profile/creator_profile_infos/creator_profile_infos";
import ViewerHeader from "./viewer_profile/viewer_header/viewer_header";
import ViewProfInfos from "./viewer_profile/viewer_profile_infos/viewer_profile_infos";

import DesktopHeader from "../basic/header/desktop_header/desktop_header";
import CollectionDetails from "./wallet_viewer/collection_details/collection_details";
import NFTDetails from "./wallet_viewer/nft_details/nft_details";
import Loading from "../utils/loading/loading";
import Settings from "../basic/settings/settings";
import WalletManager from "../basic/wallet_manager/wallet_manager";
import Support from "../basic/support/support";

export default function Profile(props: {
  collections: nft_collection[];
  user;
  isMobile: boolean;
}) {
  const { collections, user, isMobile } = props;
  const [session, loading] = useSession();
  const [isMyProfile, setIsMyProfile] = useState<Boolean>(false);

  const [show_card_collection, set_show_collection] = useState(false);
  const [card_collection, set_card_collection] = useState(null);
  const [show_card_nft, set_show_nft] = useState(false);
  const [card_nft, set_card_nft] = useState(null);

  const [update_collection, set_update_collection] = useState(0);
  const [show_card_settings, set_show_settings] = useState(false);
  const [show_card_wallet_manager, set_show_wallet_manager] = useState(false);
  const [show_card_support, set_show_support] = useState(false);

  const [collections_filter, setCollectionsFilter] = useState<string[]>(
    user.collections_filter
  );
  const [image_url, set_image_url] = useState(props.user.profile_image_url);

  useEffect(() => {
    const is_my_profile = props.user.username === session?.user?.name;
    setIsMyProfile(is_my_profile);
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

  const close_support = () => {
    set_show_support(false);
  };

  const open_collection = (collection_name: string) => {
    console.log("open_collection", collection_name);
    const collection = collections.find((c) => c.name === collection_name);
    set_card_collection(collection);
    set_show_collection(true);
  };

  const open_nft = (collection_name: string, nft_token_id: string) => {
    console.log("open_nft", collection_name, nft_token_id);
    const collection = collections.find((c) => c.name === collection_name);

    const nft = collection.nfts.find((n) => n.token_id === nft_token_id);
    set_card_nft(nft);
    set_show_nft(true);
  };

  const open_wallet_manager = () => {
    set_show_wallet_manager(true);
  };

  const open_settings = () => {
    set_show_settings(true);
  };

  const open_support = () => {
    set_show_support(true);
  };

  const update_my_collection_filter = (new_filter: string[]) => {
    const temp_filter = [...new_filter];
    set_update_collection((update_collection + 1) % 2);
    setCollectionsFilter(temp_filter);
  };

  const callback_profile_image_url = (new_image_url: string) => {
    set_image_url(new_image_url);
  };

  return (
    <div className={s.app}>
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
          image_url={image_url}
        />
      ) : (
        <ViewProfInfos user={props} image_url={image_url} />
      )}
      {show_card_collection && (
        <CollectionDetails
          collection={card_collection}
          isMobile={isMobile}
          callback_close={close_all}
          open_nft={open_nft}
        />
      )}
      {show_card_nft && (
        <NFTDetails
          nft={card_nft}
          isMobile={isMobile}
          callback_close={close_all}
          callback_profile_image_url={callback_profile_image_url}
          isMyProfile={isMyProfile}
          username={props.user.username}
          profile_image_url={image_url}
        />
      )}
      {show_card_settings && (
        <Settings
          isMobile={isMobile}
          callback_close={close_all}
          open_wallet_manager={open_wallet_manager}
          open_support={open_support}
        />
      )}
      {show_card_wallet_manager && (
        <WalletManager
          user={props.user}
          callback_close_wallet={close_wallet}
          isMobile={isMobile}
        />
      )}
      {show_card_support && (
        <Support callback_close_support={close_support} isMobile={isMobile} />
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
