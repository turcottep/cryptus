import React, { useState, useEffect } from "react";
import s from "./testing.module.scss";

import { Header, Page, Popup } from "./buildingblocks/buildingblocks";
import Market, { AppHeader, Collections, Modifiers } from "./market/market";
import Search from "./search/search";
import Collection, { CollectionHeader } from "./collection/collection";
import Profile from "../profile/profile";
import ProfilePage from "./profile/profile_page";
import MarketPage from "./market/market_page";

export default function Testing(props: {}) {
  const [profile, setProfile] = useState(true);

  return profile ? <ProfilePage /> : <MarketPage />;
}
