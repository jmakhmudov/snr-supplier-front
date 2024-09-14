'use client'

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Buttons/Button";
import DetailItem from "@/components/ui/DetailItem";
import { Product } from "@/types";
import { deleteProduct } from "@/utils/api/products";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

import { BiImageAdd } from "react-icons/bi";
import { MdDelete, MdEdit } from "react-icons/md";
import uploadImageAction from "./actions";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product
}: ProductInfoProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const handleImagesUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target || [];
    const images: File[] = [];

    if (files) {
      Array.from(files).map((file, index) => {
        images.push(file);
      })
      setUploadedImages([...images, ...uploadedImages]);
    }
  }

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteProduct = async () => {
    await deleteProduct(product.slug);
    window.location.href = '/';
  }

  return (
    <div>
      <section className="bg-white p-10 py-6 rounded-2xl">
        <section className="flex items-center justify-between w-full">
          <div className="text-black opacity-50 text-sm mb-4 font-light">
            {product.category.parent_category.direction.toUpperCase()} / {product.category.parent_category.name_ru} / {product.category.name_ru}
          </div>

          <div className="flex gap-2">
            <div
              className="bg-blue rounded-full p-1.5 cursor-pointer"
              title="Изменить"
            >
              <MdEdit className="text-white" />
            </div>
            <div
              className="bg-red-500 rounded-full p-1.5 cursor-pointer"
              title="Удалить"
              onClick={openModal}
            >
              <MdDelete className="text-white" />
            </div>

            <DeleteModal
              action={handleDeleteProduct}
              isOpen={isModalOpen}
              onClose={closeModal}
            />
          </div>
        </section>

        <section className="flex items-center justify-between mt-4">
          <div className="flex gap-3 items-start">
            <div>
              <h1 className="font-semibold">{product.name_ru}</h1>
              <div className="text-xs font-light">{product.name_uz}</div>
            </div>
            {
              product.is_active ?
                <Badge>в продаже</Badge>
                :
                <Badge variant="destructive">не в продаже</Badge>
            }
          </div>

          <div className="barcode text-7xl">{product.barcode}</div>
        </section>


        <div className=" mt-10 flex flex-col gap-5">
          <form action={async (formData) => {
            console.log('images', uploadedImages)
            uploadedImages.map(image => {
              formData.append('image', image)
            })
            await uploadImageAction(formData)
            window.location.reload()
          }} className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {
              product.images.map(image => (
                <div key={image.image} className="w-48 aspect-square relative ">
                  <Image
                    src={image.image}
                    alt={image.image}
                    className="object-contain border border-gray-light-0 rounded-lg"
                    fill
                  />
                </div>
              ))
            }
            {
              uploadedImages.map((image) => (
                <div key={URL.createObjectURL(image)} className="w-48 aspect-square relative ">
                  <Image
                    src={URL.createObjectURL(image)}
                    alt={URL.createObjectURL(image)}
                    className="object-contain border border-gray-light-0 rounded-lg"
                    fill
                  />
                </div>
              ))
            }

            <div data-isVisible={uploadedImages.length > 0} className="hidden data-[isVisible=true]:block">
              <button type="submit" className="w-48 aspect-square relative grid place-items-center cursor-pointer border rounded-lg text-blue font-semibold bg-blue-light">
                Сохранить
              </button>
            </div>

            <div>
              <label htmlFor="new_image" title="Добавить фото" className="w-48 aspect-square relative grid place-items-center cursor-pointer border hover:bg-gray-light-0 rounded-lg text-gray-normal">
                <BiImageAdd size={50} />
              </label>
              <input
                type="file"
                name="new_image"
                id="new_image"
                className="hidden"
                onChange={handleImagesUpload}
                accept="image/*"
                multiple
              />
              <input type="text" className="hidden" id="product" name="product" value={product.id} />
            </div>
          </form>

          <section className="space-y-6">
            <div className="flex items-start justify-between gap-8 w-full">
              <DetailItem
                className="w-1/2"
                label="Описание (РУС)"
                value={product.description_ru}
              />
              <DetailItem
                className="w-1/2"
                label="Описание (УЗБ)"
                value={product.description_uz}
              />
            </div>

            <div className="grid grid-cols-4 gap-8 w-full">
              <DetailItem
                label="Остаток"
                value={`${product.quantity} шт.`}
              />
              <DetailItem
                label="Стоимость"
                textStyle="italic"
                value={`${Number(product.price).toLocaleString('ru')} сум`}
              />
              <DetailItem
                label="В топе"
                value={product.is_top ? 'ДА' : 'НЕТ'}
              />
              <DetailItem
                label="Штрих-код"
                value={product.barcode}
              />
            </div>

            <div className="grid grid-cols-4 gap-8 w-full">
              <DetailItem
                label="Дата производства"
                value={product.manufacture_date ? new Date(product.manufacture_date)?.toLocaleDateString('ru') : '-'}
              />
              <DetailItem
                label="Срок годности"
                value={product.storage_life || '-'}
              />
              <DetailItem
                label="Активен"
                value={product.is_active ? 'ДА' : 'НЕТ'}
              />
            </div>
          </section>
        </div>

      </section>


    </div>
  )
}


interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
}

function DeleteModal({
  isOpen,
  onClose,
  action,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0  bottom-0 right-0 left-0 z-[100] grid place-items-center bg-black bg-opacity-30">
      <div className="bg-white p-5 rounded-lg">
        <h3 className="font-semibold">Вы уверены, что хотите удалить товар?</h3>

        <div className="flex items-center justify-between gap-3 mt-4">
          <Button onClick={onClose} variant="outline" className="w-full">Отменить</Button>
          <Button onClick={action} variant="destructive" className="w-full">Удалить</Button>
        </div>
      </div>
    </div>
  )
}