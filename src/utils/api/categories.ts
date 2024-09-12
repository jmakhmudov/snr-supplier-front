'use server'

import { cookies } from "next/headers";

const API_URL = process.env.API_URL;


export const getSubCategories = async () => {
  const categories = await fetch(`${API_URL}/api/product/subcategories/`, {
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());

  console.log(categories)
  return categories;
}

export const getSubCategoryInfo = async (name_ru: string) => {
  const category = await fetch(`${API_URL}/api/product/subcategory/${name_ru}/`, {
    headers: {
      Authorization: `Bearer ${cookies().get('access')?.value}`
    },
    cache: 'no-store',
  }).then(res => res.json());

  return category;
}