import { useState } from "react";
import { Page } from "../buildingblocks/buildingblocks";
import Collection from "../collection/collection";
import Search from "../search/search";
import Market from "./market";

export default function MarketPage(props: any) {
  const [v, setV] = useState(false);
  const [c, setC] = useState(false);
  const [profile, setProfile] = useState(true);

  return (
    <Page>
      <Market networth={props.networth} collections={undefined} />
      <Search data={props.data} v={c} />
      <Collection c={props.data[0]} v={v} />
    </Page>
  );
}
