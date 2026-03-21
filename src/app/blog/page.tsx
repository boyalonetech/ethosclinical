"use client";

import { Search } from "lucide-react";
import { STATS } from "../data/blog";
import FeaturedPost from "@/components/Blog/NewPost";
import CTABanner from "@/components/Home/CTA";
import Footer from "@/components/Home/Footer";
import { AllPosts } from "@/components/Blog/AllPost";

/* ─────────────────────────────────────────────
   BLOG HERO
───────────────────────────────────────────── */
function BlogHero() {
  return (
    <section className="bg-stone-50 pt-16 pb-10 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-gray-500 border border-stone-200 rounded-full px-4 py-1.5">
          The Ethos Blog
        </span>
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-normal text-stone-900 tracking-tight max-w-3xl leading-tight"
          style={{ fontFamily: "'Bona Nova', serif" }}
        >
          Thinking Deeply About the Work That Matters
        </h1>
        <p className="text-mint text-base sm:text-lg leading-relaxed max-w-xl">
          Insights on reflective practice, ethical supervision, and the human
          dimensions of frontline therapeutic work.
        </p>

        {/* Search */}
        <div className="relative w-full max-w-md mt-2">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Search articles…"
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────────── */
function StatsStrip() {
  return (
    <section className="bg-mint py-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-mint flex items-center justify-center shrink-0">
              <Icon size={18} className="text-white" />
            </div>
            <div>
              <p className="text-white text-xl font-semibold leading-none">
                {value}
              </p>
              <p className="text-stone-300 text-xs mt-1">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ALL POSTS GRID
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
export default function EthosBlogPage() {
  return (
    <main className="min-h-screen font-['Geist',sans-serif]">
      <BlogHero />
      <StatsStrip />
      <FeaturedPost />
      <AllPosts />
      <CTABanner />
      <Footer />
    </main>
  );
}
