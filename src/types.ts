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

export interface PaginatedResponse<T> {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  current_page: number;
  results: T[];
}

export interface Product {
  id: number;
  name_ru: string;
  name_uz: string;
  description_ru: string;
  description_uz: string;
  barcode: string;
  quantity: number;
  is_top: boolean;
  price: string;
  manufacture_date: string | null;
  storage_life: string | null;
  slug: string;
  is_active: boolean;
  images: {
    id: number;
    product: number;
    image: string;
  }[];
  category: {
    id: number;
    name_ru: string;
    name_uz: string;
    parent_category: {
      id: number;
      name_ru: string;
      name_uz: string;
      direction: 'food' | 'nonfood';
    }
  };
  stats: {
    view_count: number;
    sold_count: number;
  }
}

export interface SubCategory {
  id: number;
  name_ru: string;
  name_uz: string;
  parent_category: {
    id: number;
    name_ru: string;
    name_uz: string;
    direction: 'food' | 'nonfood';
  };
}

export interface NewProduct {
  name_ru: string;
  name_uz: string;
  description_ru: string;
  description_uz: string;
  barcode: string;
  quantity: number;
  is_top: boolean;
  price: string;
  manufacture_date: string;
  storage_life: string;
  is_active: boolean;
  category: number;
}

export interface Basket {
  product: Product;
  quantity: number;
}

export interface Company {
  name: string;
  inn: string;
  address: string | null;
  phone_number: string;
  lat: number;
  lon: number;
  logo: string | null;
  min_order_price: number | null;
}

export interface User {
  username: string;
  full_name: string;
  role: 'ADMIN' | 'MANAGER' | 'AGENT';
  is_supplier: boolean;
  company: Company | null;
}


export interface OrderItem {
  id: number;
  product_name: string;
  total_price: string;
  quantity: number;
  order: number;
  product: number;
}

export interface Order {
  id: number;
  slug: string;
  supplier: Company;
  status: string;
  payment_method: string;
  total_price: number;
  created_at: string;
  created_by: Company;
  order_items: OrderItem[];
}