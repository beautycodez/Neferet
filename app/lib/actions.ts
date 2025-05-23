"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { fetchProductById } from "./data";
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(), // Mantén esto si es necesario en algún momento
  // Nuevos campos para tu formulario
  categoriaId: z.string({
    invalid_type_error: "Please select a category.",
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: "Please enter an amount greater than $0." }),
  talla: z.coerce
    .number()
    .positive({ message: "Talla must be a positive number." })
    .optional(), // Puedes marcarlo como opcional si no siempre es requerido
  cantidad: z.coerce
    .number()
    .int({ message: "Cantidad must be an integer." })
    .positive({ message: "Cantidad must be a positive number." }),
  descripcion: z.string().min(1, { message: "Descripción is required." }),
  nombre: z.string().min(1, { message: "Nombre is required." }),
  foto: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      { message: "Foto must be a valid image file (JPEG, PNG, GIF)." }
    )
    .optional(),
  publicId: z.string().optional(), // Agrega esto si necesitas el publicId para eliminar la imagen
  vendor_id: z.coerce
    .number()
    .int()
    .positive()
});
// Use Zod to update the expected types
const UpdateInvoice = FormSchema.omit({ id: true });

const CreateProduct = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    categoriaId?: string[];
    amount?: string[];
    talla?: string[];
    cantidad?: string[];
    descripcion?: string[];
    nombre?: string[];
    foto?: string[];
    vendor_id?: string[];
    
  };
  message?: string | null;
};

// Si no se proporciona una nueva foto, usa la foto existente

export async function createProduct(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateProduct.safeParse({
    categoriaId: formData.get("categoriaId"),
    amount: formData.get("amount"),
    talla: formData.get("talla"),
    cantidad: formData.get("cantidad"),
    descripcion: formData.get("descripcion"),
    nombre: formData.get("nombre"),
    foto: formData.get("foto"),
    vendor_id: formData.get("vendor_id"),
  });
  console.log("Validated fields:", validatedFields.data); // Log the validated fields

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    console.log("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { categoriaId, amount, talla, cantidad, descripcion, nombre, foto, vendor_id } =
    validatedFields.data;
  const amountInCents = amount * 100;
  let fotoBase64 = null; // Initialize fotoBase64 to null
  if (foto) {
    try {
      fotoBase64 = await handleFileUpload(foto);
      const publicId = fotoBase64.publicId; // Get the publicId from the upload result
      // Insert data into the database
      try {
        await sql`
      INSERT INTO products (categoriaId, amount, talla, cantidad, descripcion, nombre, foto, publicid, vendor_id)
      VALUES (${categoriaId}, ${amountInCents}, ${talla}, ${cantidad}, ${descripcion}, ${nombre}, ${fotoBase64.secureUrl}, ${fotoBase64.publicId}, ${vendor_id})
    `;
      } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
          message: `Database Error: Failed to Create Invoice and ${error}.`,
        };
      }

      // Revalidate the cache for the invoices page and redirect the user.
      revalidatePath("/admin");
      revalidatePath("/products");
      redirect("/products");
    } catch (error) {
      return {
        errors: { foto: ["Failed to upload the image. Please try again."] },
        message: "Image upload failed.",
      };
    }
  } else {
    return {
      errors: { foto: ["Image is required."] },
      message: "Missing image. Please upload a valid image.",
    };
  }
}

export async function updateProduct(
  id: string,
  prevState: State,
  formData: FormData
) {
  const photo = formData.get("foto");//Se pasa un archivo File vacio lo cual hace que optional() no funcione, por eso agregamos algo de codigo extra para la validacion

  const validatedFields = UpdateInvoice.safeParse({
    categoriaId: formData.get("categoriaId"),
    amount: formData.get("amount"),
    talla: formData.get("talla"),
    cantidad: formData.get("cantidad"),
    descripcion: formData.get("descripcion"),
    nombre: formData.get("nombre"),
    foto: photo instanceof File && photo.size > 0 ? photo : undefined, // Ignora archivos vacíos
    vendor_id: formData.get("vendor_id"),
  });

  if (!validatedFields.success) {
    console.log("Validation errors:", validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Update product.",
    };
  }
  // Prepare data for insertion into the database
  const { categoriaId, amount, talla, cantidad, descripcion, nombre, foto, vendor_id } =
    validatedFields.data;
  const amountInCents = amount * 100;

  let fotoBase64 = null;
  if (foto) {
    const currentProduct = await fetchProductById(id);
    deleteImgCloudinary(currentProduct.publicid); // Eliminar la imagen anterior de Cloudinary
    // Subir la nueva imagen a Cloudinary
    fotoBase64 = await handleFileUpload(foto);
    try {
      await sql`
        UPDATE products
        SET categoriaId = ${categoriaId}, amount = ${amountInCents}, talla = ${talla}, cantidad = ${cantidad}, descripcion = ${descripcion}, nombre = ${nombre}, foto = ${fotoBase64.secureUrl}, publicId = ${fotoBase64.publicId}, vendor_id = ${vendor_id}
        WHERE id = ${id}
      `;
    } catch (error) {
      return {
        message: `Database Error: Failed to update Products and ${error}.`,
      };
    }
  } else {
    // Obtén la foto existente de la base de datos
    const existingProduct = await fetchProductById(id);
    fotoBase64 = existingProduct.foto; // Usa la foto existente
    try {
      await sql`
        UPDATE products
        SET categoriaId = ${categoriaId}, amount = ${amountInCents}, talla = ${talla}, cantidad = ${cantidad}, descripcion = ${descripcion}, nombre = ${nombre}, foto = ${fotoBase64}, publicId = ${existingProduct.publicid}, vendor_id = ${vendor_id} 
        WHERE id = ${id}
      `;
    } catch (error) {
      return {
        message: `Database Error: Failed to update Products and ${error}.`,
      };
    }
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  redirect("/products");
}

export async function deleteProduct(id: string) {
  try {
    const product = await fetchProductById(id);
    const publicId = product.publicid; // Obtén el publicId del producto
    await deleteImgCloudinary(publicId); // Elimina la imagen de Cloudinary
    await sql`DELETE FROM products WHERE id = ${id}`;
    revalidatePath("/admin");
    revalidatePath("/products");
    redirect("/products");
    return { message: "Deleted product." };
  } catch (error) {
    return {
      message: `Database Error: Failed to delete product and ${error}.`,
    };
  }
}

async function handleFileUpload(
  file: File
): Promise<{ secureUrl: string; publicId: string }> {
  return new Promise(async (resolve, reject) => {
    // Verificar si el archivo es una imagen válida
    if (!file || !file.type.startsWith("image/")) {
      return reject(new Error("Invalid file type"));
    }

    // Convertir el archivo a un buffer
    const buffer = Buffer.from(await file.arrayBuffer()); // Convertir el archivo en buffer
    const fileStream = Readable.from(buffer); // Crear un Readable stream de Node.js a partir del buffer

    // Subir el archivo a Cloudinary utilizando el stream
    cloudinary.uploader
      .upload_stream(
        {
          folder: "productos", // Carpeta en Cloudinary donde se almacenará la imagen
          use_filename: true, // Usar el nombre original del archivo
          unique_filename: true, // No modificar el nombre del archivo
        },
        (error, result) => {
          if (error) {
            reject(error); // Si hay error, rechaza la promesa
          } else {
            resolve({
              secureUrl: result?.secure_url ?? "", // Retorna la URL segura
              publicId: result?.public_id ?? "", // Retorna el public_id
            });
          }
        }
      )
      .end(buffer); // Subir el buffer a Cloudinary
  });
}

async function deleteImgCloudinary(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}
