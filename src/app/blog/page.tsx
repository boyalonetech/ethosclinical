"use client";

import { Search, BookOpen, Tag, Clock, Users } from "lucide-react";
import CTABanner from "@/components/Home/CTA";
import Footer from "@/components/Home/Footer";
import BlogPage from "@/components/Blog/AllPost";
import { useState } from "react";
import { BlogPost } from "@/app/data/blog";

/* ─────────────────────────────────────────────
   BLOG HERO
───────────────────────────────────────────── */
interface BlogHeroProps {
  query: string;
  onQueryChange: (v: string) => void;
}

function BlogHero({ query, onQueryChange }: BlogHeroProps) {
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
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search articles…"
            className="w-full pl-10 pr-10 py-3 rounded-xl bg-white border border-stone-200 text-stone-800 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs leading-none"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   STATS STRIP  — derived from real posts
───────────────────────────────────────────── */
interface StatsStripProps {
  posts: BlogPost[];
  loading: boolean;
}

function StatsStrip({ posts, loading }: StatsStripProps) {
  const totalPosts = posts.length;

  const uniqueCategories = new Set(posts.map((p) => p.category)).size;

  const avgReadTime =
    posts.length > 0
      ? Math.round(
          posts.reduce((sum, p) => {
            const mins = parseInt(p.readTime ?? "0", 10);
            return sum + (isNaN(mins) ? 0 : mins);
          }, 0) / posts.length
        )
      : 0;

  const uniqueAuthors = new Set(posts.map((p) => p.author).filter(Boolean))
    .size;

  const stats = [
    { value: loading ? "—" : `${totalPosts}+`, label: "Articles Published", Icon: BookOpen },
    { value: loading ? "—" : `${uniqueCategories}`, label: "Topics Covered", Icon: Tag },
    { value: loading ? "—" : `${avgReadTime} min`, label: "Avg. Read Time", Icon: Clock },
    { value: loading ? "—" : `${uniqueAuthors}`, label: "Contributors", Icon: Users },
  ];

  return (
    <section className="bg-mint py-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map(({ value, label, Icon }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
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
   PAGE
───────────────────────────────────────────── */
export default function EthosBlogPage() {
  const [query, setQuery] = useState("");
  // Posts are owned here so StatsStrip can read them
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  return (
    <main className="min-h-screen font-['Geist',sans-serif]">
      <BlogHero query={query} onQueryChange={setQuery} />
      <StatsStrip posts={posts} loading={loading} />
      {/* BlogPage notifies us when data is ready */}
      <BlogPage
        searchQuery={query}
        onPostsLoaded={(p) => { setPosts(p); setLoading(false); }}
      />
      <CTABanner />
      <Footer />
    </main>
  );
}