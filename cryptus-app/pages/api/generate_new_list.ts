import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import get_opensea_graphql from "../../lib/opensea_graphql";
import get_collection_list_v2 from "../../public/collection_list";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // const data = get_opensea_graphql();
    const data = await get_collection_list_v2();

    const dict_new = {};
    const dict_old_raw = {
      "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D": "boredapeyachtclub",
      "0x60E4d786628Fea6478F785A6d7e704777c86a7c6": "mutant-ape-yacht-club",
      "0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270": "artblocks",
      "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B": "clonex",
      "0xED5AF388653567Af2F388E6224dC7C4b3241C544": "azuki",
      "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7": "meebits",
      "0x1A92f7381B9F03921564a437210bB9396471050C": "cool-cats-nft",
      "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e": "doodles",
      "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623": "bored-ape-kennel-club",
      "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6": "cryptoadz-by-gremplin",
      "0xe785E82358879F061BC3dcAC6f0444462D4b5330": "world-of-women-nft",
      "0x57a204AA1042f6E66DD7730813f4024114d74f37": "cyberkongz",
      "0xa3AEe8BcE55BEeA1951EF834b99f3Ac60d1ABeeB": "veefriends",
      "0x73DA73EF3a6982109c4d5BDb0dB9dd3E3783f313": "my-curio-cards",
      "0xc92cedDfb8dd984A89fb494c376f9A48b999aAFc": "creatureworld",
      "0x348FC118bcC65a92dC033A951aF153d14D945312": "clonex-mintvial",
      "0x59468516a8259058bad1ca5f8f4bff190d30e066": "invisiblefriends",
      "0x82C7a8f707110f5FBb16184A5933E9F78a34c6ab": "emblem-vault",
      "0x5ab21ec0bfa0b29545230395e3adaca7d552c948": "punkscomic",
      "0x28472a58A490c5e09A238847F66A68a47cC76f0f": "adidasoriginals",
      "0x79fcdef22feed20eddacbb2587640e45491b757f": "mfers",
      "0x2acAb3DEa77832C09420663b0E1cB386031bA17B": "deadfellaz",
      "0xb4d06d46a8285f4ec79fd294f78a881799d8ced9": "3landers",
      "0x123b30e25973fecd8354dd5f41cc45a3065ef88c": "alienfrensnft",
      "0x86c10d10eca1fca9daf87a279abccabe0063f247": "coolpetsnft",
      "0xedb61f74b0d09b2558f1eeb79b247c1f363ae452": "guttercatgang",
      "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69": "acclimatedmooncats",
      "0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd": "tubby-cats",
      "0x7f36182dee28c45de6072a34d29855bae76dbe2f": "wolf-game-migrated",
      "0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2": "metahero-generative",
      "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42": "forgottenruneswizardscult",
      "0x7deb7bce4d360ebe68278dee6054b882aa62d19c": "planetdaos",
      "0x7afeda4c714e1c0a2a1248332c100924506ac8e6": "fvck-crystal",
      "0xdfde78d2baec499fe18f2be74b6c287eed9511d7": "braindrops",
      "0xcbc67ea382f8a006d46eeeb7255876beb7d7f14d": "warpsound",
      "0xa3f226d6633ca531c1f8e26cfbf724b1eee9202e": "jakes-world-editions",
      "0x33cfae13a9486c29cd3b11391cc7eca53822e8c7": "pixel-vault-mintpass",
      "0x8c335a5e0cf05eca62ca1e49afa48531b694824e": "hot-mess",
      "0x963b9e20321cab408f3b35520f0fe3f54148f508": "rareshoe",
      "0x050dc61dfb867e0fe3cf2948362b6c0f3faf790b": "pixelmap",
      "0x909899c5dbb5002610dd8543b6f638be56e3b17e": "plasmabears",
      "0xcfbc9103362aec4ce3089f155c2da2eea1cb7602": "cryptocrystal",
      "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d": "on1-force",
      "0x8a939fd297fab7388d6e6c634eee3c863626be57": "xcopy",
      "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f": "mekaverse",
      "0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d": "flufworld",
      "0xa5c0bd78d1667c13bfb403e2a3336871396713c5": "coolman-universe",
      "0x42069abfe407c60cf4ae4112bedead391dba1cdb": "cryptodickbutts",
      "0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51": "worldwidewebbland",
      "0xb7be4001bff2c5f4a61dd2435e4c9a19d8d12343": "rtfkt-podx",
      "0x86825dfca7a6224cfbd2da48e85df2fc3aa7c4b1": "rtfkt-mnlth",
      "0x22c36bfdcef207f9c0cc941936eff94d4246d14a": "bored-ape-chemistry-club",
      "0x08d7c0242953446436f34b4c78fe9da38c73668d": "proof-collective",
      "0x11595ffb2d3612d810612e34bc1c2e6d6de55d26": "tom-sachs-rockets",
      "0x960b7a6bcd451c9968473f7bbfd9be826efd549a": "onchainmonkey",
      "0x33e1977d6593050520b1fe2d5c586376ad07046d": "bvgarden",
      "0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9": "cryptoskulls",
      "0x226bf5293692610692e2c996c9875c914d2a7f73": "cyber-factory-2",
      "0x1a2f71468f656e97c2f86541e57189f59951efe7": "cryptomories",
      "0x6fc355d4e0ee44b292e50878f49798ff755a5bbc": "deadheads",
    };
    const dict_old = {};
    for (const [key, value] of Object.entries(dict_old_raw)) {
      dict_old[key.toLowerCase()] = value;
    }

    for (const collection of data) {
      console.log(collection);
      if (collection.collection.primary_asset_contracts.length > 0) {
        const address =
          collection.collection.primary_asset_contracts[0].address;
        const slug = collection.collection.slug;
        console.log("address", address, "slug", slug);
        dict_new[address] = slug;
      }

      // dict_clean[collection.collection_slug] = collecti;
    }

    console.log("dict_new", dict_new);
    console.log("dict_old", dict_old);

    // combine the two dictionaries without duplicates
    const dict_combined = { ...dict_old, ...dict_new };
    console.log("dict_combined", dict_combined);

    // length of the combined dictionary
    console.log("dict_combined length", Object.keys(dict_combined).length);
    console.log("dict old length", Object.keys(dict_old).length);
    console.log("dict new length", Object.keys(dict_new).length);

    // const opensea_api_key = process.env.OPENSEA_API_KEY;

    // console.log("data", data.data.rankings.edges);
    // const all_slugs = [];

    // for (const edge of data.data.rankings.edges) {
    //   const slug = edge.node.slug;
    //   all_slugs.push(slug);
    // }

    // console.log("all_slugs", all_slugs);

    // // get contract addresse for each slug
    // const collection_list = [];

    // // get contract addresses for each slug from opensea
    // for (const slug of all_slugs) {
    //   const url = "https://api.opensea.io/api/v1/collection/" + slug;
    //   const response = await fetch(url, {
    //     headers: {
    //       "X-API-KEY": opensea_api_key,
    //     },
    //   });
    //   const data = await response.json();

    //   console.log("data", data);

    //   // const contract_address = data.collection.primary_asset_contracts[0].address;

    //   // wait 10 seconds
    //   await new Promise((resolve) => setTimeout(resolve, 250));

    //   collection_list.push(data);
    // }

    // save to file
    fs.writeFileSync(
      "public/dict_combined.json",
      JSON.stringify(dict_combined, null, 2)
    );

    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
