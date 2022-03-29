// import fs from "fs";
// import Moralis from "moralis/node";
import prisma from "../lib/prisma";
import FindCollectionRarityData from "../lib/findCollectionRarityData";
import getCollectionTokens from "../lib/get_collection_token";

async function generatetest(contract_address: string) {
  const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
  const token_id_floors = {};
  const trait_dict = {};
  let next = "";
  let response;
  const max_assets = 50;
  for (let i = 0; i < 500; i++) {
    try {
      const url = `https://api.opensea.io/api/v1/assets?order_by=pk&order_direction=asc&asset_contract_address=${contract_address}&limit=${max_assets}&include_orders=true&cursor=${next}`;

      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": opensea_api_key,
        },
      });
      const data = (await response.json()) as any;

      for (const asset of data.assets) {
        const floor = asset.sell_orders
          ? asset.sell_orders[0].base_price / 10 ** 18
          : null;
        const token_id = asset.token_id;

        const floor_clean = floor > 0.001 ? floor : null;

        token_id_floors[token_id] = floor_clean;

        const traits = asset.traits;
        for (const trait of traits) {
          const key = JSON.stringify({
            name: trait.trait_type,
            value: trait.value,
          });
          if (trait_dict[key]) {
            trait_dict[key].push(asset.token_id);
          } else {
            trait_dict[key] = [asset.token_id];
          }
        }
      }
      console.log(
        "i",
        i,
        "data.assets.length",
        data.assets.length,
        "next",
        next
      );
      if (data.assets.length < max_assets) {
        break;
      }
      next = data.next;
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.log("response", response);
      console.log(error);
    }
  }
}
async function generateRarityWithOpensea(collectionAddress: string) {
  const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
  const allNfts = [];
  let next = "";
  let response;
  const max_assets = 50;
  const totalNum = await getCollectionTokens(collectionAddress);
  console.log("totalNum", totalNum);
  try {
    for (let i = 0; i * max_assets < totalNum; i++) {
      try {
        const url =
          "https://api.opensea.io/api/v1/assets?order_by=pk&order_direction=asc&asset_contract_address=" +
          collectionAddress +
          "&limit=" +
          max_assets +
          "&include_orders=true&cursor=" +
          next;

        response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-API-KEY": opensea_api_key,
          },
        });
        const data = (await response.json()) as any;

        if (data.assets && data.assets.length > 0) {
          for (const asset of data.assets) {
            allNfts.push({
              token_id: asset.token_id,
              traits: asset.traits,
            });
          }
        }
        console.log("i*max_assets : ", i * max_assets);
        next = data.next;
        if (next === undefined) {
          console.log("data : ", data);
        }

        console.log("data next : ", data.next);
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.log("response : ", response);
        console.log("error : ", error);
      }
    }
    console.log("First in allNFTs : ", allNfts[0]);
    console.log("allNFTs.length : ", allNfts.length);

    let metadata = allNfts.map((nft) => nft.traits);

    let tally = { TraitCount: {} };

    for (let j = 0; j < metadata.length; j++) {
      let nftTraits = metadata[j].map((e) => e.trait_type);
      let nftValues = metadata[j].map((e) => e.value);

      let numOfTraits = nftTraits.length;

      if (tally.TraitCount[numOfTraits]) {
        tally.TraitCount[numOfTraits]++;
      } else {
        tally.TraitCount[numOfTraits] = 1;
      }

      for (let i = 0; i < nftTraits.length; i++) {
        let current = nftTraits[i];
        if (tally[current]) {
          tally[current].occurences++;
        } else {
          tally[current] = { occurences: 1 };
        }

        let currentValue = nftValues[i];
        if (tally[current][currentValue]) {
          tally[current][currentValue]++;
        } else {
          tally[current][currentValue] = 1;
        }
      }
    }
    const collectionAttributes = Object.keys(tally);
    let nftArr = [];
    let nftOrderedList = [];

    for (let j = 0; j < metadata.length; j++) {
      let current = metadata[j];
      let totalRarity = 0;

      // Present traits
      for (let i = 0; i < current.length; i++) {
        let rarityScore =
          1 / (tally[current[i].trait_type][current[i].value] / totalNum);
        current[i].rarityScore = rarityScore;
        totalRarity += rarityScore;
      }

      // Num of traits
      let rarityScoreNumTraits =
        1 / (tally.TraitCount[Object.keys(current).length] / totalNum);
      current.push({
        trait_type: "TraitCount",
        value: Object.keys(current).length,
        rarityScore: rarityScoreNumTraits,
      });
      totalRarity += rarityScoreNumTraits;

      // Not present traits
      if (current.length < collectionAttributes.length) {
        let nftAttributes = current.map((e) => e.trait_type);
        let absent = collectionAttributes.filter(
          (e) => !nftAttributes.includes(e)
        );

        absent.forEach((type) => {
          let rarityScoreNull =
            1 / ((totalNum - tally[type].occurences) / totalNum);
          current.push({
            trait_type: type,
            value: null,
            rarityScore: rarityScoreNull,
          });
          totalRarity += rarityScoreNull;
        });
      }

      nftArr.push({
        Attributes: JSON.stringify(current),
        Rarity: totalRarity,
        token_id: allNfts[j].token_id,
      });
    }

    nftArr.sort((a, b) => b.Rarity - a.Rarity);

    nftArr.forEach((nft, index) => {
      nftOrderedList.push({
        Attributes: nft.Attributes,
        Rarity: nft.Rarity,
        Rarity_rank: index + 1,
        Token_id: nft.token_id,
      });
    });

    // save to file

    // fs.writeFileSync(
    //   "./scripts/nft_rank/test.json",
    //   JSON.stringify(nftOrderedList, null, 2)
    // );
    // console.log("metadata : ", metadata[0]);
    // console.log("nftArr : ", nftArr[0]);

    return nftOrderedList;
  } catch (error) {
    console.log("error : ", error);
    return null;
  }
}

