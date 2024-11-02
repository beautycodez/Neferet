import Image from "next/image";
import { Nav } from "@/app/ui/Nav";


export default function Header() {
  return (
    <>
      <header className="bg-black">
        <div className="flex h-20 md:h-52 items-center justify-center rounded-lg p-4 shrink-0">
          <Image
            src="/blog-1.jpg"
            width={250}
            height={250}
            className="object-center"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
        <Nav />
      </header>
    </>
  );
}
