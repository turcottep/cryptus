import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import fs from "fs";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const address = "0x052288F424Ec1a127093E29BaDC21Dd2ddb860A1".toLowerCase();

  try {
    prisma.$connect();

    const first_block = 10916166;
    const ending_block = 16018856;
    const action = "tokennfttx";

    const txs = await get_transactions_from_etherscan(
      address,
      first_block,
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
      current_day.setUTCDate(current_day.getUTCDate() + 1);
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
      // console.log("tx_date_string", tx_date_string);

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

    // save to file
    console.log("saving to file");
    fs.writeFileSync(
      "existing_collections.json",
      JSON.stringify(existing_collections, null, 2)
    );
    fs.writeFileSync("all_days.json", JSON.stringify(all_days, null, 2));

    // read from file
    console.log("reading from file");
    const existing_collections_n = JSON.parse(
      fs.readFileSync("existing_collections.json", "utf8")
    );
    const trading_days = JSON.parse(fs.readFileSync("all_days.json", "utf8"));

    console.log("existing_collections_n", existing_collections_n);

    const collection_dict_dict = {};
    for (const collection_address in existing_collections_n) {
      const collection_dict = {};
      const collection = existing_collections_n[collection_address];

      for (const day in collection) {
        const day_object = collection[day];
        // console.log("day_object", day_object);
        const day_string_raw = day_object["timestamp_raw"]; // '2022-04-05T00:00:00+00:00'
        const day_string = day_string_raw.split("T")[0]; // '2022-04-05'
        collection_dict[day_string] = day_object;
      }
      collection_dict_dict[collection_address] = collection_dict;
    }

    console.log("collection_dict_dict", collection_dict_dict);

    // console.log("trading_days", trading_days);

    const trading_days_list = Object.values(trading_days);

    // console.log("trading_days_list", trading_days_list.length);
    // log each individual day
    for (const day of trading_days_list) {
      console.log("day", day["day"]);
    }

    const current_collections_tally = {};
    for (const collection_address in collection_dict_dict) {
      current_collections_tally[collection_address] = 0;
    }

    let i = 0;
    const networth_history = [];

    for (const day of trading_days_list) {
      // console.log("day", day);
      const day_string = day["day"];
      // console.log("day_string", day_string);

      // if (i > 200) break;

      if (day["txs"] != undefined) {
        for (const tx of day["txs"]) {
          const collection_address = tx.contractAddress.toLowerCase();
          let direction = 1;
          if (tx.from.toLowerCase() == address) {
            direction = -1;
          }
          // check if in existing collections

          if (collection_dict_dict[collection_address] != undefined) {
            current_collections_tally[collection_address] += direction;
          }
        }
      }

      console.log(
        "date",
        day_string,
        "current_collections_tally",
        current_collections_tally
      );

      // get worth of each collection
      let networth = 0;
      for (const collection_address in current_collections_tally) {
        // console.log(
        //   "collection_address",
        //   collection_address,
        //   "day_string",
        //   day_string
        // );
        const amount = current_collections_tally[collection_address];

        const day = collection_dict_dict[collection_address][day_string];
        // console.log("day", day);

        if (day != undefined) {
          console.log("day", day);
          console.log("amount", amount);

          const price_number = parseFloat(day["average_price"]);
          console.log("price_number", price_number);
          if (price_number != NaN) {
            networth += price_number * amount;
            console.log("networth", networth);
          }
        }
      }
      day["networth"] = networth;
      networth_history.push(networth);

      i++;
    }

    // console.log("trading_days_list", trading_days_list);

    // let networth = 0;
    console.log("networth_history", networth_history);

    // save to user
    const user_res = await prisma.wallet.findUnique({
      where: {
        address: address,
      },
      select: {
        User: true,
      },
    });
    console.log("user_res", user_res);

    const res_update = await prisma.user.update({
      where: {
        id: user_res.User.id,
      },
      data: {
        networth_history: networth_history,
      },
    });

    console.log("done");

    res.status(201);
    res.json({});
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
