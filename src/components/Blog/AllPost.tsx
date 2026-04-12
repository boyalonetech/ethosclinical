"use client";

import { getBlogPosts, CATEGORY_COLORS, BlogPost } from "@/app/data/blog";
import { ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface BlogPageProps {
  searchQuery?: string;
  onPostsLoaded?: (posts: BlogPost[]) => void;
  onMatchFound?: () => void;
}

export default function BlogPage({
  searchQuery = "",
  onPostsLoaded,
  onMatchFound,
}: BlogPageProps) {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      const fetchedPosts = await getBlogPosts();
      setPosts(fetchedPosts);
      onPostsLoaded?.(fetchedPosts); // ← bubble data up for stats
      setLoading(false);
    };
    loadPosts();
  // onPostsLoaded is a stable arrow defined inline on the parent — safe to omit
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBlogClick = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  function getAbbreviatedTime(date: string | Date | null | undefined) {
    if (!date) return "Invalid date";
    let target: Date;
    if (typeof date === "string") {
      const isoString = date.replace(" ", "T");
      target = new Date(isoString);
      if (isNaN(target.getTime())) target = new Date(date);
    } else {
      target = new Date(date);
    }
    if (isNaN(target.getTime())) return "Invalid date";

    const diffMs = Date.now() - target.getTime();
    if (diffMs < 0) return "Just now";

    const diffSecs  = Math.floor(diffMs / 1000);
    const diffMins  = Math.floor(diffSecs  / 60);
    const diffHours = Math.floor(diffMins  / 60);
    const diffDays  = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears  = Math.floor(diffDays / 365);

    if (diffSecs  < 60)  return `${diffSecs}  sec${diffSecs  !== 1 ? "s" : ""} ago`;
    if (diffMins  < 60)  return `${diffMins}  min${diffMins  !== 1 ? "s" : ""} ago`;
    if (diffHours < 24)  return `${diffHours} hr${diffHours  !== 1 ? "s" : ""}  ago`;
    if (diffDays  < 7)   return `${diffDays}  day${diffDays  !== 1 ? "s" : ""} ago`;
    if (diffDays  < 30)  { const w = Math.floor(diffDays / 7);  return `${w} wk${w  !== 1 ? "s" : ""} ago`; }
    if (diffMonths < 12) return `${diffMonths} mo${diffMonths !== 1 ? "s" : ""} ago`;
    return `${diffYears} yr${diffYears !== 1 ? "s" : ""} ago`;
  }

  // Category list derived from all posts (unaffected by search)
  const categories = useMemo(
    () => ["All", ...new Set(posts.map((p) => p.category))],
    [posts]
  );

  // Apply BOTH search and category filters
  const filteredPosts = useMemo(() => {
    let result = selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.author?.toLowerCase().includes(q) ||
          p.category?.toLowerCase().includes(q)
      );
    }

    return result;
  }, [posts, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-mint mx-auto mb-4" />
          <p className="text-black">Loading articles…</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-14 px-3 lg:px-10 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2">
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

        {/* Search result feedback */}
        {searchQuery.trim() && (
          <p className="text-center text-sm text-stone-500 -mt-4">
            {filteredPosts.length === 0
              ? `No articles found for "${searchQuery}"`
              : `${filteredPosts.length} article${filteredPosts.length !== 1 ? "s" : ""} found for "${searchQuery}"`}
          </p>
        )}

        {/* Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-stone-500">No blog posts match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredPosts.map((blog) => (
              <article
                key={blog.id}
                onClick={() => handleBlogClick(blog.id)}
                className="group relative rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 h-[370px] cursor-pointer"
              >
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

                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full text-white ${
                      CATEGORY_COLORS[blog.category as keyof typeof CATEGORY_COLORS] ||
                      "bg-stone-500"
                    }`}
                  >
                    {blog.category}
                  </span>
                </div>

                <div className="relative h-full flex flex-col justify-end p-5">
                  <h3
                    className="text-sm sm:text-base font-normal text-white leading-tight mb-1.5 line-clamp-2"
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
                    <div className="text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm p-1.5 rounded-full">
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {filteredPosts.length > 6 && (
          <div className="flex justify-center pt-4">
            <button
              className="bg-white hover:bg-stone-50 text-stone-600 border border-stone-300 hover:border-stone-400 text-sm font-medium px-7 py-3.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm hover:shadow-md"
              onClick={() => alert("Implement pagination here")}
            >
              Load More Articles <ChevronRight size={15} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}