import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NotificationBell from "../../../../../../components/market_overview/market_collection/market_collection_header/notification_bell/notification_bell";

describe("<NotificationBell />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<NotificationBell />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
