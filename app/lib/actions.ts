"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readFile } from "fs/promises";
// import { signIn } from '@/auth';
// import { AuthError } from 'next-auth';

const FormSchema = z.object({
  id: z.string(), // Mantén esto si es necesario en algún momento
  // Nuevos campos para tu formulario
  categoriaId: z.string({
    invalid_type_error: "Please select a category.",
  }),
  amount: z
    .coerce
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
  descripcion: z
    .string()
    .min(1, { message: "Descripción is required." }),
  nombre: z
    .string()
    .min(1, { message: "Nombre is required." }),
    foto: z
    .instanceof(File)
    .refine(
      (file) => ["image/jpeg", "image/png", "image/gif"].includes(file.type),
      { message: "Foto must be a valid image file (JPEG, PNG, GIF)." }
    )
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
  };
  message?: string | null;
};

export async function createProduct(prevState: State, formData: FormData) {
  // Validate form using Zod
  const validatedFields = CreateProduct.safeParse({
    categoriaId: formData.get("categoriaId"),
    amount: formData.get("amount"),
    talla: formData.get("talla"),
    cantidad: formData.get("cantidad"),
    descripcion: formData.get("descripcion"),
    nombre: formData.get("nombre"),
    foto: formData.get("foto")
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }

  // Prepare data for insertion into the database
  const { categoriaId, amount, talla, cantidad, descripcion, nombre, foto } = validatedFields.data;
  const amountInCents = amount * 100;
  const fotoBase64 = await handleFileUpload (foto);

  console.log(foto)


  // Insert data into the database
  try {
    await sql`
      INSERT INTO products (categoriaId, amount, talla, cantidad, descripcion, nombre, foto)
      VALUES (${categoriaId}, ${amountInCents}, ${talla}, ${cantidad}, ${descripcion}, ${nombre}, ${fotoBase64})
    `;
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: `Database Error: Failed to Create Invoice and ${error}.`
    };
  }

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateProduct(id: string, prevState: State, formData: FormData) {
  const validatedFields = UpdateInvoice.safeParse({
    categoriaId: formData.get("categoriaId"),
    amount: formData.get("amount"),
    talla: formData.get("talla"),
    cantidad: formData.get("cantidad"),
    descripcion: formData.get("descripcion"),
    nombre: formData.get("nombre"),
    foto: formData.get("foto")
  });
 
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update product.',
    };
  }
  // Prepare data for insertion into the database
  const { categoriaId, amount, talla, cantidad, descripcion, nombre, foto } = validatedFields.data;
  const amountInCents = amount * 100;
  const fotoBase64 = await handleFileUpload (foto);

  try {
    await sql`
          UPDATE products
          SET categoriaId = ${categoriaId}, amount = ${amountInCents}, talla = ${talla}, cantidad = ${cantidad}, descripcion = ${descripcion}, nombre = ${nombre}, foto = ${fotoBase64}
          WHERE id = ${id}
        `;
  } catch (error) {
    return { message: `Database Error: Failed to update Products and ${error}.` };
  }

  revalidatePath("/admin");
  revalidatePath("/products");
  redirect("/admin");
}

export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath("/dashboard/invoices");
    return { message: "Deleted Invoice." };
  } catch (error) {
    return { message: `Database Error: Failed to delete Invoice and ${error}.` };
  }
}

export async function handleFileUpload(file: File ) {
  try {
    // Lee el contenido del archivo como un buffer
    const buffer = await file.arrayBuffer();
    // Si necesitas convertirlo a Base64:
    const base64String = Buffer.from(buffer).toString("base64");
    
    return base64String; // Ahora tienes el contenido de la imagen en Base64
  } catch (error) {
    console.error("Error reading file:", error);
  }
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData,
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }
