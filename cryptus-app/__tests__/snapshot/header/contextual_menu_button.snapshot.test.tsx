import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ContextualMenuButton from "../../../components/basic/header/contextual_menu_button/contextual_menu_button";

describe("<ContextualMenuButton />", () => {
  it("should display properly", async () => {
    const mockProps = {
      img: "www.publicwallet.app/testuser123",
      url: "/icons/menu_icon.png",
    };

    const tree = renderer
      .create(<ContextualMenuButton {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
