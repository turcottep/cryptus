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
  collection_slug: string;
  collection_size: number;
  collection_address: string;
  description: string;
  value?: number;
  token_id: string;
}

export interface dbUsers {
  id: string;
  email: string;
  username: string;
  displayName: string;
  nfts_order: Number[];
  description: string;
  views: Number;
  likes: Number;
  hash: string;
  collections_filter: string[];
  collections_list: string[];
  networth: Number;
  profile_image_url: string;
  subscription: string;
}

export interface user {
  networth?: number;
  networth_history?: number[];
  description?: string;
  username: string;
  address: string;
  collections_filter: string[];
  collections_list: string[];
  collections_address_list: string[];
  profile_image_url: string;
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
  user: user;
  collections: nft_collection[];
}

export type collection = {
  id: string;
  logo: string;
  ticker: string;
  name: string;
  address: string;
  floor_price: number;
  floor_price_delta: number;
  user_owned: boolean;
  data_price: number[];
  data_volume: number[];
  timestamp: string;
};

export enum tabs {
  market = "market",
  research = "research",
  profile = "profile",
}

export enum intervals {
  week = 0,
  month = 1,
  three_months = 2,
  year = 3,
}

export const interval_days = [7, 30, 90, 365];
