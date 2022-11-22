import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import get_profile_props from "../lib/get_profile_props";
import get_empty_profile_props from "../lib/empty_profile_props";
import collections_dict from "../lib/collectionDictionary";

import { Page } from "../components/testing/buildingblocks/buildingblocks";
import Profile from "../components/testing/profile/profile";
import Collection from "../components/testing/profile/collection/collection";
import Nft from "../components/testing/profile/nft/nft";
import Settings from "../components/testing/settings/settings";
import Modifiers from "../components/testing/profile/modifiers/modifiers";
import Search from "../components/testing/search/search";

export default function ProfilePage() {
  const props_empty = get_empty_profile_props();
  const router = useRouter();
  //const { username } = router.query;
  const username = "lafleur1"; //TODO: Change this to username from router.query
  const userNameString = username as string;

  const [loading, setLoading] = useState<Boolean>(false);

  const [user, setUser] = useState(props_empty.user);
  const [collections, setCollections] = useState(props_empty.collections);

  const [v, setV] = useState(0); //[0: profile, 1: settings, 2: search, 3: collection, 4: nft, 5: modifiers]

  const [filteredCollections, setFilteredCollections] = useState(
    props_empty.collections
  );
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [selectedNft, setSelectedNft] = useState(null);

  const [f, setF] = useState([
    (i) => setV(i),
    (coll) => setSelectedCollection(coll),
    (nft) => setSelectedNft(nft),
  ]);

  const getProps = async () => {
    try {
      console.log("getting props for ", userNameString);
      const returningProps = await get_profile_props(userNameString);
      const new_user_props = returningProps.props.user;
      const new_collections_props = returningProps.props.collections;
      setUser(new_user_props);
      setCollections(new_collections_props);
      console.log("returning_props", returningProps);

      setLoading(false);
    } catch (e) {
      console.log("error", e);
      setLoading(false);
      setUser({
        username: "user not found",
        address: "error",
        profile_image_url: "error",
        collections_filter: ["error"],
      });
      setCollections([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (userNameString) {
      getProps();
    }
  }, [username]);

  useEffect(() => {
    let top_collections_address_list = Object.keys(collections_dict).map(
      (key) => collections_dict[key].address.toLowerCase()
    );
    let coll = collections
      .filter((collection) => {
        return !user.collections_filter.includes(collection.address);
      })
      .sort((a, b) => {
        return (
          top_collections_address_list.indexOf(b.address.toLowerCase()) -
          top_collections_address_list.indexOf(a.address.toLowerCase())
        );
      });
    setFilteredCollections(coll);
  }, [collections, user.collections_filter]);

  useEffect(() => {
    console.log("selected Collection", selectedCollection);
  }, [selectedCollection]);
  useEffect(() => {
    console.log("selected NFt", selectedNft);
  }, [selectedCollection]);

  return (
    <Page key={loading ? 1 : 0}>
      <Profile collections={collections} user={user} f={f} />
      <Modifiers d={user} f={f} v={v == 5} />
      <Collection d={selectedCollection} f={f} v={v == 3} />
      <Nft d={selectedNft} f={f} v={v == 4} />
      <Settings d={user} f={f} v={v == 1} />
    </Page>
  );
}

//LIST OF ALL PAGES ORIGINATING FROM PROFILE PAGE
//profile, collection, nft, modifiers(filters, sort, edit), settings(walletmanager, support), search
