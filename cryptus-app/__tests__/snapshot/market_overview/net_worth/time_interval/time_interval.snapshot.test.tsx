import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import TimeInterval from "../../../../../components/market/net_worth/time_interval/time_interval";

describe("<TimeInterval />", () => {
  it("should display properly", async () => {
    const test_active = 0;
    const test_cb = async () => {};
    React.useState = jest.fn().mockReturnValueOnce([test_active, {}]);

    const tree = renderer
      .create(<TimeInterval active={test_active} callback={test_cb} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
