import { Product } from "@/types";
import { getProductById } from "@/utils/api/products";
import Image from "next/image";

export default async function ProductPage({
  params
}: { params: { id: string } }) {
  const product: Product = await getProductById(params.id);

  console.log(product)

  return (
    <div>
      <section className="bg-white p-10 py-6 rounded-2xl">
        <h1 className="font-semibold">{product.name}</h1>

        <div>
          {
            product.pictures.map((picture) => (
              <div key={picture.uuid} className="w-48 aspect-square relative">
                <Image
                  src={picture.picture}
                  alt={picture.uuid}
                  className="object-contain"
                  fill
                />
              </div>
            ))
          }
        </div>
      </section>


    </div>
  )
}
