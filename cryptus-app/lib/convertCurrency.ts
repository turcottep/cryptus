const ethPrice = require("eth-price");
export async function getETHFromUSD(amount: number) {
  const eth_price = await ethPrice("usd");
  let price = parseFloat(JSON.stringify(eth_price).split(":")[1].split('"')[0]);
  const usd = amount / price;
  const Eth = Math.round(usd * 100) / 100;
  return Eth;
}

export async function getUSDFromETH(amount: number) {
  const eth_price = await ethPrice("usd");
  let price = parseFloat(JSON.stringify(eth_price).split(":")[1].split('"')[0]);
  const Eth = amount * price;
  const usd = Math.round(Eth * 100) / 100;
  console.log(usd);
  return usd;
}
