import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NotificationSetting from "../../../../components/basic/settings/notification_setting/notification_setting";

describe("<NotificationSetting />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<NotificationSetting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
