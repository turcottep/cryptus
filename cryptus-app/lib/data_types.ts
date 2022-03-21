export interface nft {
  [x: string]: any;
  properties: any;
  rarity_rank: number;
  image_url: string;
  external_url: string;
  name: string;
  last_sale_price: number;
  last_sale_symbol: string;
  collection: string;
  collection_size: number;
  collection_address: string;
  description: string;
  value?: number;
  token_id: string;
}

export interface nft_collection {
  id: number;
  name: string;
  address: string;
  description: string;
  image_url: string;
  external_url: string;
  value?: number;
  market_cap: number;
  nfts: nft[];
}

export interface profile_props {
  user: {
    networth?: number;
    description?: string;
    username: string;
    address: string;
  };
  collections: nft_collection[];
}

export enum tabs {
  market = "market",
  research = "research",
  profile = "profile",
}
