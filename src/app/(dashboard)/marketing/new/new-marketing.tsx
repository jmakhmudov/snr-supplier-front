"use client"

import Button from "@/components/ui/Buttons/Button";
import DetailItem from "@/components/ui/DetailItem";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Product } from "@/types";
import { createDiscount } from "@/utils/api/analytics";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface NewMarketingForm {
  products: Product[];
}

export default function NewMarketingForm({
  products
}: NewMarketingForm) {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString())
  const [selectedProductId, setSelectedProductId] = useState(searchParams.get("product_id"))

  const handleReset = () => {
    window.history.replaceState(null, '', '/marketing/new');
  };

  const updateURLParams = (key: string, value: any) => {
    queryParams.set(key, value as string);

    console.log(queryParams.toString())
    window.history.replaceState(null, '', `?${queryParams.toString()}`)
  }

  const handleFormAction = async (formData: FormData) => {
    const newProduct = await createDiscount(formData);

    if (newProduct.product) window.location.href = `/marketing`;
  }

  return (
    <section className="bg-white rounded-xl px-8 py-6 space-y-8">
      <div className="text-sm"><span className="text-red-500">*</span> обязательное поле</div>

      <form action={handleFormAction} className="grid gap-5">
        <input type="text" name="product" value={searchParams.get('product') ? (searchParams.get('product') as string).split(' ')[0].replace('#', '') : ''} className="hidden" />

        <Select
          name="product_name"
          label="Товар"
          placeholder="Выберите товар"
          options={products.length > 0 ? products.map((product) => `#${product.id} - ${product.name_ru}`) : []}
          onChange={(e) => updateURLParams('product', e.target.value)}
          defaultValue={searchParams.get('product') as string}
          editable={false}
          required
        />

        {
          searchParams.get('product') &&
          <DetailItem
            label="Стоимость без скидки"
            value={`${Number(products.find(product => product.id.toString() === (searchParams.get('product') as string).split(' ')[0].replace('#', ''))?.price).toLocaleString("ru")} сум`}
          />
        }

        <Input
          label="Стоимость со скидкой"
          placeholder="Стоимость со скидкой"
          type="number"
          name="discounted_price"
          onChange={(e) => updateURLParams('discounted_price', e.target.value)}
          defaultValue={searchParams.get('discounted_price') as string}
          className="w-full"
          required
        />

        <Input
          label="Дата начала"
          type="date"
          name="start_date"
          onChange={(e) => updateURLParams('start_date', e.target.value)}
          defaultValue={searchParams.get('start_date') as string}
          className="w-full"
          required
        />

        <Input
          label="Дата конца"
          type="date"
          name="end_date"
          onChange={(e) => updateURLParams('end_date', e.target.value)}
          defaultValue={searchParams.get('end_date') as string}
          className="w-full"
          required
        />

        <div className="w-full flex items-center justify-between gap-6">
          <Button type="reset" variant="outline" className="w-full" onClick={handleReset}>Сбросить</Button>
          <SubmitForm />
        </div>
      </form>
    </section>
  )
}


function SubmitForm() {
  const { pending } = useFormStatus();

  return (
    <div className="w-full">
      <Button disabled={pending} type="submit" className="w-full">
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