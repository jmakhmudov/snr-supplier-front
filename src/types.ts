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

export interface ProductResponse {
  links: {
    next: string | null;
    previours: string | null;
  };
  count: number;
  total_pages: number;
  current_page: number;
  top: string | null;
  data: Product[];
  status: number;
  message: string | null;
}

export interface Product {
  uuid: UUID;
  name: string;
  supplier: string;
  description: string;
  picture: Picture;
  pictures: readonly Picture[];
  price: string;
  discount: string;
  is_top: boolean;
  stock: number;
  is_active: boolean;
  is_blocked: boolean;
  rating: string;
  conversion: number;
  for_shipment: number;
  quantity_sold: number;
  views: number;
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
  latitude: number;
  longitude: number;
  basket: Basket[];
  total_price: number;
}
