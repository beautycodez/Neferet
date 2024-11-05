import Form from '@/app/ui/admin/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Crear un Producto',
};

export default async function Page() {

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
    </main>
  );
}