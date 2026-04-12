"use client";

import { FOOTER_LINKS } from "@/app/data/footer";
import { SOCIAL_ICONS } from "@/app/data/icon";
import { ChevronRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-yellow-50 pt-14 pb-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pb-10 border-b border-stone-200">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-0">
              <Image
                alt="/"
                width={100}
                height={100}
                src="/logo.webp"
                className=""
              />
            </Link>
            <p className="text-stone-600 text-sm leading-relaxed max-w-xs">
              A supportive space to reflect, grow, and feel understood —
              offering compassionate, personalised mental health support to
              navigate life&apos;s challenges.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href={
                    label === "Instagram"
                      ? "https://www.instagram.com/ethosclinicalsupervision?igsh=MXhnYnU0NHE1Z2FxdQ%3D%3D&utm_source=qr"
                      : label === "Twitter"
                        ? "https://x.com/ethos_clinical?s=11"
                        : label === "Facebook"
                          ? "https://www.facebook.com"
                          : label === "Youtube"
                            ? "https://youtube.com/@ethosclinicalsupervision?si=1B_aI_G0OwF2b-Mh"
                            : "#"
                  }
                  aria-label={label}
                  target="_blank"
                  className="w-9 h-9 rounded-xl text-mintl hover:text-white hover:bg-mint flex items-center justify-center transition-colors"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-stone-900 font-semibold text-sm tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href={
                      link === "Booking" ? "/book" : link.toLocaleLowerCase()
                    }
                    className="text-stone-600 text-sm hover:text-stone-900 transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight size={12} className="text-stone-400" />
                    {link}
                  </a>
                </li>
              ))}
              <li>
                {" "}
                <a
                  href="/admin"
                  className="text-stone-600 text-sm hover:text-stone-900 transition-colors flex items-center gap-1.5"
                >
                  <ChevronRight size={12} className="text-stone-400" />
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-4">
            <h4 className="text-stone-900 text-xl font-normal font-['Geist',sans-serif]">
              Stay Updated
            </h4>
            <p className="text-stone-600 text-sm leading-relaxed">
              Subscribe to our newsletter for the latest podcast updates, news,
              and exclusive offers.
            </p>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative flex-1 min-w-0">
                <Mail
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400"
                />
                <input
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 bg-white rounded-lg text-sm text-stone-800 placeholder-stone-400 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <button className="bg-mint hover:bg-mintl text-white text-sm font-medium px-5 py-3 rounded-md transition-colors whitespace-nowrap">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-stone-400 text-xs">
          <span>
            © {new Date().getFullYear()} Ethos Clinical Supervision. All rights
            reserved.
          </span>
          <span>Privacy Policy · Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
