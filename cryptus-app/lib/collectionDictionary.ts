const collections_dict = {
  CoolCatsNFT: {
    id: "2",
    logo: "/images/coolcatsnft.png",
    ticker: "CATS",
    name: "Cool Cats NFT",
    timestamp: "firday",
    address: "0x1a92f7381b9f03921564a437210bb9396471050c",
    floor_price: 7.79,
    floor_price_delta: 0.01,
    data_price: [],
    data_volume: [],
  },
  MutantApeYachtClub: {
    id: "3",
    logo: "/images/mutant-ape-yacht-club.png",
    ticker: "MAYC",
    name: "Mutant Ape Yacht Club",
    timestamp: "firday",
    address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    floor_price: 15.69,
    floor_price_delta: -0.75,
    data_price: [],
    data_volume: [],
  },
  Meebits: {
    id: "4",
    logo: "/images/meebits.png",
    ticker: "MEE",
    name: "Meebits",
    timestamp: "firday",
    address: "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
    floor_price: 2.65,
    floor_price_delta: -0.35,
    data_price: [],
    data_volume: [],
  },
  Doodles: {
    id: "5",
    logo: "/images/doodles.jpg",
    ticker: "DOOD",
    name: "Doodles",
    timestamp: "firday",
    address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    floor_price: 9.99,
    floor_price_delta: -1.25,
    data_price: [],
    data_volume: [],
  },
  CrypToadz: {
    id: "6",
    logo: "/images/toadz.gif",
    ticker: "TOADz",
    name: "CrypToadz",
    timestamp: "firday",
    address: "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6",
    floor_price: 9.99,
    floor_price_delta: -1.25,
    data_price: [],
    data_volume: [],
  },
  PudgyPenguins: {
    id: "7",
    logo: "/images/pudgypenguins.jpg",
    ticker: "PUDGY",
    name: "Pudgy Penguins",
    timestamp: "firday",
    address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    floor_price: 0.89,
    floor_price_delta: -0.25,
    data_price: [],
    data_volume: [],
  },
  VeeFriends: {
    id: "8",
    logo: "/images/veefriends.png",
    ticker: "VEE",
    name: "VeeFriends",
    timestamp: "firday",
    address: "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb",
    floor_price: 12.5,
    floor_price_delta: -1.55,
    data_price: [],
    data_volume: [],
  },
  FLUFWorld: {
    id: "9",
    logo: "/images/FLUF.png",
    ticker: "FLUF",
    name: "FLUF World",
    timestamp: "firday",
    address: "0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d",
    floor_price: 3.425,
    floor_price_delta: -0.49,
    data_price: [],
    data_volume: [],
  },
  GutterCatGang: {
    id: "10",
    logo: "/images/GCG.gif",
    ticker: "GCG",
    name: "Gutter Cat Gang",
    timestamp: "firday",
    address: "0xedb61f74b0d09b2558f1eeb79b247c1f363ae452",
    floor_price: 3.425,
    floor_price_delta: -0.49,
    data_price: [],
    data_volume: [],
  },
  alienfrens: {
    id: "11",
    logo: "/images/AF.png",
    ticker: "AF",
    name: "alien frens",
    timestamp: "firday",
    address: "0x123b30e25973fecd8354dd5f41cc45a3065ef88c",
    floor_price: 1.49,
    floor_price_delta: -0.49,
    data_price: [],
    data_volume: [],
  },
};

