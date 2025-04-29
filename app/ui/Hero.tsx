import React from "react";
import Image from "next/image";
import UserButton from "./user-button";

export default function Hero() {
  return (
    <>
      <div className="relative max-h-[700px] overflow-hidden">
        <Image
          src="/home-6.jpg"
          alt="hero image"
          width={1330}
          height={812}
          className="w-full h-auto object-bottom object-cover"
          // style={{ objectPosition: '50% 100%' }}
        />
        
        <section className="absolute top-2/4 left-16 z-20 text-gold"> {/* Ajusta top y left según sea necesario */}
          <h1 className="text-4xl font-bold" style={{textShadow:"0 0 3px #DAD6D2"}}>El Anillo Perfecto</h1>
          <h2 className="text-2xl">Para el Día Perfecto</h2>
        </section>
      </div>
      <UserButton />
    </>
  );
}
