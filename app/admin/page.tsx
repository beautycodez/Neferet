import Form from '@/app/ui/admin/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import { Button } from '../ui/button';
import AddProductForm from '../ui/admin/Add-product-form';
import Gallery from '../ui/products/gallery';

export const metadata: Metadata = {
  title: 'Crear un Producto',
};

interface AdminPageProps {
  searchParams: Promise<{
    view?: string  }>;
}

export default async function Page({ searchParams }: AdminPageProps) {
  const  { view }  = await searchParams;

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
