'use client'

import Button from "@/components/ui/Buttons/Button";

import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import { SubCategory } from "@/types";
import { getSubCategoryInfo } from "@/utils/api/categories";
import { uploadExcel } from "@/utils/api/products";
import { redirect, useSearchParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { RiFileAddLine } from "react-icons/ri";
import { createProductAction } from "./actions";
import { InputMask } from "@react-input/mask";

interface NewProductFormProps {
  subcategories: SubCategory[]
}

export default function NewProductForm({
  subcategories,
}: NewProductFormProps) {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());
  const [categoryInfo, setCategoryInfo] = useState<SubCategory>();
  const [file, setFile] = useState<File>()

  const getFullCategoryInfo = async (name_ru: string) => {
    if (!searchParams.get('category')) return;

    const category = await getSubCategoryInfo(name_ru);
    console.log(category)
    setCategoryInfo(category);
  }

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateURLParams('category', e.target.value)
    getFullCategoryInfo(e.target.value)
  }

  const updateURLParams = (key: string, value: any) => {
    queryParams.set(key, value as string);

    console.log(queryParams.toString())
    window.history.replaceState(null, '', `?${queryParams.toString()}`)
  }

  const handleReset = () => {
    window.history.replaceState(null, '', '/products/new');
  };

  const handleFormAction = async (formData: FormData) => {
    const newProduct = await createProductAction(formData);

    if (newProduct.slug) window.location.href = `/products/${newProduct.slug}`;
  }

  const handleExcelUpload = async (formData: FormData) => {
    const success = await uploadExcel(formData)
    console.log(success)
    if (success) redirect('/')
  }

  const handleDownload = () => {
    fetch('/api/product/download/template/', {
      method: 'GET',
    })
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'ШАБЛОН.xlsx');
        document.body.appendChild(link);
        link.click();
        if (link.parentNode) link.parentNode.removeChild(link);
      })
      .catch(error => console.error('Error downloading the file:', error));
  };

  return (
    <section className="bg-white rounded-xl px-8 py-6 space-y-8">
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <RiFileAddLine size={18} />
              Загрузить с Excel
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full text-sm">
            <DialogTitle>Загрузить товары через Excel</DialogTitle>

            <DialogDescription>
              <div className="text-blue flex gap-1 items-center cursor-pointer" onClick={handleDownload}>
                <FiDownload />
                Скачать шаблон
              </div>
            </DialogDescription>
            <form action={handleExcelUpload}>

              <label htmlFor="file" title="Загрузить с Excel" >
                <div className="w-full h-48 border-4 border-blue-light rounded-lg border-dashed grid place-items-center text-blue cursor-pointer">
                  <div className="flex flex-col justify-center items-center text-center">
                    <RiFileAddLine className="text-blue animate-bounce" size={40} />
                    {
                      file ? <div className="text-sm text-blue">{file.name}</div>
                        : <div className="w-2/3">Перетащите или выберите файл .xls, .xlsx</div>
                    }
                  </div>
                </div>
              </label>

              {
                file && <SubmitForm className="w-full mt-4" />
              }
              <input
                type="file"
                name="file"
                id="file"
                className="hidden"
                accept=".xls,.xlsx"
                onChange={(e) => {
                  if (e.target.files) setFile(e.target.files[0])
                }}
              />
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="text-sm"><span className="text-red-500">*</span> обязательное поле</div>

      <form action={handleFormAction} className="grid gap-5">
        {
          categoryInfo &&
          <div className="text-black opacity-50 text-sm">
            {categoryInfo.parent_category.direction.toUpperCase()} / {categoryInfo.parent_category.name_ru} / {categoryInfo.name_ru}
          </div>
        }

        <Select
          name="category_name_ru"
          label="Категория товара"
          placeholder="Выберите категорию"
          options={subcategories.length > 0 ? subcategories.map((subcategory) => subcategory.name_ru) : []}
          onChange={handleCategoryChange}
          defaultValue={searchParams.get('category') as string}
          required
        />

        <hr className="my-6" />

        <Input
          label="Штрих-код"
          required
        >
          <InputMask
            name="barcode"
            className="w-full outline-none  placeholder-gray-normal bg-transparent"
            mask="_____________"
            replacement={{ _: /\d/ }}
            onChange={(e) => updateURLParams('barcode', e.target.value)}
            defaultValue={searchParams.get('barcode') as string}
            placeholder="Штрих-код"
            required
          />
        </Input>

        <Input
          label="Название товара на РУС"
          placeholder="Название товара на РУС"
          type="text"
          name="name_ru"
          onChange={(e) => updateURLParams('name_ru', e.target.value)}
          defaultValue={searchParams.get('name_ru') as string}
          required
        />

        <Input
          label="Название товара на УЗБ"
          placeholder="Название товара на УЗБ"
          type="text"
          name="name_uz"
          onChange={(e) => updateURLParams('name_uz', e.target.value)}
          defaultValue={searchParams.get('name_uz') as string}
          required
        />

        <hr className="my-6" />

        <Textarea
          label="Описание на РУС"
          placeholder="Описание на РУС"
          name="description_ru"
          onChange={(e) => updateURLParams('description_ru', e.target.value)}
          defaultValue={searchParams.get('description_ru') as string}
          required
        />

        <Textarea
          label="Описание на УЗБ"
          placeholder="Описание на УЗБ"
          name="description_uz"
          onChange={(e) => updateURLParams('description_uz', e.target.value)}
          defaultValue={searchParams.get('description_uz') as string}
          required
        />

        <hr className="my-6" />

        <Input
          label="Остаток в шт."
          placeholder="Остаток в шт."
          type="number"
          name="quantity"
          onChange={(e) => updateURLParams('quantity', e.target.value)}
          defaultValue={searchParams.get('quantity') as string}
          className="w-full"
          min={0}
          required
        />

        <Select
          name="is_active"
          label="Статус"
          placeholder="Статус"
          options={['В продаже', 'Не в продаже']}
          onChange={(e) => updateURLParams('status', e.target.value)}
          defaultValue={searchParams.get('status') as string}
          required
        />

        <Input
          label="Стоимость"
          placeholder="Стоимость"
          type="number"
          name="price"
          onChange={(e) => updateURLParams('price', e.target.value)}
          defaultValue={searchParams.get('price') as string}
          className="w-full"
          min={0}
          required
        />

        <Input
          label="Квант"
          placeholder="Квант"
          type="number"
          name="order_quantity"
          onChange={(e) => updateURLParams('order_quantity', e.target.value)}
          defaultValue={searchParams.get('order_quantity') as string}
          className="w-full"
          min={0}
          required
        />

        <hr className="my-6" />

        <Input
          label="Дата изготовления"
          type="date"
          name="manufacture_date"
          onChange={(e) => updateURLParams('production_date', e.target.value)}
          defaultValue={searchParams.get('production_date') as string}
          className="w-full"
          required
        />

        <Input
          label="Срок годности"
          placeholder="Срок годности"
          type="text"
          name="storage_life"
          onChange={(e) => updateURLParams('storage_life', e.target.value)}
          defaultValue={searchParams.get('storage_life') as string}
          className="w-full"
          required
        />


        <div className="w-full flex items-center justify-between gap-6">
          <Button type="reset" variant="outline" className="w-full" onClick={handleReset}>Сбросить</Button>
          <SubmitForm />
        </div>
      </form>
    </section >
  )
}

function SubmitForm({
  className
}: {
  className?: string
}) {
  const { pending } = useFormStatus();

  return (
    <div className={`w-full ${className}`}>
      <Button disabled={pending} type="submit" className="w-full grid place-items-center">
        {
          pending ?
            <AiOutlineLoading3Quarters className="animate-spin" />
            :
            "Добавить"
        }
      </Button>
    </div>
  )
}