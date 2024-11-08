import { fetchProducts } from "@/app/lib/data";
import { DivideIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "@/app/ui/button";

interface GalleryProps {
  edit: boolean;
}

async function Gallery({ edit }: GalleryProps) {
  const products = await fetchProducts();

  return (
    <div className="flex gap-4 justify-center py-24 flex-wrap">
      {products.map((element) => (
        <Link key={element.id} href={`/products/${element.id}`}>
          <div className="relative w-60 h-60 rounded-lg shadow-lg my-12">
            <Image
              src={`data:image/jpeg;base64,${element.foto}`}
              alt={element.nombre}
              width={500} // Mantén estos valores para la optimización de Next.js
              height={500}
              className="w-full h-full object-cover"
            />
            {!edit && (
              <p className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                S/.{element.amount}
              </p>
            )}

            {edit && <Link href={`/products/${element.id}/edit`}><Button type="button">Editar {element.nombre}</Button></Link> }
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
