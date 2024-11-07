// app/products/[id]/page.tsx
import React from "react";
import { fetchProductById } from "@/app/lib/data";
import Image from "next/image";
import { Button } from "@/app/ui/button";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";

async function ProductPage({ params }: { params: { id: string } }) {
  // Await para asegurar el acceso asíncrono a params
  const { id } = await Promise.resolve(params);

  try {
    const product = await fetchProductById(id);

    return (
      <>
      <Breadcrumbs breadcrumbs={[
          { label: 'Products', href: '/products' },
          {
            label: 'Product Detail',
            href: `/products/${product.id}`,
            active: true,
          },]} />
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 p-6 bg-white shadow-lg rounded-lg">
        <Image
          src={`data:image/jpeg;base64,${product.foto}`}
          alt={product.nombre}
          width={700}
          height={900}
          className="w-full md:w-1/2 rounded-lg object-cover"
        />
        <div className="flex flex-col justify-between w-full md:w-1/2">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Detalles del producto:
            </h1>
            <h2 className="text-xl font-semibold text-gray-700">
              {product.categoriaid} - {product.nombre}
            </h2>
            <p className="text-gray-600 text-lg">
              Descripción: {product.descripcion}
            </p>
            <p className="text-gray-800 text-lg font-medium">
              Price: S/.{product.amount}
            </p>
            <p className="text-gray-500">Quedan {product.cantidad} en stock</p>
          </div>
          <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center">
            Comprar <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
      </>
      
    );
  } catch (error) {
    return <div>Product not found.</div>;
  }
}

export default ProductPage;
