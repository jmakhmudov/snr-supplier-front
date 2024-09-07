import Badge from "@/components/ui/Badge";
import { Product } from "@/types";
import { getProductBySlug } from "@/utils/api/products";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductPage({
  params
}: { params: { slug: string } }) {
  console.log(params.slug)
  const product: Product = await getProductBySlug(params.slug);

  console.log(product)

  if (!product.name_ru) {
    return notFound();
  }

  return (
    <div>
      <section className="bg-white p-10 py-6 rounded-2xl">
        <div className="text-gray-normal text-sm mb-4 font-light">{product.category.parent_category.direction.toUpperCase()} / {product.category.parent_category.name_ru} / {product.category.name_ru}</div>

        <div className="flex gap-3 items-start">
          <div>
            <h1 className="font-semibold">{product.name_ru}</h1>
            <div className="text-xs font-light">{product.name_uz}</div>
          </div>
          <Badge>{product.is_active ? 'в продаже' : 'не в продаже'}</Badge>
        </div>

        <div className=" mt-10 flex flex-col gap-5">
          <section className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
            {
              product.images.map((image) => (
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
          </section>

          <section>
            <div>Описание</div>
            <div>{product.description_ru}</div>
          </section>
        </div>

      </section>


    </div>
  )
}
