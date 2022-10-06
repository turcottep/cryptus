import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();

    const address = "0x68c4D9E03D7D902053C428Ca2D74b612Db7F583A".toLowerCase();

    const FIRST_BLOCK_2022 = 10916166;
    const ending_block = 13916166;
    const action = "tokennfttx";

    const txs = await get_transactions_from_etherscan(
      address,
      FIRST_BLOCK_2022,
      ending_block,
      action
    );

    console.log(txs);

    // sort txs by timestamp
    txs.sort((a, b) => {
      return parseInt(a.timeStamp) - parseInt(b.timeStamp);
    });

    // get earliest timestamp
    const first_day = txs[0].timeStamp;
    const first_day_date = new Date(parseInt(first_day) * 1000);
    const first_day_date_string = first_day_date.toISOString().split("T")[0];
    const last_day = txs[txs.length - 1].timeStamp;
    const last_day_date = new Date(parseInt(last_day) * 1000);
    const last_day_date_string = last_day_date.toISOString().split("T")[0];

    console.log("first_day_date_string", first_day_date_string);
    console.log("last_day_date_string", last_day_date_string);

    // generate all days from first day to last day
    const all_days = {};
    const current_day = new Date(first_day_date_string);
    const last_day_date_object = new Date(last_day_date_string);
    while (current_day <= last_day_date_object) {
      const day_object = {};
      const day_string = current_day.toISOString().split("T")[0];
      day_object["day"] = day_string;
      all_days[day_string] = day_object;
      current_day.setDate(current_day.getDate() + 1);
    }
    console.log("all_days", all_days);

    // list of all the collections that the user owns
    const collections = [];
    for (const tx of txs) {
      collections.push(tx.contractAddress.toLowerCase());
    }

    // add txs to all_days
    for (const tx of txs) {
      const tx_date = new Date(parseInt(tx.timeStamp) * 1000);
      const tx_date_string = tx_date.toISOString().split("T")[0];
      const tx_day = all_days[tx_date_string];
      if (tx_day["txs"] == undefined) {
        tx_day["txs"] = [];
      }
      tx_day["txs"].push(tx);
    }

    console.log("all_days", all_days);

    console.log("collections", collections);

    console.log(
      "inculdes",
      collections.includes("0x60e4d786628fea6478f785a6d7e704777c86a7c6")
    );

    console.log("getting collections from db");

    const existing_collections = {};

    for (const collection_address of collections) {
      try {
        const contract_address = collection_address; //"0x60e4d786628fea6478f785a6d7e704777c86a7c6";
        console.log("contract_address", contract_address);
        const address_cropped = contract_address.substring(1);
        const viewing_mode = "month";

        const query = `SELECT * FROM marketsales.${
          address_cropped + "_" + viewing_mode
        };`;
        const answer = await prisma.$queryRaw(query);
        console.log("answer", answer);
        existing_collections[contract_address] = answer;
      } catch (error) {
        if (error.meta.message.includes("does not exist")) {
          console.log("collection does not exist in db");
        } else {
          console.log(error);
        }
      }
    }

    console.log("existing_collections", existing_collections);

    let networth = 0;

    res.status(201);
    res.json(txs);
  } catch (e) {
    res.status(500);
    console.error("There was an error");
    res.json({ error: "Unable to find user", e });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}

interface EtherScanTransaction {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  confirmations: string;
}

async function get_transactions_from_etherscan(
  address: string,
  start_block: number,
  end_block: number | string,
  action: string
) {
  const etherscan_api_key = "VZ3II3582H5MBZDTJW1EQTFQVN6VE5WKG5";

  const url =
    "https://api.etherscan.io/api?module=account&action=" +
    action +
    "&address=" +
    address +
    "&startblock=" +
    start_block +
    "&endblock=" +
    end_block +
    "&page=1&offset=0&sort=asc&apikey=" +
    etherscan_api_key;
  const response = await fetch(url);
  try {
    const data = (await response.json()) as any;
    const transactions = data.result as EtherScanTransaction[];
    return transactions;
  } catch (error) {
    console.log(response);
    console.log(error);
  }
}
