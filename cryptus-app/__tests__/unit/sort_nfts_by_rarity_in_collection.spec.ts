// Import a function from our library and test input, output behavior
import { apeholder_collections } from "../../lib/apeholderCollections";
import sortNFTsByRarityInCollection from "../../lib/sort_nfts_by_rarity_in_collection";

// https://stackoverflow.com/questions/48083353/i-want-to-know-how-to-shuffle-an-array-in-typescript
function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

describe("sortNFTsByRarityInCollection", () => {
  test("should work", async () => {
    // Test
    expect(
      sortNFTsByRarityInCollection(shuffle(apeholder_collections))
    ).toEqual(apeholder_collections);
  });
});
