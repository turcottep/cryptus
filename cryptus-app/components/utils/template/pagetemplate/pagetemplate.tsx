import React, { useState, useEffect } from "react";
import s from "./pagetemplate.module.scss";

import GridTemplate from "../gridetemplate/gridtemplate";

export default function PageTemplate() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>
      <GridTemplate />
    </div>
  );
}
