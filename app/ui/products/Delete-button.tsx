'use client'
import React from 'react'
import  {Button}  from '../button'
import { deleteProduct } from "@/app/lib/actions";
import { Products } from "@/app/lib/definitions";

function DeleteButton ({ id }: { id : string }){
    const handleDelete = () => {
        deleteProduct(id)
      };
  return (
    <Button className="bg-red-600" onClick={handleDelete} type="button">Eliminar</Button>

  )
}

export default DeleteButton
