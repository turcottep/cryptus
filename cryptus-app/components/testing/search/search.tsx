import React, { useState, useEffect } from "react";
import s from "./search.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";
import { Collections, Networth } from "../market/market";
import SearchBar from "../../market/search_bar/search_bar";

import findAllUsers from "../../../lib/findAllUsers";
import { user, intervals, collection, dbUsers } from "../../../lib/data_types";

export default function Search(props: {
  coll?: collection[];
  v: boolean;
  f: Function[];
}) {
  const { v, f } = props;
  const [usersProfiles, setUsersProfiles] = useState<dbUsers[]>([]);

  useEffect(() => {
    const getAllUsers = async () => {
      let allUsers = await findAllUsers();
      setUsersProfiles(allUsers);
    };
    getAllUsers();
  }, []);

  return (
    <Popup v={props.v}>
      <Header>
        <div className={s.header}>
          <input className={s.input} />
          <div className={s.icon}>X</div>
        </div>
      </Header>
      <Collections data={props.coll ? props.coll : usersProfiles} />
    </Popup>
  );
}
//TODO: <SearchBar /> is to have Jay's component here, but it should actualy be integraed
