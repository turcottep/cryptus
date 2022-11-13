import React, { useState, useEffect } from "react";
import s from "./testing.module.scss";

import { Header, Page, Popup } from "./buildingblocks/buildingblocks";
import Market, { Collections } from "./market/market";
import Collection from "./collection/collection";
import Search from "./search/search";

export default function Testing(props: {}) {
  const [v, setV] = useState(false);
  const [c, setC] = useState(false);

  const data = [
    {
      name: "name",
      description: "description",
      price: "price",
      change: "change",
      imgurl: "imgurl",
      graph: "graph",
    },
    {
      name: "name",
      description: "description",
      price: "price",
      change: "change",
      imgurl: "imgurl",
      graph: "graph",
    },
    {
      name: "name",
      description: "description",
      price: "price",
      change: "change",
      imgurl: "imgurl",
      graph: "graph",
    },
    {
      name: "name",
      description: "description",
      price: "price",
      change: "change",
      imgurl: "imgurl",
      graph: "graph",
    },
    {
      name: "name",
      description: "description",
      price: "price",
      change: "change",
      imgurl: "imgurl",
      graph: "graph",
    },
  ];

  return (
    <Page>
      <Market data={data} />
      <Search data={data} v={c} />
      <Collection c={data[0]} v={v} />
    </Page>
  );
}
