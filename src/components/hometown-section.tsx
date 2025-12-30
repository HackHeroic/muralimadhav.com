"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const HOMETOWNS = [
  {
    name: "Chandler, AZ",
    image: "/hometowns/chandler.webp",
    mapUrl: "https://maps.google.com/?q=Chandler,AZ",
  },
  {
    name: "Hyderabad, TS",
    image: "/hometowns/hps.webp",
    mapUrl: "https://maps.google.com/?q=Hyderabad,Telangana,India",
  },
  {
    name: "Mumbai, MH",
    image: "/hometowns/dadar.webp",
    mapUrl: "https://maps.google.com/?q=Mumbai,Maharashtra,India",
  },
];

export function HometownSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 767);

    checkMobile(); // Initial check
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="hometowns" className="py-12">
      <h2 className="text-xl font-bold font-solway mb-6">
        I Grew Up in Six Cities
      </h2>
      <p className="text-sm mb-6">Here are some of my favorite clicks:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOMETOWNS.map((hometown, index) => (
          <Link
            key={hometown.name}
            href={hometown.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative overflow-hidden rounded-lg ${
              isMobile ? "aspect-[4/3]" : "aspect-[3/4]"
            } hover:scale-105 transition-transform duration-300`}
          >
            <Image
              src={hometown.image}
              alt={`Sunset in ${hometown.name}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-solway font-bold text-lg group-hover:underline">
                {hometown.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
