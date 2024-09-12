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
  results: Product[];
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
  company_profile: string;
  inn: string;
  address: string | null;
  phone_number: string;
  lat: number;
  lon: number;
  logo: string | null;
}

export interface User {
  username: string;
  full_name: string;
  role: 'ADMIN' | 'MANAGER' | 'AGENT';
  is_supplier: boolean;
  company: Company | null;
}
