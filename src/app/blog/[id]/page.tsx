// app/blog/[id]/page.tsx
"use client";

import { ArrowLeft, User, Calendar, Clock, Heart, Share2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { getBlogPosts, BlogPost, CATEGORY_COLORS } from "@/app/data/blog";

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  // Define loadPost with useCallback to memoize it
  const loadPost = useCallback(async () => {
    setLoading(true);
    try {
      const posts = await getBlogPosts();
      const foundPost = posts.find((p) => p.id === params.id);
      setPost(foundPost || null);
    } catch (error) {
      console.error("Error loading post:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]); // Add params.id as dependency

  useEffect(() => {
    loadPost();
  }, [loadPost]); // Now loadPost is included in dependency array

  // Function to render content sections safely
  const renderContent = () => {
    if (!post) return null;

    // If post has sections array and it's populated
    if (post.sections && post.sections.length > 0) {
      return post.sections.map((section) => {
        switch (section.type) {
          case "heading":
            return (
              <div key={section.id} className="space-y-4">
                {section.title && (
                  <p className="text-mint text-xl md:text-2xl font-normal leading-relaxed">
                    {section.title}
                  </p>
                )}
                <p className="text-black text-base font-normal leading-relaxed">
                  {section.content}
                </p>
              </div>
            );
          case "bulletList":
            return (
              <div key={section.id} className="space-y-4">
                {section.title && (
                  <p className="text-black text-base font-normal leading-relaxed">
                    {section.title}
                  </p>
                )}
                <div className="space-y-2">
                  {section.items?.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-4 h-4 mt-2 flex-shrink-0">
                        <div className="w-2.5 h-2.5 scale-60 bg-black/90 rounded-full" />
                      </div>
                      <p className="text-black text-base font-normal leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          case "numberedList":
            return (
              <div key={section.id} className="space-y-4">
                {section.title && (
                  <p className="text-black text-base font-normal leading-relaxed">
                    {section.title}
                  </p>
                )}
                <ol className="list-decimal pl-6 space-y-2">
                  {section.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-black text-base font-normal leading-relaxed"
                    >
                      {item}
                    </li>
                  ))}
                </ol>
              </div>
            );
          case "paragraph":
          default:
            return (
              <p
                key={section.id}
                className="text-black text-base font-normal leading-relaxed mb-6"
              >
                {section.content}
              </p>
            );
        }
      });
    }

    // Fallback: If no sections, try to render from excerpt
    if (post.excerpt) {
      return (
        <div className="space-y-4">
          <p className="text-black text-base font-normal leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      );
    }

    return (
      <p className="text-black text-base font-normal leading-relaxed">
        No content available for this post.
      </p>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-mint">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-500 mx-auto mb-4"></div>
          <p className="text-mint">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">
            Post Not Found
          </h1>
          <p className="text-stone-600 mb-8">
            The blog post you&apos;re looking for doesn&apos;t exist.
          </p>
          <button
            onClick={() => router.push("/blog")}
            className="px-6 py-3 bg-stone-700 text-white rounded-lg hover:bg-stone-800 transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-white overflow-x-hidden">
      <div className="w-full bg-stone-50">
        <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
          <div className="max-w-[1021px] mx-auto">
            {/* Blog Navigation */}
            <div className="flex justify-between items-center mb-8">
              <button
                onClick={() => router.push("/blog")}
                className="flex items-center gap-2 text-mint hover:text-brown transition-colors"
              >
                <ArrowLeft size={20} />
                Back to all articles
              </button>
            </div>

            {/* Featured Image */}
            <picture className="relative w-full aspect-[1000/643] rounded-[20px] overflow-hidden mb-8 shadow-lg">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/1000x643?text=Blog+Image";
                }}
              />
            </picture>

            {/* Category Badge */}
            <div className="mb-4">
              <span
                className={`inline-block px-3 py-1 text-sm font-medium rounded-full text-white ${CATEGORY_COLORS[post.category] || "bg-stone-500"}`}
              >
                {post.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl lg:text-5xl text-mint text-center font-normal leading-tight md:leading-10 mb-4">
              {post.title}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-black text-center font-normal leading-relaxed mb-6">
                {post.subtitle}
              </p>
            )}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-mint mb-8 pb-6 border-b border-gray-200">
              <span className="flex items-center gap-1">
                <User size={16} />
                {post.author}
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {post.readTime}
              </span>
            </div>

            {/* Excerpt */}
            <div className="bg-brown/1 rounded-xl p-2 px-10 mb-8">
              <p className="text-gray-500 italic leading-relaxed text-base md:text-lg">
                {post.excerpt}
              </p>
            </div>

            {/* Content Sections */}
            <div className="space-y-6 text-black text-base font-normal leading-relaxed tracking-wide">
              {renderContent()}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-2 text-stone-600">
                  <Heart size={20} />
                  <span>Enjoyed this article?</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link copied to clipboard!");
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors"
                >
                  <Share2 size={16} />
                  Share this article
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}