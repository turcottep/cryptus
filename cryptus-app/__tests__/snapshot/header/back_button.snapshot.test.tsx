import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import BackButton from "../../../components/basic/header/back_button/back_button";

describe("<BackButton />", () => {
  it("should display properly", async () => {
    const testURL = "www.publicwallet.app/testuser123";

    const tree = renderer.create(<BackButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
