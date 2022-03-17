import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import CadEthExchangeButton from "../../../../../components/market_overview/net_worth/cad_eth_exchange_button/cad_eth_exchange_button";

describe("<CadEthExchangeButton />", () => {
  it("should display properly", async () => {
    const test_ethcad = 0;
    const test_cb = async () => {};

    const tree = renderer
      .create(<CadEthExchangeButton EthCad={test_ethcad} callback={test_cb} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
