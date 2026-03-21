"use client";
import { NAV_LINKS } from "@/app/data/nav";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="w-full bg-stone-50 sticky top-0 z-50 border-b border-stone-200"
      onClick={() => setOpen(!open)}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0">
          <Image
            alt="/"
            width={100}
            height={100}
            src="/logo1.jpg"
            className="h-12 w-12 lg:w-15 lg:h-15 mix-blend-color-overlay bg-mint"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className={`text-base font-medium transition-colors ${
                link.link === "home"
                  ? "text-[#6d754d]"
                  : "text-stone-900 hover:text-mintl"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button className="bg-mint hover:bg-stone-700 text-white text-sm font-medium px-5 py-3 rounded-md transition-colors">
            Book a Counsellor
          </button>
        </div>

        {/* Burger */}
        <button
          className="md:hidden p-2 text-stone-700"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <>
          <div className="md:hidden fixed w-full shadow  bg-black/30 backdrop-blur-xs h-screen border-t border-stone-200 px-6 pb-6 flex flex-col gap-4" />
          <div className="md:hidden fixed w-full shadow  bg-stone-50 border-t border-stone-200 pt-4 px-6 pb-6 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                className="text-stone-800 text-base font-medium py-1"
              >
                {link.name}
              </Link>
            ))}
            <button className="bg-mint text-white text-sm font-medium px-5 py-3 rounded-md mt-2">
              Book a Counsellor
            </button>
          </div>
        </>
      )}
    </header>
  );
}
