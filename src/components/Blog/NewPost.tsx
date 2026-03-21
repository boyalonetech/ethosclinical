import { CATEGORY_COLORS, FEATURED_POST } from "@/app/data/blog";
import { ArrowRight, Calendar, Clock, User, Eye } from "lucide-react";

export default function FeaturedPost() {
  return (
    <section className="py-16 px-6 lg:px-10 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Featured badge */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full bg-mint/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
          </div>
          <p className="text-mint text-sm font-semibold uppercase tracking-wider">
            Featured Article
          </p>
          <div className="flex-1 h-px bg-gradient-to-r from-mint/20 to-transparent" />
        </div>

        {/* Main card with background image */}
        <div className="relative group rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-500">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <picture>
              {" "}
              <img
                src={FEATURED_POST.image}
                alt={FEATURED_POST.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </picture>
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 group-hover:via-black/30 transition-all duration-500" />
          </div>

          {/* Content Container */}
          <div className="relative min-h-[600px] lg:min-h-[700px] flex flex-col justify-end p-8 sm:p-10 lg:p-12">
            {/* Category Badge */}
            <div className="mb-6">
              <span
                className={`inline-flex text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg ${CATEGORY_COLORS[FEATURED_POST.category]} backdrop-blur-sm bg-opacity-90`}
              >
                {FEATURED_POST.category}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight lg:leading-tight tracking-tight mb-4 max-w-4xl"
              style={{ fontFamily: "'Bona Nova', serif" }}
            >
              {FEATURED_POST.title}
            </h2>

            {/* Excerpt */}
            <p className="text-white/80 text-base lg:text-lg leading-relaxed max-w-2xl mb-6">
              {FEATURED_POST.excerpt}
            </p>

            {/* Stats Row */}
            <div className="flex items-center gap-6 flex-wrap mb-8">
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Eye size={16} className="text-mint" />
                <span>8 min read</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Calendar size={16} className="text-mint" />
                <span>{FEATURED_POST.date}</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-2 text-white/70 text-sm">
                <Clock size={16} className="text-mint" />
                <span>{FEATURED_POST.readTime}</span>
              </div>
            </div>

            {/* Author & Action Section */}
            <div className="flex flex-col gap-6 pt-6 border-t border-white/20">
              {/* Author Info and Read More */}
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-mint to-mintl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {FEATURED_POST.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold">
                      {FEATURED_POST.author}
                    </p>
                    <p className="text-white/60 text-xs">
                      {FEATURED_POST.authorRole || "Senior Writer"}
                    </p>
                  </div>
                </div>

                {/* Read More Link */}
                <a
                  href="#"
                  className="group/link inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-5 py-2.5 rounded-full text-white text-sm font-semibold transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  <span>Read full article</span>
                  <ArrowRight
                    size={16}
                    className="group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </div>

              {/* Additional metadata */}
              <div className="flex items-center gap-4 text-xs text-white/50">
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {FEATURED_POST.author}
                </span>
                <span>•</span>
                <span>Updated recently</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
