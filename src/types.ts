import { UUID } from "crypto";

export interface Section {
  title: string;
  name: string;
  options: {
    label: string;
    value: string;
    checked: boolean;
    icon: JSX.Element | null,
  }[];
}

export interface Picture {
  uuid: UUID;
  picture: string;
}

export interface Product {
  uuid: UUID;
  name: string;
  supplier: string;
  descriptions: string;
  picture: Picture;
  pictures: readonly Picture[];
  price: string;
  discount: string;
  is_top: boolean;
}

export interface Basket {
  product: Product;
  quantity: number;
}

export interface User {
  full_name: string;
  phone: string;
  email: string;
  picture: Picture;
  company_name: string;
  inn: string;
  latitude: string;
  longtitude: string;
  basket: Basket[];
  total_price: number;
}
