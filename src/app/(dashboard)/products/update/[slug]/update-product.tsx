'use client'

import Button from "@/components/ui/Buttons/Button";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { Product, SubCategory } from "@/types";
import { getSubCategoryInfo } from "@/utils/api/categories";
import { uploadExcel } from "@/utils/api/products";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
import { updateProductAction } from "./actions";
import SubmitForm from "@/components/SubmitForm";

interface UpdateProductFormProps {
  subcategories: SubCategory[]
  product: Product
}

export default function UpdateProductForm({
  subcategories,
  product
}: UpdateProductFormProps) {
  const [categoryInfo, setCategoryInfo] = useState<SubCategory>();

  const getFullCategoryInfo = async (name_ru: string) => {
    const category = await getSubCategoryInfo(name_ru);
    console.log(category)
    setCategoryInfo(category);
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    getFullCategoryInfo(e.target.value)
  }

  const handleFormAction = async (formData: FormData) => {
    const newProduct = await updateProductAction(formData);

    if (newProduct.slug) window.location.href = `/products/${newProduct.slug}`;
  }

  useEffect(() => {
    getFullCategoryInfo(product.category.name_ru)
  }, [])

  return (
    <section className="bg-white rounded-xl px-8 py-6 space-y-8">
      <div className="text-sm"><span className="text-red-500">*</span> обязательное поле</div>

      <form action={handleFormAction} className="grid gap-5">
        {
          categoryInfo &&
          <div className="text-black opacity-50 text-sm">
            {categoryInfo.parent_category.direction.toUpperCase()} / {categoryInfo.parent_category.name_ru} / {categoryInfo.name_ru}
          </div>
        }
        <input type="text" name="id" value={product.id} className="hidden" />

        <Select
          name="category_name_ru"
          label="Категория товара"
          placeholder="Выберите категорию"
          options={subcategories.length > 0 ? subcategories.map((subcategory) => subcategory.name_ru) : []}
          onChange={handleCategoryChange}
          defaultValue={product.category.name_ru}
          editable={false}
          required
        />

        <hr className="my-6" />

        <Input
          label="Штрих-код"
          placeholder="Штрих-код"
          type="text"
          name="barcode"
          defaultValue={product.barcode}
          className="w-full"
          required
        />

        <Input
          label="Название товара на РУС"
          placeholder="Название товара на РУС"
          type="text"
          name="name_ru"
          defaultValue={product.name_ru}
          required
        />

        <Input
          label="Название товара на УЗБ"
          placeholder="Название товара на УЗБ"
          type="text"
          name="name_uz"
          defaultValue={product.name_uz}
          required
        />

        <hr className="my-6" />

        <Textarea
          label="Описание на РУС"
          placeholder="Описание на РУС"
          name="description_ru"
          defaultValue={product.description_ru}
          required
        />

        <Textarea
          label="Описание на УЗБ"
          placeholder="Описание на УЗБ"
          name="description_uz"
          defaultValue={product.description_uz}
          required
        />

        <hr className="my-6" />

        <Input
          label="Остаток в шт."
          placeholder="Остаток в шт."
          type="number"
          name="quantity"
          defaultValue={product.quantity}
          className="w-full"
          min={0}
          required
        />

        <Select
          name="is_active"
          label="Статус"
          placeholder="Статус"
          options={['В продаже', 'Не в продаже']}
          defaultValue={product.is_active ? 'В продаже' : 'Не в продаже'}
          required
        />

        <Input
          label="Стоимость"
          placeholder="Стоимость"
          type="number"
          name="price"
          defaultValue={product.price}
          className="w-full"
          min={0}
          required
        />

        <Input
          label="Квант"
          placeholder="Квант"
          type="number"
          name="order_quantity"
          defaultValue={product.order_quantity}
          className="w-full"
          min={0}
          required
        />

        <hr className="my-6" />

        <Input
          label="Дата изготовления"
          type="date"
          name="manufacture_date"
          defaultValue={product.manufacture_date}
          className="w-full"
          required
        />

        <Input
          label="Срок годности"
          placeholder="Срок годности"
          type="text"
          name="storage_life"
          defaultValue={product.storage_life}
          className="w-full"
          required
        />


        <div className="w-full flex items-center justify-between gap-6">
          <SubmitForm>Сохранить</SubmitForm>
        </div>
      </form>
    </section >
  )
}
