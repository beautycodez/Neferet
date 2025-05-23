import { useState } from "react";
import { lusitana } from "@/app/ui/fonts";
import { navItems } from "./Nav";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`${lusitana.className} relative`}>
      {/* Botón de hamburguesa */}
      <button
        className="flex flex-col items-center justify-center w-8 h-8 md:hidden"
        onClick={toggleMenu}
      >
        <div
          className={`h-0.5 w-6 bg-white transition-transform transform ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></div>
        <div
          className={`h-0.5 w-6 bg-white transition-opacity ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></div>
        <div
          className={`h-0.5 w-6 bg-white transition-transform transform ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></div>
      </button>

      {/* Menú que se muestra y oculta */}
      {isOpen && (
        // <nav className="absolute top-16 left-0 w-full bg-black text-white p-4">
        <nav className='absolute top-16 left-0 w-full bg-black text-white p-4 z-50'>
        <ul className="flex flex-col space-y-2">
            {navItems.map((element, index) => <li key={index} className="text-white text-xl p-5 hover:bg-gold hover:text-yellow-500"><a href={element.href}>{element.name}</a></li>)}
        </ul>
    </nav>
        
      )}
    </div>
  );
}

export default HamburgerMenu;
