import React, { useState, useEffect } from "react";
import s from "./collection_block_name.module.scss";


export default function PageTemplate() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>
      A picture
    </div>
  );
}
