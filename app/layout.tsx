import "@/app/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import Header from "./ui/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "El Anillo Perfecto!",
  description: "El Anillo Perfecto para el Día Perfecto",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <div className="flex h-full min-h-screen w-full flex-col justify-between">
            <Header />
            <main className="mx-auto w-full max-w-3xl flex-auto px-4 py-4 sm:px-6 md:py-6">
              {children}
            </main>
          </div>
        </body>
      </html>
    </>
  );
}
