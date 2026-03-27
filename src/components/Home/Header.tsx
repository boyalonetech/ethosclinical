"use client";
import { NAV_LINKS } from "@/app/data/nav";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <header className="w-full bg-stone-50 relative top-0 z-50 border-b border-stone-200">
      <div className=" px-6 lg:px-10 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0">
          <Image
            alt="/"
            width={100}
            height={100}
            src="/logo.webp"
            className=""
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.link}
              className={`text-medium font-medium transition-colors ${
                link.link === "home"
                  ? "text-browwn"
                  : "text-stone-900 hover:text-brown"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            className="bg-[#8E9867]  hover:bg-brown text-white text-sm font-[500] px-5 py-3 rounded-md transition-colors"
            onClick={() => router.push("/book")}
          >
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
          <div
            className="md:hidden fixed w-full shadow  bg-black/30 backdrop-blur-xs h-screen border-t border-stone-200 px-6 pb-6 flex flex-col gap-4"
            onClick={() => setOpen(!open)}
          />
          <div
            className="md:hidden fixed w-full shadow  bg-stone-50 border-t border-stone-200 pt-4 px-6 pb-6 flex flex-col gap-4"
            onClick={() => setOpen(!open)}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.link}
                className="text-stone-800 text-base font-medium py-1"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => router.push("/book")}
              className="bg-[#8E9867] font-medium hover:bg-brown text-white text-sm font-medium px-5 py-3 rounded-md mt-2"
            >
              Book a Counsellor
            </button>
          </div>
        </>
      )}
    </header>
  );
}
