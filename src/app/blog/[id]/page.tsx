// app/blog/[id]/page.tsx
"use client";

import {
  ArrowLeft,
  User,
  Calendar,
  Clock,
  Heart,
  Share2,
  X,
  Bookmark,
  BookmarkCheck,
  ChevronUp,
  Minus,
  Plus,
  Quote,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, useCallback, useRef } from "react";
import { getBlogPosts, BlogPost, CATEGORY_COLORS } from "@/app/data/blog";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// Enhanced Toast Component with animation
function Toast({
  message,
  onClose,
  type = "success",
}: {
  message: string;
  onClose: () => void;
  type?: "success" | "error";
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <div
        className={`${type === "success" ? "bg-[#8E9867]" : "bg-red-500"} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[200px]`}
      >
        <span className="text-sm">{message}</span>
        <button
          onClick={onClose}
          className="hover:opacity-70 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// Newsletter Signup Component
function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-16 p-8 bg-gradient-to-r hidden from-[#8E9867]/5 to-[#8E9867]/10 rounded-2xl border border-[#8E9867]/20"
    >
      <div className="text-center">
        <h4 className="text-lg font-semibold text-stone-800 mb-2">
          Subscribe to our Newsletter
        </h4>
        <p className="text-stone-600 text-sm mb-4">
          Get the latest articles delivered to your inbox
        </p>
        <form
          onSubmit={handleSubscribe}
          className="flex gap-2 max-w-md mx-auto"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-stone-200 rounded-lg focus:outline-none focus:border-[#8E9867] bg-white/50"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#8E9867] text-white rounded-lg hover:bg-[#7d8559] transition-colors"
          >
            Subscribe
          </button>
        </form>
        {subscribed && (
          <p className="text-green-600 text-sm mt-2">
            Thanks for subscribing! 🎉
          </p>
        )}
      </div>
    </motion.div>
  );
}

// Reading Time Indicator
function ReadingTimeIndicator({
  readTime,
  scrollProgress,
}: {
  readTime: string;
  scrollProgress: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:hidden"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg border border-stone-200">
        <div className="flex flex-col items-center gap-1">
          <Clock size={16} className="text-[#8E9867]" />
          <span className="text-xs font-medium text-stone-600">{readTime}</span>
          <div className="w-0.5 h-12 bg-stone-200 my-1">
            <motion.div
              className="w-full bg-[#8E9867]"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-xs text-stone-500">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// Interactive Quote Component
function InteractiveQuote({ text, author }: { text: string; author: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="my-12 p-8 bg-[#8E9867]/5 border-l-4 border-[#8E9867] rounded-r-2xl cursor-pointer"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex gap-3">
        <Quote size={24} className="text-[#8E9867] flex-shrink-0" />
        <div>
          <p className="text-lg italic text-stone-700 leading-relaxed">
            &ldquo;{text}&rdquo;
          </p>
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 text-sm text-stone-500"
              >
                — {author}
              </motion.p>
            )}
          </AnimatePresence>
          {!isExpanded && (
            <p className="mt-2 text-xs text-stone-400">Click to see author</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Article Actions Component
interface ArticleActionsProps {
  onShare: () => void;
  onLike: () => void;
  likes: number;
  isLiked: boolean;
}

function ArticleActions({
  onShare,
  onLike,
  likes,
  isLiked,
}: ArticleActionsProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed right-4 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full py-3 shadow-lg border border-stone-200">
        <div className="flex flex-col items-center gap-4 px-3">
          <button
            onClick={onLike}
            className="relative group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Heart
              size={20}
              className={`transition-all duration-300 ${
                isLiked
                  ? "fill-red-500 text-red-500"
                  : "text-stone-500 hover:text-red-500"
              }`}
            />
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="absolute right-full mr-2 px-2 py-1 bg-stone-800 text-white text-xs rounded whitespace-nowrap"
              >
                {isLiked ? "Unlike" : "Like"}
              </motion.div>
            )}
          </button>
          <span className="text-xs font-medium text-stone-600">{likes}</span>
          <button
            onClick={onShare}
            className="group relative"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            <Share2
              size={20}
              className="text-stone-500 hover:text-[#8E9867] transition-colors"
            />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-[#8E9867] text-white p-3 rounded-full shadow-lg hover:bg-[#7d8559] transition-colors"
        >
          <ChevronUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Font Size Control
function FontSizeControl() {
  const [fontSize, setFontSize] = useState(100);

  const increaseFont = () => {
    if (fontSize < 120) {
      setFontSize(fontSize + 10);
      document.documentElement.style.setProperty(
        "--article-font-size",
        `${fontSize + 10}%`,
      );
    }
  };

  const decreaseFont = () => {
    if (fontSize > 80) {
      setFontSize(fontSize - 10);
      document.documentElement.style.setProperty(
        "--article-font-size",
        `${fontSize - 10}%`,
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-6 left-6 z-40 hidden md:block"
    >
      <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-stone-200 flex gap-2">
        <button
          onClick={decreaseFont}
          className="p-1 hover:bg-stone-100 rounded-full transition-colors"
          disabled={fontSize <= 80}
        >
          <Minus size={16} />
        </button>
        <span className="text-xs text-stone-600">{fontSize}%</span>
        <button
          onClick={increaseFont}
          className="p-1 hover:bg-stone-100 rounded-full transition-colors"
          disabled={fontSize >= 120}
        >
          <Plus size={16} />
        </button>
      </div>
    </motion.div>
  );
}

// Bookmark Button
function BookmarkButton() {
  const [isBookmarked, setIsBookmarked] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("bookmarkedPosts");
    if (!saved) return false;
    const bookmarks = JSON.parse(saved);
    return bookmarks.includes(window.location.pathname);
  });

  const toggleBookmark = () => {
    const saved = localStorage.getItem("bookmarkedPosts");
    let bookmarks = saved ? JSON.parse(saved) : [];
    const currentPath = window.location.pathname;

    if (isBookmarked) {
      bookmarks = bookmarks.filter((path: string) => path !== currentPath);
    } else {
      bookmarks.push(currentPath);
    }

    localStorage.setItem("bookmarkedPosts", JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  return (
    <button
      onClick={toggleBookmark}
      className="flex items-center gap-2 text-stone-500 hover:text-[#8E9867] transition-colors"
    >
      {isBookmarked ? (
        <BookmarkCheck size={20} className="text-[#8E9867]" />
      ) : (
        <Bookmark size={20} />
      )}
      <span className="text-xs uppercase tracking-wider">
        {isBookmarked ? "Saved" : "Save"}
      </span>
    </button>
  );
}

export default function BlogPostPage() {
  const router = useRouter();
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const loadPost = useCallback(async () => {
    setLoading(true);
    try {
      const posts = await getBlogPosts();
      const foundPost = posts.find((p) => p.id === params.id);
      setPost(foundPost || null);

      // Load saved likes
      if (foundPost) {
        const savedLikes = localStorage.getItem(`likes_${foundPost.id}`);
        if (savedLikes) {
          setLikes(parseInt(savedLikes));
        } else {
          setLikes(Math.floor(Math.random() * 100) + 50);
        }

        const likedStatus = localStorage.getItem(`liked_${foundPost.id}`);
        setIsLiked(likedStatus === "true");
      }
    } catch (error) {
      console.error("Error loading post:", error);
      setPost(null);
    } finally {
      setLoading(false);
    }
  }, [params.id]);

  useEffect(() => {
    loadPost();
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [loadPost]);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToastType(type);
    setToastMessage(message);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showToast("Link copied to clipboard! ✨", "success");
    } catch (error) {
      console.error("Failed to copy:", error);
      showToast("Failed to copy link. Please try again.", "error");
    }
  };

  const handleLike = () => {
    if (post) {
      const newLiked = !isLiked;
      const newLikes = newLiked ? likes + 1 : likes - 1;

      setLikes(newLikes);
      setIsLiked(newLiked);

      localStorage.setItem(`likes_${post.id}`, newLikes.toString());
      localStorage.setItem(`liked_${post.id}`, newLiked.toString());

      showToast(newLiked ? "Thanks for liking! ❤️" : "Removed like", "success");
    }
  };

  function getAbbreviatedTime(date: string | Date | null | undefined) {
    if (!date) return "Invalid date";

    let target: Date;

    if (typeof date === "string") {
      const isoString = date.replace(" ", "T");
      target = new Date(isoString);

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

    if (diffMs < 0) {
      return "Just now";
    }

    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

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

  const renderContent = () => {
    if (!post) return null;

    if (post.sections && post.sections.length > 0) {
      let firstParagraphFound = false;

      return post.sections.map((section, idx) => {
        const motionProps = {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-50px" },
          transition: { duration: 0.6, delay: idx * 0.05 },
        };

        switch (section.type) {
          case "heading":
            return (
              <motion.div
                key={section.id}
                className="space-y-4 my-10"
                {...motionProps}
              >
                {section.title && (
                  <h2 className="text-[#8E9867] text-2xl md:text-3xl font-semibold leading-tight tracking-tight border-l-4 border-[#8E9867] pl-4">
                    {section.title}
                  </h2>
                )}
                <p
                  className="text-stone-800 text-[18px] md:text-[20px] font-normal leading-[1.8] font-serif"
                  style={{ fontSize: "var(--article-font-size, 100%)" }}
                >
                  {section.content}
                </p>
              </motion.div>
            );
          case "bulletList":
            return (
              <motion.div
                key={section.id}
                className="space-y-5 my-8 bg-gradient-to-r from-stone-100/50 to-transparent p-6 md:p-8 rounded-2xl border border-stone-100"
                {...motionProps}
              >
                {section.title && (
                  <p className="text-stone-800 text-lg font-bold leading-relaxed tracking-wide uppercase text-[13px]">
                    {section.title}
                  </p>
                )}
                <ul className="space-y-3">
                  {section.items?.map((item, idxx) => (
                    <motion.li
                      key={idxx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idxx * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-6 h-6 mt-1 flex-shrink-0 bg-[#8E9867]/20 rounded-full flex items-center justify-center">
                        <div className="w-2.5 h-2.5 bg-[#8E9867] rounded-full" />
                      </div>
                      <p className="text-stone-700 text-[17px] font-medium leading-relaxed">
                        {item}
                      </p>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            );
          case "numberedList":
            return (
              <motion.div
                key={section.id}
                className="space-y-5 my-8"
                {...motionProps}
              >
                {section.title && (
                  <p className="text-stone-800 text-xl font-semibold leading-relaxed">
                    {section.title}
                  </p>
                )}
                <ol className="list-decimal pl-6 space-y-3 font-serif">
                  {section.items?.map((item, idxx) => (
                    <motion.li
                      key={idxx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: idxx * 0.1 }}
                      className="text-stone-700 text-[18px] pl-4 font-normal leading-[1.8] marker:text-[#8E9867] marker:font-bold"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ol>
              </motion.div>
            );
          case "quote":
            return (
              <InteractiveQuote
                key={section.id}
                text={section.quoteText || section.content || "Quote text"}
                author={section.author || "Anonymous"}
              />
            );
          case "paragraph":
          default:
            const isFirst = !firstParagraphFound;
            if (isFirst) firstParagraphFound = true;

            // Add random interactive quotes for some paragraphs
            if (idx % 5 === 2 && idx > 0) {
              return (
                <div key={section.id}>
                  <motion.div className="mb-8" {...motionProps}>
                    {isFirst ? (
                      <p
                        className="text-stone-800 text-[19px] md:text-[21px] font-serif font-normal leading-[1.85]"
                        style={{ fontSize: "var(--article-font-size, 100%)" }}
                      >
                        <span className="float-left text-6xl md:text-7xl font-serif text-[#8E9867] mt-1 mr-4 mb-2 leading-[0.8] font-bold">
                          {section.content.charAt(0)}
                        </span>
                        {section.content.slice(1)}
                      </p>
                    ) : (
                      <p
                        className="text-stone-700 text-[18px] md:text-[20px] font-serif font-normal leading-[1.8]"
                        style={{ fontSize: "var(--article-font-size, 100%)" }}
                      >
                        {section.content}
                      </p>
                    )}
                  </motion.div>
                </div>
              );
            }

            return (
              <motion.div key={section.id} className="mb-8" {...motionProps}>
                {isFirst ? (
                  <p
                    className="text-stone-800 text-[19px] md:text-[21px] font-serif font-normal leading-[1.85]"
                    style={{ fontSize: "var(--article-font-size, 100%)" }}
                  >
                    <span className="float-left text-6xl md:text-7xl font-serif text-[#8E9867] mt-1 mr-4 mb-2 leading-[0.8] font-bold">
                      {section.content.charAt(0)}
                    </span>
                    {section.content.slice(1)}
                  </p>
                ) : (
                  <p
                    className="text-stone-700 text-[18px] md:text-[20px] font-serif font-normal leading-[1.8]"
                    style={{ fontSize: "var(--article-font-size, 100%)" }}
                  >
                    {section.content}
                  </p>
                )}
              </motion.div>
            );
        }
      });
    }

    if (post.excerpt) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <p className="text-stone-700 text-[18px] font-serif font-normal leading-[1.8]">
            {post.excerpt}
          </p>
        </motion.div>
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
      <div className="min-h-screen flex items-center justify-center bg-[#fcfbf9]">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-2 border-[#8E9867] border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-[#8E9867]">Loading article...</p>
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
    <main className="w-full bg-[#fcfbf9] overflow-x-hidden selection:bg-[#8E9867]/20 selection:text-stone-900">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#8E9867] origin-left z-50"
        style={{ scaleX }}
      />

      {/* Toast Container */}
      <AnimatePresence>
        {toastMessage && (
          <Toast
            message={toastMessage}
            onClose={() => setToastMessage(null)}
            type={toastType}
          />
        )}
      </AnimatePresence>

      {/* Reading Time Indicator */}
      <ReadingTimeIndicator
        readTime={post.readTime}
        scrollProgress={scrollYProgress.get()}
      />

      {/* Article Actions */}
      <ArticleActions
        onShare={handleShare}
        onLike={handleLike}
        likes={likes}
        isLiked={isLiked}
      />

      {/* Back to Top */}
      <BackToTop />

      {/* Font Size Control */}
      <FontSizeControl />

      <div className="w-full bg-[#fcfbf9]">
        <div className="w-full px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
          <div className="max-w-[800px] mx-auto">
            {/* Blog Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex justify-between items-center mb-10"
            >
              <button
                onClick={() => router.push("/blog")}
                className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors uppercase tracking-widest text-xs font-bold"
              >
                <ArrowLeft size={16} />
                Back to all articles
              </button>
              <BookmarkButton />
            </motion.div>

            {/* Featured Image */}
            <motion.picture
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full aspect-video md:aspect-2/1 rounded-xl overflow-hidden mb-12 shadow-2xl block group"
            >
              <motion.img
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8 }}
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/1000x643?text=Blog+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </motion.picture>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Category Badge */}
              <div className="mb-6 flex justify-center">
                <span
                  className={`inline-block px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full border ${CATEGORY_COLORS[post.category] ? CATEGORY_COLORS[post.category].replace("bg-", "border-").replace("text-white", "") + " text-" + CATEGORY_COLORS[post.category].split("-")[1] + "-600" : "border-stone-300 text-stone-600"}`}
                >
                  {post.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl lg:text-[54px] text-stone-900 text-center font-serif font-medium leading-[1.1] mb-6 tracking-tight">
                {post.title}
              </h1>

              {/* Subtitle */}
              {post.subtitle && (
                <p className="text-xl md:text-2xl text-stone-600 text-center font-serif italic mb-8 max-w-2xl mx-auto">
                  {post.subtitle}
                </p>
              )}
            </motion.div>

            {/* Meta Information */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-6 text-sm text-stone-500 mb-12 pb-8 border-b border-stone-200 uppercase tracking-widest font-semibold"
            >
              <span className="flex items-center gap-1.5">
                <User size={14} className="text-[#8E9867]" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-[#8E9867]" />
                {getAbbreviatedTime(post.created)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#8E9867]" />
                {post.readTime}
              </span>
            </motion.div>

            {/* Content Sections */}
            <div ref={contentRef} className="space-y-6">
              {renderContent()}
            </div>

            {/* Newsletter Signup */}
            <NewsletterSignup />

            {/* Magazine Style Footer / Share */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-16 pt-10 border-t border-stone-200 flex flex-col items-center justify-center pb-20"
            >
              <div className="w-12 h-12 bg-[#8E9867]/10 rounded-full flex items-center justify-center mb-6 text-[#8E9867]">
                <Heart size={24} fill="currentColor" className="opacity-80" />
              </div>
              <h3 className="text-2xl font-serif text-stone-900 mb-2">
                Enjoyed this article?
              </h3>
              <p className="text-stone-500 mb-8 max-w-md text-center">
                Share this insightful piece with your network and help spread
                valuable perspectives.
              </p>

              <button
                onClick={handleShare}
                className="group relative flex items-center gap-3 px-8 py-3.5 bg-stone-900 hover:bg-[#8E9867] text-white rounded-full transition-all duration-300 font-medium tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Share2
                  size={18}
                  className="group-hover:scale-110 transition-transform"
                />
                <span>Share Article</span>

                <div className="absolute inset-0 rounded-full ring-2 ring-stone-900 ring-offset-2 opacity-0 group-focus:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
