import { Close } from "@mui/icons-material";
import React from "react";
import s from "./card.module.scss";

//Need to add prop for collection
export default function Card(props: {
  isMobile: boolean;
  callback_close;
  children: any;
}) {
  return (
    <div
      id="bg"
      className={s.popuppage}
      onClick={(e: any) => {
        //close if id == "bg"
        if (e.target.id === "bg") {
          props.callback_close();
        }
      }}
    >
      <div className={s.popupcontent}>
        {props.isMobile && (
          <div className={s.x_button} onClick={props.callback_close}>
            <Close />
          </div>
        )}
        {props.children}
      </div>
    </div>
  );
}

const XButton = (props: { callback }) => {
  return (
    <div
      className={s.x_button}
      onClick={() => {
        props.callback();
      }}
    >
      <Close />
    </div>
  );
};
