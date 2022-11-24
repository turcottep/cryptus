import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import MetamaskButton2 from "../../../../components/utils/metamask/metamaskbutton2";

describe("<MetamaskButton2 />", () => {
  it("should display properly", async () => {
    const mockProps = {
      session: null,
      setLoading: null,
      isMobile: false,
    };

    const tree = renderer.create(<MetamaskButton2 {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
