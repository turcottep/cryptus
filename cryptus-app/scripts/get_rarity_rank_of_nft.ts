import fetch from "node-fetch";
import fs from "fs";
import Moralis from "moralis/node.js";
import prisma from "../lib/prisma";
import FindCollectionRarityData from "../lib/findCollectionRarityData";

async function generateRarity(
  collectionAddress: string,
  collectionName: string
) {
  const nfts = (await Moralis.Web3API.token.getAllTokenIds({
    address: collectionAddress,
  })) as any;

  const totalNum = nfts.total;
  const pageSize = nfts.page_size;
  let allNfts = nfts.result;

  if (
    JSON.parse(allNfts[0].metadata).attributes[0].trait_type &&
    JSON.parse(allNfts[0].metadata).attributes[0].value
  ) {
    for (let i = pageSize; i < totalNum; i += pageSize) {
      console.log("i : ", i);
      const nfts = (await Moralis.Web3API.token.getAllTokenIds({
        address: collectionAddress,
        offset: i,
      })) as any;
      allNfts.push(...nfts.result);
      await new Promise((resolve) => setTimeout(resolve, 2000));
    }

    let metadata = allNfts.map((e) => JSON.parse(e.metadata).attributes);
    // console.log(metadata[0]);

    // console.log("Num of nfts : ", allNfts.length);

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
    return nftOrderedList;

    // save to file
    // nftArr.forEach((nft, index) => {nftDictByTokenId
    //   [nft.token_id] = {
    //     Attributes: nft.Attributes,
    //     Rarity: nft.Rarity,
    //     Rarity_rank: index,
    //   };
    // });

    // const nftsToSave = { [collectionAddress]: nftDictByTokenId };

    // fs.writeFileSync(
    //   "./scripts/nft_rank/" + collectionName + ".json",
    //   JSON.stringify(nftsToSave, null, 2)
    // );
    // console.log("metadata : ", metadata[0]);
    // console.log("nftArr : ", nftArr[0]);
    // return nftsToSave;
  } else {
    console.log(
      "The metadata of this collection is not written in the right way"
    );
    return null;
  }
}

async function writeDataInDB(nfts: any[], contractAdress: string) {
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
    console.log("Collection : ", CollectionRarityData);
    await prisma.collectionRarity.upsert({
      where: { contract_address: contractAdress },
      update: { contract_address: contractAdress },
      create: { contract_address: contractAdress },
    });
    await prisma.collectionRarity.update({
      where: {
        contract_address: contractAdress,
      },
      data: {
        nfts_rarity: {
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

async function main(collectionAddress: string, collectionName: string) {
  // const collectionAddress = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  // const collectionName = "BoredApeYatchClub";

  const serverUrl = "https://7n8el022vvrd.usemoralis.com:2053/server";
  const appId = "I1l0EVLEqlVx64E44bKf2ytSOzIUSSAqlNlJ5Ijd";

  Moralis.start({ serverUrl, appId });

  const nftsWithRarity = await generateRarity(
    collectionAddress,
    collectionName
  );
  if (nftsWithRarity) {
    await writeDataInDB(nftsWithRarity, collectionAddress);
  }
}

export default main;
