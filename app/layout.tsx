import "@/app/ui/global.css";
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import Header from "./ui/Header";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "El Anillo Perfecto",
  description: "El Anillo Perfecto para el Día Perfecto",
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body className={`${inter.className} antialiased`}>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}
