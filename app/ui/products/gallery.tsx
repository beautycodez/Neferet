import { fetchProducts } from "@/app/lib/data";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { Products } from "@/app/lib/definitions";
import DeleteButton from "./Delete-button";
interface GalleryProps {
  edit: boolean;
}

async function Gallery({ edit }: GalleryProps) {
  let products: Products[] = [];
  try {
    products = await fetchProducts();
  } catch (error) {
    console.error("Error fetching products:", error);
    // Puedes mostrar un mensaje de error en la UI o manejarlo según prefieras.
  }
  return (
    <div className="flex gap-20 justify-center py-24 flex-wrap">
      {products.map((element) => (
        <Link key={element.id} href={`/products/${element.id}`} className="my-6">
          <div className="relative w-80 h-60 rounded-lg shadow-lg my-12">
            <Image
              src={element.foto}
              alt={element.nombre}
              width={1000} // Mantén estos valores para la optimización de Next.js
              height={1000}
              className="w-full h-full object-cover"
            />
            {!edit && (
              <p className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                S/.{element.amount/100}
              </p>
            )}

            {edit && (
              <>
                <Link href={`/products/${element.id}/edit`}>
                  <Button type="button">Editar {element.nombre}</Button>
                </Link>
                <Link href="/admin"><DeleteButton id={element.id} /></Link>
              </>
            )}
            <div className="mt-2 text-center">
              <p className="text-gray-500 text-sm">{element.categoriaid}</p>
              <p className="text-lg font-semibold">{element.nombre}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Gallery;