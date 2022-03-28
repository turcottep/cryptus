import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import s from "./show_collections.module.scss";
import Switch from "@mui/material/Switch";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

import BackButton from "../../header/back_button/back_button";
import ContextualPageName from "../../header/contextual_page_name/contextual_page_name";
import update_collection_filter from "../../../lib/update_collection_filter";
import { nft, nft_collection } from "../../../lib/data_types";

var coll_filter: string[] = [];

export default function ShowCollections(props: {
  collections: nft_collection[];
}) {
  const [session, status] = useSession();
  const router = useRouter();
  const onButtonClick = (e) => {
    update_collection_filter(session?.user?.name, coll_filter);
    router.back();
  };
  return (
    <div className={s.container}>
      <SCHeader />
      <div className={s.collections}>
        {props.collections.map((collection: nft_collection) => (
          <div key={collection.id}>
            <CollectionOption collection={collection} />
          </div>
        ))}
      </div>
      <div className={s.button}>
        <Button variant="contained" size="large" onClick={onButtonClick}>
          Apply
        </Button>
      </div>
    </div>
  );
}

const SCHeader = () => {
  return (
    <div className={s.header}>
      <BackButton />
      <ContextualPageName name={"Choose which collections to display"} />
      <div className={s.empty}></div>
    </div>
  );
};

const CollectionOption = (props: { collection: nft_collection }) => {
  const { collection } = props;
  const handleChange = (e) => {
    if (e.currentTarget.checked == false) {
      if (coll_filter.indexOf(collection.address) == -1) {
        coll_filter.push(collection.address);
      }
    }
    if (e.currentTarget.checked == true) {
      const i = coll_filter.indexOf(collection.address);
      if (i != -1) {
        coll_filter.splice(i, 1);
      }
    }
  };
  return (
    <div className={s.option}>
      <CollectionLogo logo={collection.image_url} />
      <CollectionName name={collection.name} />
      <Switch defaultChecked onChange={handleChange} />
    </div>
  );
};

const CollectionLogo = (props: { logo: string }) => (
  <img className={s.logo} src={props.logo} />
);

const CollectionName = (props: { name: string }) => (
  <div className={s.name}>{props.name}</div>
);
