'use client'

import Button from "@/components/ui/Buttons/Button";

import { RiFileAddLine } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import Input from "@/components/ui/Input";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Select from "@/components/ui/Select";

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


  return (
    <div className="pt-10 gap-6 grid">
      <header className="fixed top-0 left-0 right-0 bg-white py-3 pl-64 flex items-center justify-between gap-5 text-sm pr-16">
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
            required
          />
        
          <Input
            label="Название товара"
            placeholder="Название товара"
            type="text"
            name="name"
            onChange={(e) => updateURLParams('name', e.target.value)}
            defaultValue={searchParams.get('name') as string}
            required
          />

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

          <div className="w-full">
            <div className="font-medium text-xs mb-1">
              Описание  <span className="text-red-500">*</span>
            </div>
            <textarea
              placeholder="Описание"
              name="description"
              onChange={(e) => updateURLParams('description', e.target.value)}
              defaultValue={searchParams.get('description') as string}
              className="border border-gray-normal rounded-lg px-4 p-2 focus:outline-none text-sm w-full"
            />
          </div>

          <Button type="submit">Далее</Button>
        </form>
      </section>
    </div>
  )
}