import Form from '@/app/ui/admin/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import AddProductForm from '../ui/admin/Add-product-form';
import Gallery from '../ui/products/gallery';
import { auth } from '@/auth';
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: 'Crear un Producto',
};

interface AdminPageProps {
  searchParams: Promise<{
    view?: string  }>;
}

export default async function Page({ searchParams }: AdminPageProps) {
  const  { view }  = await searchParams;
  const session = await auth()

  //verificar si el usuario tiene el rol de admin
  if (!session || !session.user || session.user.role !== "admin") {
  
    return redirect("/");
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          {
            label: 'Admin',
            href: '/admin',
            active: true,
          },
        ]}
      />
      <Form />
      {view === 'add' && <AddProductForm />}
      {view === 'edit' && <Gallery edit={true} />}
    </main>
  );
}
