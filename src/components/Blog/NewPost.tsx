import { CATEGORY_COLORS, FEATURED_POST } from "@/app/data/blog";
import { ArrowRight, Calendar, Clock, User, Eye } from "lucide-react";

export default function FeaturedPost() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 lg:px-8 xl:px-10 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Featured badge - Responsive */}
        <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-mint/10 flex items-center justify-center">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-mint animate-pulse" />
          </div>
          <p className="text-mint text-xs sm:text-sm font-semibold uppercase tracking-wider">
            Featured Article
          </p>
          <div className="flex-1 h-px bg-gradient-to-r from-mint/20 to-transparent" />
        </div>

        {/* Main card with background image */}
        <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden hover:shadow-xl sm:hover:shadow-2xl transition-all duration-500">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={FEATURED_POST.image}
              alt={FEATURED_POST.title}
              className="w-full h-full object-cover group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-700 ease-out"
            />
            {/* Responsive gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 sm:group-hover:from-black/70 sm:group-hover:via-black/30 transition-all duration-500" />
          </div>

          {/* Content Container - Fully responsive */}
          <div className="relative min-h-[450px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] xl:min-h-[700px] flex flex-col justify-center px-5 sm:px-8 md:px-10 lg:px-12 py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Category Badge */}
            <div className="mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <span
                className={`inline-flex text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-full shadow-lg ${CATEGORY_COLORS[FEATURED_POST.category]} backdrop-blur-sm bg-opacity-90`}
              >
                {FEATURED_POST.category}
              </span>
            </div>

            {/* Title - Fully responsive text sizes */}
            <h2
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-white leading-tight tracking-tight mb-2 sm:mb-3 md:mb-4 max-w-full sm:max-w-3xl lg:max-w-4xl"
              style={{ fontFamily: "'Bona Nova', serif" }}
            >
              {FEATURED_POST.title}
            </h2>

            {/* Excerpt - Responsive visibility and sizing */}
            <p className="hidden sm:block text-white/80 text-sm sm:text-base md:text-lg leading-relaxed max-w-full sm:max-w-xl md:max-w-2xl mb-4 sm:mb-5 md:mb-6">
              {FEATURED_POST.excerpt}
            </p>
            
            {/* Short excerpt for mobile */}
            <p className="sm:hidden text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
              {FEATURED_POST.excerpt}
            </p>

            {/* Stats Row - Responsive layout */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-6 flex-wrap mb-6 sm:mb-7 md:mb-8">
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm">
                <Eye size={12} className="sm:w-4 sm:h-4 text-mint" />
                <span>8 min read</span>
              </div>
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm">
                <Calendar size={12} className="sm:w-4 sm:h-4 text-mint" />
                <span className="hidden xs:inline">{FEATURED_POST.date}</span>
                <span className="xs:hidden">{FEATURED_POST.date.split(' ')[0]}</span>
              </div>
              <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full bg-white/40" />
              <div className="flex items-center gap-1.5 sm:gap-2 text-white/70 text-xs sm:text-sm">
                <Clock size={12} className="sm:w-4 sm:h-4 text-mint" />
                <span>{FEATURED_POST.readTime}</span>
              </div>
            </div>

            {/* Author & Action Section */}
            <div className="flex flex-col gap-4 sm:gap-5 md:gap-6 pt-4 sm:pt-5 md:pt-6 border-t border-white/20">
              {/* Author Info and Read More */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-mint to-mintl flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-lg flex-shrink-0">
                    {FEATURED_POST.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-semibold">
                      {FEATURED_POST.author}
                    </p>
                    <p className="text-white/60 text-[10px] sm:text-xs">
                      {FEATURED_POST.authorRole || "Senior Writer"}
                    </p>
                  </div>
                </div>

                {/* Read More Link - Responsive button */}
                <a
                  href="#"
                  className="group/link inline-flex items-center gap-1.5 sm:gap-2 bg-white/10 backdrop-blur-sm hover:bg-white/20 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-white text-xs sm:text-sm font-semibold transition-all duration-300 border border-white/20 hover:border-white/40 w-full sm:w-auto justify-center sm:justify-start"
                >
                  <span>Read full article</span>
                  <ArrowRight
                    size={12}
                    className="sm:w-4 sm:h-4 group-hover/link:translate-x-1 transition-transform duration-200"
                  />
                </a>
              </div>

              {/* Additional metadata - Responsive */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-[10px] sm:text-xs text-white/50 flex-wrap">
                <span className="flex items-center gap-1">
                  <User size={10} className="sm:w-3 sm:h-3" />
                  <span className="hidden xs:inline">{FEATURED_POST.author}</span>
                  <span className="xs:hidden">{FEATURED_POST.author.split(' ')[0]}</span>
                </span>
                <span>•</span>
                <span>Updated recently</span>
                <span>•</span>
                <span className="hidden sm:inline">Premium content</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}