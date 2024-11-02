import clsx from 'clsx';


export function Nav() {
    const navItems = [
    {name: "Home", href: "/"},
    {name: "Blog", href: "/blog"},
    {name: "Nosotros", href: "/nosotros"}
    ]
    return(
        <>
        <nav>
            <ul className="flex justify-between mx-36 p-5">
                {navItems.map((element, index) => <li key={index} className="text-gold p-5 hover:bg-gold hover:text-black"><a href={element.href}>{element.name}</a></li>)}
            </ul>
        </nav>
        </>
    )
}