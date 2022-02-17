import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("starting timer...");
    const base_url = process.env.BASE_URL;
    const response = await fetch(base_url + "api/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contract_address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      }),
    });
    console.log("response", response);

    const data = await response.json();

    // console.log("user: ", user);
    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
