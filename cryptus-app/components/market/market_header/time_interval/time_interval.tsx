//react and css
import React, { useState, useEffect } from "react";
import s from "./time_interval.module.scss";

import { intervals } from "../../../../lib/data_types";

//external exports

//internal imports

//intervals enum

export default function TimeInterval(props: { active: number; callback: any }) {
  const [active, setActive] = useState(props.active);
  const select_interval = (index: number) => {
    setActive(index);
    props.callback(index);
  };

  const interval = (index: number) => {
    switch (index) {
      case intervals.week:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.week ? s.active : "")
            }
            onClick={() => {
              select_interval(intervals.week);
            }}
          >
            1W
          </div>
        );
      case intervals.month:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.month ? s.active : "")
            }
            onClick={() => {
              select_interval(intervals.month);
            }}
          >
            1M
          </div>
        );
      case intervals.three_months:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.three_months ? s.active : "")
            }
            onClick={() => {
              select_interval(intervals.three_months);
            }}
          >
            3M
          </div>
        );
      case intervals.year:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.year ? s.active : "")
            }
            onClick={() => {
              select_interval(intervals.year);
            }}
          >
            1Y
          </div>
        );
      case intervals.alltime:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.alltime ? s.active : "")
            }
            onClick={() => {
              select_interval(intervals.alltime);
            }}
          >
            ALL
          </div>
        );
    }
  };

  return (
    <div className={s.container}>
      {interval(0)}
      {interval(1)}
      {interval(2)}
      {interval(3)}
      {interval(4)}
    </div>
  );
}
