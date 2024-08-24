'use client'

import Button from "@/components/ui/Buttons/Button";

import { RiFileAddLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import Input from "@/components/ui/Input";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Select from "@/components/ui/Select";
import Textarea from "@/components/ui/Textarea";
import Link from "next/link";

export default function NewProductPage() {
  const searchParams = useSearchParams();
  const queryParams = new URLSearchParams(searchParams.toString());

  const updateURLParams = (key: string, value: any) => {
    queryParams.set(key, value as string);

    console.log(queryParams.toString())
    window.history.replaceState(null, '', `?${queryParams.toString()}`)
  }

  useEffect(() => {
    if (!searchParams.get('step')) {
      updateURLParams('step', 1);
    }
  }, [])

  const handleNextStep = () => {
    const stepNum = Number(searchParams.get('step'));
    console.log(stepNum);
    updateURLParams('step', stepNum + 1);
  }

  const handleReset = () => {
    window.history.replaceState(null, '', '/products/new');
  };

  return (
    <div className="pt-10 gap-6 grid">
      <header className="fixed top-0 left-0 right-0 bg-white py-3 pl-64 flex items-center justify-between gap-5 text-sm pr-16 z-[99]">
        <div className=" font-semibold">Добавить товар</div>

        <div className="flex items-center gap-8">
          <div className="text-xs">Информация о товаре</div>

          <div className="flex items-center">
            <div className="bg-blue w-7 aspect-square rounded-full text-white font-medium grid place-items-center text-xs border-dashed border border-white">1</div>
            <div className="border-[1.5px] w-6 border-gray-light"></div>
            <div className="bg-blue bg-opacity-50 w-7 aspect-square rounded-full text-white font-medium grid place-items-center text-xs">2</div>
            <div className="border-[1.5px] w-6 border-gray-light"></div>
            <div className="bg-blue bg-opacity-50 w-7 aspect-square rounded-full text-white font-medium grid place-items-center text-xs">3</div>
          </div>
        </div>
      </header>

      <div className="flex gap-4">
        <Button>
          <div className="flex items-center gap-2"><RiFileAddLine size={18} /> Загрузить с Excel</div>
        </Button>
        <Button>
          <div className="flex items-center gap-2"><FiUpload size={18} /> Выгрузить данные</div>
        </Button>
      </div>

      <section className="bg-white rounded-xl px-8 py-6 space-y-8">
        <div className="text-sm"><span className="text-red-500">*</span> обязательное поле</div>

        <form className="grid gap-5" onSubmit={handleNextStep}>
          <Select
            name="is_food"
            label="Тип товара"
            placeholder="Выберите тип"
            options={['FOOD', 'NONFOOD']}
            onChange={(e) => updateURLParams('is_food', e.target.value)}
            defaultValue={searchParams.get('is_food') as string}
            required
          />

          <Select
            name="category"
            label="Категория товара"
            placeholder="Выберите категорию"
            options={['FOOD', 'NONFOOD']}
            onChange={(e) => updateURLParams('category', e.target.value)}
            defaultValue={searchParams.get('category') as string}
            required
          />

          <Select
            name="sub_category"
            label="Подкатегория товара"
            placeholder="Выберите подкатегорию"
            options={['FOOD', 'NONFOOD']}
            onChange={(e) => updateURLParams('sub_category', e.target.value)}
            defaultValue={searchParams.get('sub_category') as string}
            required
          />

          <hr className="my-6" />

          <Input
            label="Штрих-код"
            placeholder="Штрих-код"
            type="text"
            name="barcode"
            onChange={(e) => updateURLParams('barcode', e.target.value)}
            defaultValue={searchParams.get('barcode') as string}
            className="w-full"
            required
          />

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
            name="status"
            label="Статус"
            placeholder="Статус"
            options={['В продаже', 'Не в продаже']}
            onChange={(e) => updateURLParams('status', e.target.value)}
            defaultValue={searchParams.get('status') as string}
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
            <Button type="submit" className="w-full">Добавить</Button>
          </div>
        </form>
      </section>
    </div>
  )
}