const collection100list = [
  {
    name: "cryptopunks",
    address: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  },
  {
    name: "boredapeyachtclub",
    address: "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  },
  {
    name: "mutant-ape-yacht-club",
    address: "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
  },
  { name: "artblocks", address: "0xa7d8d9ef8D8Ce8992Df33D8b8CF4Aebabd5bD270" },
  { name: "clonex", address: "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B" },
  { name: "azuki", address: "0xED5AF388653567Af2F388E6224dC7C4b3241C544" },
  { name: "meebits", address: "0x7Bd29408f11D2bFC23c34f18275bBf23bB716Bc7" },
  {
    name: "cool-cats-nft",
    address: "0x1A92f7381B9F03921564a437210bB9396471050C",
  },
  { name: "doodles", address: "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e" },
  {
    name: "bored-ape-kennel-club",
    address: "0xba30E5F9Bb24caa003E9f2f0497Ad287FDF95623",
  },
  {
    name: "cryptoadz-by-gremplin",
    address: "0x1CB1A5e65610AEFF2551A50f76a87a7d3fB649C6",
  },
  {
    name: "world-of-women-nft",
    address: "0xe785E82358879F061BC3dcAC6f0444462D4b5330",
  },
  { name: "cyberkongz", address: "0x57a204AA1042f6E66DD7730813f4024114d74f37" },
  { name: "veefriends", address: "0xa3AEe8BcE55BEeA1951EF834b99f3Ac60d1ABeeB" },
  {
    name: "my-curio-cards",
    address: "0x73DA73EF3a6982109c4d5BDb0dB9dd3E3783f313",
  },
  {
    name: "creatureworld",
    address: "0xc92cedDfb8dd984A89fb494c376f9A48b999aAFc",
  },
  {
    name: "clonex-mintvial",
    address: "0x348FC118bcC65a92dC033A951aF153d14D945312",
  },
  {
    name: "invisiblefriends",
    address: "0x59468516a8259058bad1ca5f8f4bff190d30e066",
  },
  {
    name: "emblem-vault",
    address: "0x82C7a8f707110f5FBb16184A5933E9F78a34c6ab",
  },
  { name: "punkscomic", address: "0x5ab21ec0bfa0b29545230395e3adaca7d552c948" },
  {
    name: "adidasoriginals",
    address: "0x28472a58A490c5e09A238847F66A68a47cC76f0f",
  },
  { name: "mfers", address: "0x79fcdef22feed20eddacbb2587640e45491b757f" },
  { name: "deadfellaz", address: "0x2acAb3DEa77832C09420663b0E1cB386031bA17B" },
  { name: "3landers", address: "0xb4d06d46a8285f4ec79fd294f78a881799d8ced9" },
  {
    name: "alienfrensnft",
    address: "0x123b30e25973fecd8354dd5f41cc45a3065ef88c",
  },
  {
    name: "coolpetsnft",
    address: "0x86c10d10eca1fca9daf87a279abccabe0063f247",
  },
  {
    name: "guttercatgang",
    address: "0xedb61f74b0d09b2558f1eeb79b247c1f363ae452",
  },
  {
    name: "acclimatedmooncats",
    address: "0xc3f733ca98e0dad0386979eb96fb1722a1a05e69",
  },
  { name: "tubby-cats", address: "0xca7ca7bcc765f77339be2d648ba53ce9c8a262bd" },
  {
    name: "wolf-game-migrated",
    address: "0x7f36182dee28c45de6072a34d29855bae76dbe2f",
  },
  {
    name: "metahero-generative",
    address: "0x6dc6001535e15b9def7b0f6a20a2111dfa9454e2",
  },
  {
    name: "forgottenruneswizardscult",
    address: "0x521f9c7505005cfa19a8e5786a9c3c9c9f5e6f42",
  },
  { name: "planetdaos", address: "0x7deb7bce4d360ebe68278dee6054b882aa62d19c" },
  {
    name: "fvck-crystal",
    address: "0x7afeda4c714e1c0a2a1248332c100924506ac8e6",
  },
  { name: "braindrops", address: "0xdfde78d2baec499fe18f2be74b6c287eed9511d7" },
  { name: "warpsound", address: "0xcbc67ea382f8a006d46eeeb7255876beb7d7f14d" },
  {
    name: "jakes-world-editions",
    address: "0xa3f226d6633ca531c1f8e26cfbf724b1eee9202e",
  },
  {
    name: "pixel-vault-mintpass",
    address: "0x33cfae13a9486c29cd3b11391cc7eca53822e8c7",
  },
  { name: "hot-mess", address: "0x8c335a5e0cf05eca62ca1e49afa48531b694824e" },
  { name: "rareshoe", address: "0x963b9e20321cab408f3b35520f0fe3f54148f508" },
  { name: "pixelmap", address: "0x050dc61dfb867e0fe3cf2948362b6c0f3faf790b" },
  {
    name: "plasmabears",
    address: "0x909899c5dbb5002610dd8543b6f638be56e3b17e",
  },
  {
    name: "cryptocrystal",
    address: "0xcfbc9103362aec4ce3089f155c2da2eea1cb7602",
  },
  { name: "on1-force", address: "0x3bf2922f4520a8ba0c2efc3d2a1539678dad5e9d" },
  { name: "xcopy", address: "0x8a939fd297fab7388d6e6c634eee3c863626be57" },
  { name: "mekaverse", address: "0x9a534628b4062e123ce7ee2222ec20b86e16ca8f" },
  { name: "flufworld", address: "0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d" },
  {
    name: "coolman-universe",
    address: "0xa5c0bd78d1667c13bfb403e2a3336871396713c5",
  },
  {
    name: "cryptodickbutts",
    address: "0x42069abfe407c60cf4ae4112bedead391dba1cdb",
  },
  {
    name: "worldwidewebbland",
    address: "0xa1d4657e0e6507d5a94d06da93e94dc7c8c44b51",
  },
  { name: "rtfkt-podx", address: "0xb7be4001bff2c5f4a61dd2435e4c9a19d8d12343" },
  {
    name: "rtfkt-mnlth",
    address: "0x86825dfca7a6224cfbd2da48e85df2fc3aa7c4b1",
  },
  {
    name: "bored-ape-chemistry-club",
    address: "0x22c36bfdcef207f9c0cc941936eff94d4246d14a",
  },
  {
    name: "proof-collective",
    address: "0x08d7c0242953446436f34b4c78fe9da38c73668d",
  },
  {
    name: "tom-sachs-rockets",
    address: "0x11595ffb2d3612d810612e34bc1c2e6d6de55d26",
  },
  {
    name: "onchainmonkey",
    address: "0x960b7a6bcd451c9968473f7bbfd9be826efd549a",
  },
  { name: "bvgarden", address: "0x33e1977d6593050520b1fe2d5c586376ad07046d" },
  {
    name: "cryptoskulls",
    address: "0xc1caf0c19a8ac28c41fe59ba6c754e4b9bd54de9",
  },
  {
    name: "cyber-factory-2",
    address: "0x226bf5293692610692e2c996c9875c914d2a7f73",
  },
  {
    name: "cryptomories",
    address: "0x1a2f71468f656e97c2f86541e57189f59951efe7",
  },
  { name: "deadheads", address: "0x6fc355d4e0ee44b292e50878f49798ff755a5bbc" },
];

export default collections_dict;
