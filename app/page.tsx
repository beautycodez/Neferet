import Hero from "@/app/ui/Hero";
import { lusitana } from "@/app/ui/fonts";

export default function Page() {
  return (
    <>
      <Hero />
      <main className="flex min-h-screen flex-col p-1">
        <h1
          className={`${lusitana.className} text-gold text-2xl text-center sm:text-sm md:text-xl`}
        >
          Categorías de Joyas
        </h1>
      </main>
    </>
  );
}
