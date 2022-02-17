import React, { useEffect, useState } from "react";
import s from "./market_overview_icon.module.scss";

// Discussed with Guillaume : even if component is one liner, it should be in a separate file, 
// because backend will need to be included in the file, and we do not want backend from all buttons in footer.tsx
export default function MarketOverviewIcon() {
  return (
    <a href="login" target="_blank" className={s.icon}>
      <img src="icons/market_overview_icon.png" />
    </a>
  );
}
