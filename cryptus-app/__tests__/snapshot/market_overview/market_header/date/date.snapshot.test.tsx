import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import DateComponent from "../../../../../components/market_overview/market_header/date/date";

describe("<DateComponent />", () => {
  it("should display properly", async () => {
    const test_date = "April 20";

    const tree = renderer.create(<DateComponent date={test_date} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
