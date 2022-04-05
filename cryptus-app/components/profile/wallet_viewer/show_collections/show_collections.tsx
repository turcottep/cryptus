import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import s from "./show_collections.module.scss";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

import BackButton from "../../../basic/header/back_button/back_button";
import ContextualPageName from "../../../basic/header/contextual_page_name/contextual_page_name";
import update_collection_filter from "../../../../lib/update_collection_filter";
import { nft, nft_collection } from "../../../../lib/data_types";
import { props } from "cypress/types/bluebird";

export default function ShowCollections(props: {
  collections: nft_collection[];
  initial_filter: string[];
  callback_update_filter: (new_filter: string[]) => void;
  callback_close: () => void;
}) {
  const [session, status] = useSession();
  const [collections_filter, set_collections_filter] = useState<string[]>([
    ...props.initial_filter,
  ]);
  const router = useRouter();

  const CollectionOption = (props: { collection: nft_collection }) => {
    const { collection } = props;
    const handleChange = (e) => {
      if (e.currentTarget.checked == false) {
        if (collections_filter.indexOf(collection.address) == -1) {
          collections_filter.push(collection.address);
        }
      }
      if (e.currentTarget.checked == true) {
        const i = collections_filter.indexOf(collection.address);
        if (i != -1) {
          collections_filter.splice(i, 1);
        }
      }
    };

    const default_checked =
      collections_filter.indexOf(collection.address) == -1;

    return (
      <div className={s.option}>
        <CollectionLogo logo={collection.nfts[0].image_url} />
        <CollectionName name={collection.name} />
        <Switch defaultChecked={default_checked} onChange={handleChange} />
      </div>
    );
  };

  const click_cancel = () => {
    set_collections_filter(props.initial_filter);
    props.callback_close();
  };

  const click_apply = () => {
    const username = session?.user?.name;
    console.log("who is this man", username);
    update_collection_filter(username, collections_filter);

    // reload page
    props.callback_update_filter(collections_filter);
    props.callback_close();
  };

  return (
    <div className={s.container}>
      <SCHeader callback={props.callback_close} />
      <div className={s.button}>
        <Button variant="outlined" size="large" onClick={click_cancel}>
          cancel
        </Button>
        <Button variant="contained" size="large" onClick={click_apply}>
          Apply
        </Button>
      </div>
      <div className={s.collections}>
        {props.collections.map((collection: nft_collection) => (
          <div key={collection.id}>
            <CollectionOption collection={collection} />
          </div>
        ))}
      </div>
    </div>
  );
}

const SCHeader = (props: { callback }) => {
  return (
    <div className={s.header}>
      <BackButton callback_close={props.callback} />
      <ContextualPageName name={"Choose which collections to display"} />
      <div className={s.empty}></div>
    </div>
  );
};

const CollectionLogo = (props: { logo: string }) => (
  <img className={s.logo} src={props.logo} />
);

const CollectionName = (props: { name: string }) => (
  <div className={s.name}>{props.name}</div>
);
