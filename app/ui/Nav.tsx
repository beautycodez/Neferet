'use client'
import clsx from 'clsx';
import HamburgerButton  from '@/app/ui/Hamburguer-button'
import { lusitana } from '@/app/ui/fonts';

export const navItems = [
    {name: "Home", href: "/"},
    {name: "Products", href: "/products"},
    {name: "Admin", href: "/admin"},
    {name: "Blog", href: "/blog"},
    {name: "Nosotros", href: "/nosotros"}
    ]

export default function Nav() {
    
    return(
        <>
        <nav className='hidden md:block'>
            <ul className={`${lusitana.className} flex justify-between mx-36 p-5`}>
                {navItems.map((element, index) => <li key={index} className="text-white text-xl p-5 hover:bg-gold hover:text-yellow-600"><a href={element.href}>{element.name}</a></li>)}
            </ul>
        </nav>
        <nav className='p-10'>
            <HamburgerButton />
        </nav>
        </>
    )
}