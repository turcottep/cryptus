import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import s from "./back_button.module.scss";

export default function BackButton(props: { callback_close?: () => void }) {
  const router = useRouter();

  const onButtonClick = () => {
    if (props.callback_close) {
      props.callback_close();
    } else {
      router.back();
    }
  };

  return (
    <a onClick={onButtonClick} target="_blank" className={s.icon}>
      <img src="/icons/back_icon.png" className={s.image} />
    </a>
  );
}
