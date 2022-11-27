import CreateAccountFromWalletAddress from "./createAccountFromWalletAddress";

export default async function AddUsersToDb() {
  for (let i = 0; i < usersList.length; i++) {
    await CreateAccountFromWalletAddress(
      usersList[i].wallet_adress.toLocaleLowerCase(),
      true,
      usersList[i].username.toLocaleLowerCase()
    );
  }
}

export const usersList = [
  {
    username: "Seedphrase",
    wallet_adress: "0x1da5331994e781ab0e2af9f85bfce2037a514170",
  },
  {
    username: "Garyvee",
    wallet_adress: "0xd6a984153acb6c9e2d788f08c2465a1358bb89a7",
  },
  {
    username: "Beeple",
    wallet_adress: "0xc6b0562605d35ee710138402b878ffe6f2e23807",
  },
  {
    username: "flur",
    wallet_adress: "0xb32b4350c25141e779d392c1dbe857b62b60b4c9",
  },
  {
    username: "Pranksy",
    wallet_adress: "0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459",
  },
  {
    username: "crypto888crypto",
    wallet_adress: "0x507fc313f9d50ce32ff94e67df48f7b0935d016a",
  },
  {
    username: "BeanieMaxi",
    wallet_adress: "0xabf107de3e01c7c257e64e0a18d60a733aad395d",
  },
  {
    username: "Artchick",
    wallet_adress: "0x0b8f4c4e7626a91460dac057eb43e0de59d5b44f",
  },
  {
    username: "fvckrender",
    wallet_adress: "0xfded90a3b1348425577688866f798f94d77a0d02",
  },
  {
    username: "fazebanks",
    wallet_adress: "0x7d4823262bd2c6e4fa78872f2587dda2a65828ed",
  },
  {
    username: "KeyboardMonkey",
    wallet_adress: "0xe1d29d0a39962a9a8d2a297ebe82e166f8b8ec18",
  },
  {
    username: "gmoneyNFT",
    wallet_adress: "0xf0d6999725115e3ead3d927eb3329d63afaec09b",
  },
  {
    username: "tropoFarmer ",
    wallet_adress: "0xa442ddf27063320789b59a8fdca5b849cd2cdeac",
  },
  {
    username: "Zeneca_33",
    wallet_adress: "0x886478d3cf9581b624cb35b5446693fc8a58b787",
  },
  {
    username: "VincentVanDough",
    wallet_adress: "0x0f0eae91990140c560d4156db4f00c854dc8f09e",
  },
  {
    username: "J1mmy",
    wallet_adress: "0x8ad272ac86c6c88683d9a60eb8ed57e6c304bb0c",
  },
  {
    username: "NateAlex",
    wallet_adress: "0x63a9dbce75413036b2b778e670aabd4493aaf9f3",
  },
  {
    username: "StephCurry",
    wallet_adress: "0x3becf83939f34311b6bee143197872d877501b11",
  },
  {
    username: "andy8052",
    wallet_adress: "0x90e5aa59a9df2add394df81521dbbed5f3c4a1a3",
  },
  {
    username: "PixelVault",
    wallet_adress: "0xfd64b63d4a54e6b1a0aa88e6623046c54f960d00",
  },
  {
    username: "valueandtime",
    wallet_adress: "0x82b47799859e354eac6dba1d0f6dd5b45124c14b",
  },
  {
    username: "mevcollcetor",
    wallet_adress: "0x5338035c008ea8c4b850052bc8dad6a33dc2206c",
  },
  {
    username: "VonMises14",
    wallet_adress: "0x8dbbca57ea56290efa14d835bbfd34faf1d89753",
  },
  {
    username: "Shamdoo",
    wallet_adress: "0x11360f0c5552443b33720a44408aba01a809905e",
  },
  {
    username: "Gfunkera86",
    wallet_adress: "0x115ab9e1dbe84030719835dd3d4b74503be8921b",
  },
  {
    username: "VitalikButerin",
    wallet_adress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045 ",
  },
  {
    username: "dan_opensea",
    wallet_adress: "0x530cf036ed4fa58f7301a9c788c9806624cefd19 ",
  },
];
