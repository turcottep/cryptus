import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import FormHeader from "../../../components/basic/signup/user_form/form_header";

type MyProps = {
  title: String;
  step: Number;
};

describe("<FormHeader />", () => {
  it("should display properly", async () => {
    const testProps: MyProps = {
      title: "FormHeaderTestTitle",
      step: 1,
    };

    const tree = renderer.create(<FormHeader {...testProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
