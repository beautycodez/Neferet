import React from 'react';
import Gallery from "@/app/ui/products/gallery";
import Breadcrumbs from '../ui/invoices/breadcrumbs';
// I have changed the product
// I have changed it again
const page = () => {
    return (
        <div>
            <Breadcrumbs breadcrumbs={[
          { label: 'Home', href: '/' },
          {
            label: 'Products',
            href: '/products',
            active: true,
          },]} />
            <Gallery edit={false}/>
        </div>
    );
};

export default page;