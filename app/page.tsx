import AcmeLogo from "@/app/ui/acme-logo";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import styles from "@/app/ui/home.module.css";
import Header from "@/app/ui/Header";
import Hero from "@/app/ui/Hero";
import { lusitana } from '@/app/ui/fonts'

export default function Page() {
  return (
    <>
      <Header />
      <Hero />
      <main className="flex min-h-screen flex-col p-6">
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 w-screen ">
            <h1 className={`${lusitana.className} text-gold text-2xl text-center`}>Categorías de Joyas</h1>
          </div>
        </div>
      </main>
    </>
  );
}
