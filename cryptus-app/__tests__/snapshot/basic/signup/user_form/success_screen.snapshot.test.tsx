import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SucessScreen from "../../../../../components/basic/signup/user_form/sucess_screen";

describe("<SucessScreen />", () => {
  it("should display properly", async () => {
    const mockProps = {
      prevStep: null,
      nextStep: null,
      handleChange: null,
      values: {
        username: "TristanIsTesting",
      },
      step: 1,
    };

    const tree = renderer.create(<SucessScreen {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
