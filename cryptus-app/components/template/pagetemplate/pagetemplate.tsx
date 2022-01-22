import React, { useState, useEffect } from "react";
import s from "./pagetemplate.module.scss";

import GridTemplate from "../gridetemplate/gridtemplate";
import Header from "../../header/header";

export default function PageTemplate() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>
      <Header />
      <GridTemplate />
    </div>
  );
}