// async function generateRarityWithMoralis(collectionAddress: string) {
//   // const Moralis = require("moralis/node");
//   const nfts = (await Moralis.Web3API.token.getAllTokenIds({
//     address: collectionAddress,
//   })) as any;

//   const totalNum = nfts.total;
//   const pageSize = nfts.page_size;
//   let allNfts = nfts.result;

//   if (
//     JSON.parse(allNfts[0].metadata).attributes[0].trait_type &&
//     JSON.parse(allNfts[0].metadata).attributes[0].value
//   ) {
//     for (let i = pageSize; i < totalNum; i += pageSize) {
//       console.log("i : ", i);
//       const nfts = (await Moralis.Web3API.token.getAllTokenIds({
//         address: collectionAddress,
//         offset: i,
//       })) as any;
//       allNfts.push(...nfts.result);
//       await new Promise((resolve) => setTimeout(resolve, 2000));
//     }

//     let metadata = allNfts.map((e) => JSON.parse(e.metadata).attributes);
//     // console.log(metadata[0]);

//     // console.log("Num of nfts : ", allNfts.length);

//     let tally = { TraitCount: {} };

//     for (let j = 0; j < metadata.length; j++) {
//       let nftTraits = metadata[j].map((e) => e.trait_type);
//       let nftValues = metadata[j].map((e) => e.value);

//       let numOfTraits = nftTraits.length;

//       if (tally.TraitCount[numOfTraits]) {
//         tally.TraitCount[numOfTraits]++;
//       } else {
//         tally.TraitCount[numOfTraits] = 1;
//       }

//       for (let i = 0; i < nftTraits.length; i++) {
//         let current = nftTraits[i];
//         if (tally[current]) {
//           tally[current].occurences++;
//         } else {
//           tally[current] = { occurences: 1 };
//         }

//         let currentValue = nftValues[i];
//         if (tally[current][currentValue]) {
//           tally[current][currentValue]++;
//         } else {
//           tally[current][currentValue] = 1;
//         }
//       }
//     }
//     const collectionAttributes = Object.keys(tally);
//     let nftArr = [];
//     let nftOrderedList = [];

//     for (let j = 0; j < metadata.length; j++) {
//       let current = metadata[j];
//       let totalRarity = 0;

//       // Present traits
//       for (let i = 0; i < current.length; i++) {
//         let rarityScore =
//           1 / (tally[current[i].trait_type][current[i].value] / totalNum);
//         current[i].rarityScore = rarityScore;
//         totalRarity += rarityScore;
//       }

//       // Num of traits
//       let rarityScoreNumTraits =
//         1 / (tally.TraitCount[Object.keys(current).length] / totalNum);
//       current.push({
//         trait_type: "TraitCount",
//         value: Object.keys(current).length,
//         rarityScore: rarityScoreNumTraits,
//       });
//       totalRarity += rarityScoreNumTraits;

