export type ShopItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  effect: string;
  duration: string;
  image: string;
  discount?: number;
  limited?: boolean;
};

export type InventoryItem = {
  id: number;
  name: string;
  description: string;
  category: string;
  effect: string;
  duration: string;
  image: string;
  quantity: number;
  used?: boolean;
};
