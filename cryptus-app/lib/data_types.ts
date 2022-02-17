export interface nft {
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
}

export interface nft_collection {
  name: string;
  description: string;
  image_url: string;
  external_url: string;
  market_cap: number;
  nfts: nft[];
}

export interface profile_props {
  user: any;
  collections: nft_collection[];
}