//       // Not present traits
//       if (current.length < collectionAttributes.length) {
//         let nftAttributes = current.map((e) => e.trait_type);
//         let absent = collectionAttributes.filter(
//           (e) => !nftAttributes.includes(e)
//         );

//         absent.forEach((type) => {
//           let rarityScoreNull =
//             1 / ((totalNum - tally[type].occurences) / totalNum);
//           current.push({
//             trait_type: type,
//             value: null,
//             rarityScore: rarityScoreNull,
//           });
//           totalRarity += rarityScoreNull;
//         });
//       }

//       nftArr.push({
//         Attributes: JSON.stringify(current),
//         Rarity: totalRarity,
//         token_id: allNfts[j].token_id,
//       });
//     }

//     nftArr.sort((a, b) => b.Rarity - a.Rarity);

//     nftArr.forEach((nft, index) => {
//       nftOrderedList.push({
//         Attributes: nft.Attributes,
//         Rarity: nft.Rarity,
//         Rarity_rank: index + 1,
//         Token_id: nft.token_id,
//       });
//     });
//     return nftOrderedList;

//     // save to file
//     // nftArr.forEach((nft, index) => {nftDictByTokenId
//     //   [nft.token_id] = {
//     //     Attributes: nft.Attributes,
//     //     Rarity: nft.Rarity,
//     //     Rarity_rank: index,
//     //   };
//     // });

//     // const nftsToSave = { [collectionAddress]: nftDictByTokenId };

//     // fs.writeFileSync(
//     //   "./scripts/nft_rank/" + collectionName + ".json",
//     //   JSON.stringify(nftsToSave, null, 2)
//     // );
//     // console.log("metadata : ", metadata[0]);
//     // console.log("nftArr : ", nftArr[0]);
//     // return nftsToSave;
//   } else {
//     console.log(
//       "The metadata of this collection is not written in the right way"
//     );
//     return null;
//   }
// }

async function writeDataInDB(
  nfts: any[],
  contractAdress: string,
  collectionName: string = ""
) {
  type collectionRarityCreateInput = {
    // attributes: string;
    // rarity: number;
    rarity_rank: number;
    token_id: string;
  };
  try {
    let collectionData: collectionRarityCreateInput[] = [];
    nfts.forEach((nft) => {
      collectionData.push({
        // attributes: nft.Attributes,
        // rarity: Math.trunc(Number(nft.Rarity)),
        rarity_rank: Number(nft.Rarity_rank),
        token_id: JSON.stringify({
          token_id: nft.Token_id,
          collection: contractAdress,
        }),
      });
    });

    const CollectionRarityData = await FindCollectionRarityData(contractAdress);
    if (CollectionRarityData) {
      await prisma.collectionRarity.delete({
        where: { contract_address: contractAdress },
      });
    }
    // console.log("Collection : ", CollectionRarityData);
    await prisma.collectionRarity.upsert({
      where: { contract_address: contractAdress },
      update: {
        contract_address: contractAdress,
        collection_name: collectionName,
      },
      create: {
        contract_address: contractAdress,
        collection_name: collectionName,
      },
    });
    await prisma.collectionRarity.update({
      where: {
        contract_address: contractAdress,
      },
      data: {
        NftRarity: {
          createMany: {
            data: collectionData,
          },
        },
      },
    });
    console.log("WRITING WORKED!");
  } catch (e) {
    console.error("Unable write data : ", e);
  } finally {
    await prisma.$disconnect();
  }
}

async function main(collectionAddress: string, collectionName: string = "") {
  // With Opensea
  // const nftsWithRarity = await generatetest(collectionAddress);

  const nftsWithRarity = await generateRarityWithOpensea(collectionAddress);
  if (nftsWithRarity) {
    await writeDataInDB(nftsWithRarity, collectionAddress, collectionName);
  }

  // With Moralis
  // const Moralis = require("moralis/node");
  // const serverUrl = "https://7n8el022vvrd.usemoralis.com:2053/server";
  // const appId = "I1l0EVLEqlVx64E44bKf2ytSOzIUSSAqlNlJ5Ijd";

  // Moralis.start({ serverUrl, appId });

  // const nftsWithRarity = await generateRarityWithMoralis(collectionAddress);
  // if (nftsWithRarity) {
  //   await writeDataInDB(nftsWithRarity, collectionAddress);
  // }
}

export default main;
