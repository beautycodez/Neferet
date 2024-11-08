import Form from '@/app/ui/admin/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';
import { Button } from '../ui/button';
import AddProductForm from '../ui/admin/Add-product-form';
import Gallery from '../ui/products/gallery';

export const metadata: Metadata = {
  title: 'Crear un Producto',
};

export default function Page({ searchParams }: { searchParams?: { view?: string } }) {
  const view = searchParams?.view;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Admin', href: '/admin', active: true },
        ]}
      />
      <Form />
      {view === 'add' && <AddProductForm />}
      {view === 'edit' && <Gallery edit={true} />}
    </main>
  );
}
