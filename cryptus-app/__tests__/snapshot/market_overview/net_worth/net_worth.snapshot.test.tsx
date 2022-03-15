import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { intervals } from "../../../../components/market_overview/net_worth/time_interval/time_interval";
import NetWorth from "../../../../components/market_overview/net_worth/net_worth";

type net_worth_props = {
  EthCad: number;
  active: intervals;
  value: string;
  delta: string;
  callbackGraph: any;
};

describe("<NetWorth />", () => {
  it("should display properly", async () => {
    const test_props: net_worth_props = {
      EthCad: 1,
      active: intervals.week,
      value: "7.79",
      delta: "0.01",
      callbackGraph: async () => {},
    };
    React.useState = jest
      .fn()
      .mockReturnValueOnce([test_props.active, {}])
      .mockReturnValueOnce([test_props.EthCad, {}]);

    const tree = renderer.create(<NetWorth {...test_props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
