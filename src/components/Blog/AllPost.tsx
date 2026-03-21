"use client";
import { BLOG_POST, CATEGORIES, CATEGORY_COLORS } from "@/app/data/blog";
import { ArrowRight, Calendar, ChevronRight, Clock, Tag } from "lucide-react";
import { useState } from "react";

// Infer the type from the imported data
type BlogPost = (typeof BLOG_POST)[number];
type Category = (typeof CATEGORIES)[number];

// No need to redeclare variables - use imported directly
export function AllPosts() {
  const [active, setActive] = useState<string>("All");

  return (
    <section className="py-14 px-6 lg:px-10 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Category filter tabs */}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {BLOG_POST.map(
            (
              { category, title, excerpt, date, readTime, image }: BlogPost,
              i: number,
            ) => (
              <article
                key={i}
                className="group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-[370px]"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
<picture>                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  /></picture>
                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-end p-5">


                  {/* Title - Smaller font */}
                  <h3
                    className="text-sm sm:text-base font-normal text-white leading-tight mb-1.5 transition-colors line-clamp-2"
                    style={{ fontFamily: "'Bona Nova', serif" }}
                  >
                    {title}
                  </h3>

                  {/* Excerpt - Smaller text, fewer lines */}
                  <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed mb-3 line-clamp-2">
                    {excerpt}
                  </p>

                  {/* Meta and Action - Compact */}
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/60 text-[10px] sm:text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {readTime}
                      </span>
                    </div>
                    <a
                      href="#"
                      className="text-white hover:text-mint transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full"
                      aria-label="Read article"
                    >
                      <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </article>
            ),
          )}
        </div>

        {/* Load more */}
        <div className="flex justify-center pt-4">
          <button className="bg-white hover:bg-stone-50 text-mintl border border-stone-300 hover:border-mint text-sm font-medium px-7 py-3.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm hover:shadow-md">
            Load More Articles <ChevronRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
