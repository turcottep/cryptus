import { useState } from "react";
import { Page } from "../buildingblocks/buildingblocks";
import Collection from "../collection/collection";
import Profile from "./profile";

export default function ProfilePage(props: any) {
  const [v, setV] = useState(false);
  const [c, setC] = useState(false);
  const [profile, setProfile] = useState(true);

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

  return (
    <Page>
      <Profile data={data} user={user} />
      <Collection c={data[0]} v={v} />
    </Page>
  );
}
