import React, { useState, useEffect } from "react";
import s from "./testing.module.scss";

import { Header, Page, Popup } from "./buildingblocks/buildingblocks";
import Market, { AppHeader, Collections, Modifiers } from "./market/market";
import Search from "./search/search";
import { CollectionHeader } from "./collection/collection";

export default function Testing(props: {}) {
  const [v, setV] = useState(false);
  const [c, setC] = useState(false);
  const [profile, setProfile] = useState(false);

  const data = [
    {
      name: "name",
      imgurl: "imgurl",
      description: "description",
    },
    {
      name: "name",
      imgurl: "imgurl",
      description: "description",
    },
  ];

  const user = {
    name: "name",
    imgurl: "imgurl",
    description: "description",
  };

  return profile ? (
    <Page>
      <Profile data={data} user={user} />
      <Collection c={data[0]} v={v} />
    </Page>
  ) : (
    <Page>
      <Market data={data} />
      <Search data={data} v={c} />
      <Collection c={data[0]} v={v} />
    </Page>
  );
}

export function Profile(props: { data: any; user: any }) {
  const { data, user } = props;
  return (
    <div className={s.profile}>
      <AppHeader />
      <div className={s.top}>
        <div className={s.tile}>
          <div className={s.logo}>{user.imgurl}</div>
          <div className={s.name}>{user.name}</div>
          <div className={s.keystat}>{user.description}</div>
        </div>
        <div className={s.icons}>buttons</div>
      </div>

      <Modifiers />
      <div>collections</div>
    </div>
  );
}

export function Collection(props: { v: boolean; c: any }) {
  const { v, c } = props;
  const data = [
    { name: "a", value: 1 },
    { name: "b", value: 2 },
    { name: "c", value: 3 },
    { name: "d", value: 4 },
    { name: "e", value: 5 },
    { name: "f", value: 6 },
  ];
  return (
    <Popup v={v}>
      <div className={s.collection}>
        <CollectionHeader c={c} />
        <div>{c.description}</div>
        <div>nfts</div>
      </div>
    </Popup>
  );
}

//THIS IS THE MARKET COMPONENT
// return (
//   <Page>
//     <Market data={data} />
//     <Search data={data} v={c} />
//     <Collection c={data[0]} v={v} />
//   </Page>
// );
