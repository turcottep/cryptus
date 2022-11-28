import React, { useState, useEffect } from "react";
import s from "./search_icon.module.scss";

import { dbUsers } from "../../../../lib/data_types";

import SearchBar from "../../../market/search_bar/search_bar";
import Card from "../../../utils/card/card";

type search_icon_props = {
  isMobile: boolean;
  callback_close: () => void;
  users: dbUsers[];
};

export default function SearchIcon(props: search_icon_props) {
  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      {/* <div className={s.container}>
        <div className={s.searchBar}> */}
      <SearchBar users={props.users} />
      {/* </div>
      </div> */}
    </Card>
  );
}
