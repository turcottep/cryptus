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
        {props.isMobile && <XButton callback={props.callback_close} />}
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};
