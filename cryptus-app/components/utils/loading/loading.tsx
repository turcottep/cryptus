// import { CircularProgress } from "@mui/material";
import React from "react";
import s from "./loading.module.scss";

export default function Loading() {
  return (
    <div className={s.container}>
      <div className={s.containee}>
        {/* <CircularProgress color="primary" /> */}
      </div>
    </div>
  );
}
