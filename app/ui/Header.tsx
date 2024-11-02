import Image from "next/image";
import { Nav } from "@/app/ui/Nav";

export default function Header() {
  return (
    <>
      <header className="bg-black min-h-[80px] md:min-h-[208px]">
        {/* min-h-[80px] es equivalente a 20 * 4px, y 208px es 52 * 4px */}
        <div className="flex h-20 md:h-52 items-center justify-center rounded-lg p-4 shrink-0">
          <Image
            src="/logo.jpg"
            width={200}
            height={200}
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
        <Nav />
      </header>
    </>
  );
}
