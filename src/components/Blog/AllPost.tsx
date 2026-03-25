"use client";
import { getBlogPosts, CATEGORY_COLORS, BlogPost } from "@/app/data/blog";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Define loadPosts before using it in useEffect
  const loadPosts = async () => {
    setLoading(true);
    const fetchedPosts = await getBlogPosts();

    // Debug: Log the first post's date to see what format it's in
    if (fetchedPosts.length > 0) {
      console.log("Raw date from PocketBase:", fetchedPosts[0].date);
      console.log("Type of date:", typeof fetchedPosts[0].date);
    }

    setPosts(fetchedPosts);
    setLoading(false);
  };

  useEffect(() => {
    // Disable the rule for this specific effect since it's a standard data fetching pattern
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts();
  }, []);

  const handleBlogClick = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  function getAbbreviatedTime(date: string | Date | null | undefined) {
    if (!date) return "Invalid date";

    // Handle PocketBase date format specifically
    let target: Date;

    if (typeof date === "string") {
      // PocketBase often returns dates like "2024-01-15 10:30:00.123Z" or "2024-01-15 10:30:00"
      // Convert to proper ISO format by replacing space with T
      const isoString = date.replace(" ", "T");
      target = new Date(isoString);

      // If that fails, try the original
      if (isNaN(target.getTime())) {
        target = new Date(date);
      }
    } else {
      target = new Date(date);
    }

    if (isNaN(target.getTime())) {
      console.error("Invalid date:", date);
      return "Invalid date";
    }

    const now = new Date();
    const diffMs = now.getTime() - target.getTime();

    // Debug: Log the diff to see what's happening
    console.log("Target date:", target);
    console.log("Now:", now);
    console.log("Diff in ms:", diffMs);
    console.log("Diff in days:", diffMs / (1000 * 60 * 60 * 24));

    // If diffMs is negative, the date is in the future
    if (diffMs < 0) {
      // For debugging - log future dates
      console.warn(
        "Future date detected:",
        date,
        "Target:",
        target,
        "Now:",
        now,
      );
      return "Just now";
    }

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    // Compact format with "ago"
    if (diffSecs < 60) return `${diffSecs} sec${diffSecs !== 1 ? "s" : ""} ago`;
    if (diffMins < 60) return `${diffMins} min${diffMins !== 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hr${diffHours !== 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? "s" : ""} ago`;
    if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} wk${weeks !== 1 ? "s" : ""} ago`;
    }
    if (diffMonths < 12)
      return `${diffMonths} mo${diffMonths !== 1 ? "s" : ""} ago`;
    return `${diffYears} yr${diffYears !== 1 ? "s" : ""} ago`;
  }

  // Get unique categories
  const categories = ["All", ...new Set(posts.map((post) => post.category))];

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post) => post.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint mx-auto mb-4"></div>
          <p className="text-black">Loading articles...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 px-3 lg:px-10 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-stone-700 to-stone-900 bg-clip-text text-transparent mb-4">
            Our Blog
          </h1>
          <p className="text-stone-600 text-lg max-w-2xl mx-auto">
            Insights, stories, and resources for mental health professionals
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium ${
                selectedCategory === category
                  ? "bg-mint text-white shadow-md"
                  : "bg-white text-black hover:bg-brown/10 border border-brown/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500">
              No blog posts found in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((blog) => (
              <article
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-[370px] cursor-pointer"
              >
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/600x400?text=Blog+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/80 group-hover:via-black/40 transition-all duration-500" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                      CATEGORY_COLORS[
                        blog.category as keyof typeof CATEGORY_COLORS
                      ] || "bg-stone-500"
                    }`}
                  >
                    {blog.category}
                  </span>
                </div>

                {/* Content Container */}
                <div className="relative h-full flex flex-col justify-end p-5">
                  <h3
                    className="text-sm sm:text-base font-normal text-white leading-tight mb-1.5 transition-colors line-clamp-2"
                    style={{ fontFamily: "'Bona Nova', serif" }}
                  >
                    {blog.title}
                  </h3>

                  <p className="text-white/70 text-[11px] sm:text-xs leading-relaxed mb-3 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/60 text-[10px] sm:text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {getAbbreviatedTime(blog.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {blog.readTime}
                      </span>
                    </div>
                    <div className="text-white hover:text-stone-300 transition-colors bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Load more - You can implement pagination here */}
        {filteredPosts.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              className="bg-white hover:bg-stone-50 text-stone-600 border border-stone-300 hover:border-stone-400 text-sm font-medium px-7 py-3.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
              onClick={() =>
                alert("Load more functionality - implement pagination")
              }
            >
              Load More Articles <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
