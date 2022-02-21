//react and css
import React, { useState, useEffect } from "react";
import s from "./time_interval.module.scss";

//external exports

//internal imports

//intervals enum
export enum intervals {
  week = 0,
  month = 1,
  three_months = 2,
  six_months = 3,
  year = 4,
}

export default function TimeInterval(props: { active: number }) {
  const [active, setActive] = useState(props.active);
  const select_interval = (index: number) => {
    setActive(index);
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
              setActive(intervals.week);
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
              setActive(intervals.month);
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
              setActive(intervals.three_months);
            }}
          >
            3M
          </div>
        );
      case intervals.six_months:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.six_months ? s.active : "")
            }
            onClick={() => {
              setActive(intervals.six_months);
            }}
          >
            6M
          </div>
        );
      case intervals.year:
        return (
          <div
            className={
              s.icon + " " + (active == intervals.year ? s.active : "")
            }
            onClick={() => {
              setActive(intervals.year);
            }}
          >
            1Y
          </div>
        );
    }
  };

  return (
    <div className={s.container_row}>
      {interval(0)}
      {interval(1)}
      {interval(2)}
      {interval(3)}
      {interval(4)}
    </div>
  );
}
