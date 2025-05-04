"use client";
import Link from "next/link";
import {
  CurrencyDollarIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { createProduct, State } from "@/app/lib/actions";
import { Button } from "@/app/ui/button";
import { useActionState, useState, useEffect } from "react";
import { Vendors } from "@/app/lib/definitions";

function AddProductForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createProduct, initialState);
  const categorias = [
    "Anillos",
    "Collares",
    "Aros",
    "Esclavas",
    "Aretes",
    "Pisa Corbatas",
    "Díges",
  ];

  const [vendors, setVendors] = useState<Vendors[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      const res = await fetch('/api/vendors');
      const data = await res.json();
      setVendors(data);
    };

    fetchVendors();
  }, []);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Escoge una categoría
          </label>
          <div className="relative">
            <select
              id="categoria"
              name="categoriaId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
            >
              <option value="" disabled>
                Selecciona una categoría
              </option>
              {categorias.map((categoria, index) => (
                <option key={index} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Precio
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Agrege un precio en soles"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Talla */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Talla
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="talla"
                name="talla"
                type="number"
                placeholder="Agrege la talla de la joya"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Cantidad */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Cantidad
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cantidad"
                name="cantidad"
                type="number"
                placeholder="# en Stock"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Descripción
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="descripcion"
                name="descripcion"
                type="text"
                placeholder="Agrege una descrición del producto"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Nombre de la Joya */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Nombre de la joya
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nombre"
                name="nombre"
                type="text"
                placeholder="Agrege el nombre de la joya"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        {/* Imagen */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Carga una foto
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="foto"
                name="foto"
                type="file"
                placeholder="Carge una foto del producto"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
      </div>

      {/* select vendor */}

      <div className="mb-4">
        <label htmlFor="customer" className="mb-2 block text-sm font-medium">
          Escoge un vendedor
        </label>
        <div className="relative">
          <select
            id="vendor_id"
            name="vendor_id"
            className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
            defaultValue=""
          >
            <option value="" disabled>
              Seleccione el vendedor
            </option>
            {vendors.map((vendor, index) => (
              <option key={index} value={vendor.id}>
                {`${vendor.nombre} ${vendor.apellido}`}
              </option>
            ))}
          </select>
          <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Crear Producto</Button>
      </div>
    </form>
  );
}

export default AddProductForm;
