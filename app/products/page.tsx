import React from 'react';
import Gallery from "@/app/ui/products/Gallery";
import Breadcrumbs from '../ui/invoices/breadcrumbs';

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
            <Gallery />
        </div>
    );
};

export default page;