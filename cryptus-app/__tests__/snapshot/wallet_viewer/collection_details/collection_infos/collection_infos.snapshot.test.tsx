import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../../lib/mocks";
import CollectionInfos from "../../../../../components/wallet_viewer/collection_details/collection_infos/collection_infos";

describe("<CollectionInfos />", () => {
  it("should display the correct collection information", async () => {
    const tree = renderer
      .create(<CollectionInfos name={mock_collection.name} number={69} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
