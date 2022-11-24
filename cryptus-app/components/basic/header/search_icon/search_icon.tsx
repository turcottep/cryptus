import React, { useState, useEffect } from "react";
import s from "./search_icon.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { dbUsers } from "../../../../lib/data_types";

import SearchBar from "../../../market/search_bar/search_bar";
import Card from "../../../utils/card/card";
import { isMobile } from "react-device-detect";

type search_icon_props = {
  isMobile: boolean;
  callback_close: () => void;
  users: dbUsers[];
};

export default function SearchIcon(props: search_icon_props) {
  const [session, status] = useSession();

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        {isMobile ? (
          <div className={s.searchBarMobile}>
            <SearchBar users={props.users} />
          </div>
        ) : (
          <div className={s.searchBar}>
            <SearchBar users={props.users} />
          </div>
        )}
      </div>
    </Card>
  );
}
