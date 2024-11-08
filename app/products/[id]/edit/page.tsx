
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchProductById } from "@/app/lib/data";
import EditProductForm from "@/app/ui/admin/Edit-product-form";


async function Page( { params }: { params: { id: string } }) {
    const id =  await params.id;
    const [product] = await Promise.all([
        fetchProductById(id),
      ]);

    return (
        <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <EditProductForm products={product} />
    </main>
    )
        
};

export default Page;